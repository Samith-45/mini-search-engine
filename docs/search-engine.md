# Core Search Engine Data Structures & Algorithm Design

## 1. Tokenization & Normalization Pipeline

The input string passes through a multi-stage text processing pipeline:

```text
Raw String -> Tokenizer -> Lowercase -> Stopword Filter -> Light Stemmer -> Tokens
```

- **SimpleTokenizer**: Uses regex `[^a-zA-Z0-9]+` to extract alphanumeric tokens, stripping punctuation and symbols.
- **StopWordsFilter**: Filters common English stopwords (`a`, `an`, `the`, `in`, `is`, `at`, etc.) using an $O(1)$ HashSet lookup.
- **LightStemmer**: Strips common English inflectional suffixes (`ing`, `edly`, `ed`, `es`, `s`, `ly`) to normalize terms (e.g. `indexing` -> `index`, `systems` -> `system`).

## 2. Inverted Index Design

Conceptually, the inverted index maps normalized terms to sorted posting lists:

```text
java
 ├── PostingNode(docId=1, tf=3, pos=[0, 12, 45])
 └── PostingNode(docId=4, tf=1, pos=[8])

spring
 ├── PostingNode(docId=1, tf=1, pos=[3])
 └── PostingNode(docId=5, tf=2, pos=[1, 10])
```

### Time & Space Complexity Analysis

| Data Structure / Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| Tokenization & Normalization | $O(L)$ where $L$ is string length | $O(N)$ tokens |
| Inverted Index Term Lookup | $O(1)$ average hash map lookup | $O(V)$ vocabulary size |
| Posting List Intersection (AND) | $O(M + N)$ two-pointer merge | $O(M + N)$ document IDs |
| Trie Autocomplete Prefix Search | $O(P + K \log K)$ ($P$ = prefix len, $K$ = matches) | $O(L \cdot V)$ trie nodes |

## 3. AST Query Parser

The `QueryParser` parses raw user input into an Abstract Syntax Tree (AST):
- Single Term: `TermNode("java")`
- Explicit Operators: `AndNode`, `OrNode`
- Quoted Phrase Queries: `"distributed systems"` -> `PhraseNode` (evaluates consecutive term positions within posting list node offsets).
