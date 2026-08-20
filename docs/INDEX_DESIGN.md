# SearchForge — Inverted Index & Trie Data Structure Specification

**Component**: Search Engine Core  
**Implementation Language**: Java 21  
**Thread Safety**: Lock-free Concurrent Hash Maps, Synchronized Node Collections, Copy-On-Write Arrays  

---

## 1. Core Data Structures Overview

```text
[Term Dictionary (ConcurrentHashMap<String, PostingList>)]
  │
  ├── "distributed" ──> [PostingList: DF = 3]
  │                       ├── [Doc #1, TF = 4, Positions = [0, 12, 45, 88]]
  │                       ├── [Doc #3, TF = 2, Positions = [5, 62]]
  │                       └── [Doc #7, TF = 1, Positions = [14]]
  │
  ├── "virtual"     ──> [PostingList: DF = 2]
  │                       ├── [Doc #1, TF = 2, Positions = [3, 90]]
  │                       └── [Doc #4, TF = 5, Positions = [2, 18, 29, 54, 71]]
  │
  └── "threads"     ──> [PostingList: DF = 4]
                          └── ...
```

---

## 2. Inverted Index Design

### A. Term Dictionary
- **Data Structure**: `ConcurrentHashMap<String, PostingList>`
- **Lookup Complexity**: $O(1)$ average time complexity.
- **Normalization**: Terms stored in lowercased, stopword-filtered, light-stemmed canonical forms.

### B. Posting List & Nodes
- **Posting List**: Encapsulates document frequency ($DF$) and sorted collection of `PostingNode` items.
- **Posting Node**:
  - `docId` (`Long`): Unique document identifier.
  - `termFrequency` ($TF$): Count of occurrences within the document.
  - `positions` (`List<Integer>`): 0-indexed word offsets within raw document text for exact phrase matching and proximity evaluation.

### C. Corpus Metadata
- **Data Structure**: `IndexMetadata` holding document lengths array and rolling total tokens.
- **Average Document Length ($\text{avgdl}$)**: Computed in $O(1)$ time as $\frac{\text{totalTokens}}{\text{totalDocuments}}$.

---

## 3. Prefix Trie Autocomplete Design

```text
               (Root)
              /      \
            'd'      'j'
            /          \
          'i'          'a'
          /              \
        's'              'v'
        /                  \
   ("distrib", freq=85)    ("java", freq=120)
```

- **Data Structure**: Trie Node array `Map<Character, TrieNode>` with `termFrequency` weights and terminal word markers.
- **Prefix Lookup Complexity**: $O(L)$ where $L$ is prefix length.
- **Top-$K$ Completion Traversal**: Depth-First Search (DFS) traversal collecting sub-tree candidate words into a min-heap bounded at size $K$.

---

## 4. Algorithmic Complexity Analysis

| Operation | Algorithm / Strategy | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- |
| **Document Ingestion** | Tokenization + Normalization + Dictionary Insert | $O(D)$ where $D = \text{doc tokens}$ | $O(D)$ memory allocations |
| **Single Term Lookup** | Hash Table Dictionary Probe | $O(1)$ | $O(1)$ |
| **Boolean OR Union** | Set Union over Candidate Postings | $O(\sum |p_i|)$ | $O(\sum |p_i|)$ |
| **Boolean AND Intersection**| Two-Pointer Sorted Merge / Hash Filter | $O(\min(|p_1|, |p_2|))$ | $O(\min(|p_1|, |p_2|))$ |
| **Phrase Matching** | Positional Offset Sliding Difference | $O(|pos_1| + |pos_2|)$ | $O(1)$ |
| **Okapi BM25 Ranking** | Non-Linear Length-Normalized Scoring | $O(C \cdot |Q|)$ ($C = \text{candidates}$) | $O(C)$ |
| **Top-$K$ Score Selection** | Max-Heap PriorityQueue Merge | $O(C \log K)$ | $O(K)$ |
| **Prefix Autocomplete** | Trie Traversal + DFS Bounded Heap | $O(L + V_{sub} \log K)$ | $O(L)$ stack depth |

---

## 5. Memory Efficiency & Garbage Collection Guidelines

1. **Primitive Array Backing**: Positional lists use compact integer collections to minimize object reference overhead.
2. **Virtual Thread Friendly**: Lock-free reads eliminate carrier thread pinning in Java 21 Project Loom.
3. **Partitioned Shard Footprint**: Distributing $N$ million postings across $S$ shards limits per-shard memory to $\frac{\text{Total RAM}}{S}$, allowing sub-millisecond local candidate retrieval.
