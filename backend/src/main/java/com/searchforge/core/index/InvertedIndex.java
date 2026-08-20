package com.searchforge.core.index;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Thread-safe Inverted Index mapping normalized terms to sorted PostingLists.
 * Provides posting list intersection, union, and positional matching.
 */
public class InvertedIndex {

    private final Map<String, PostingList> termIndex = new ConcurrentHashMap<>();
    private final IndexMetadata metadata = new IndexMetadata();

    /**
     * Indexes a document given its ID and normalized tokens.
     */
    public void addDocument(Long docId, List<String> normalizedTokens) {
        if (docId == null || normalizedTokens == null) {
            return;
        }

        // Remove old occurrences if updating
        removeDocument(docId);

        metadata.recordDocumentLength(docId, normalizedTokens.size());

        for (int pos = 0; pos < normalizedTokens.size(); pos++) {
            String term = normalizedTokens.get(pos);
            if (term != null && !term.isBlank()) {
                termIndex.computeIfAbsent(term, PostingList::new).addOrUpdate(docId, pos);
            }
        }
    }

    /**
     * Removes a document from the inverted index.
     */
    public void removeDocument(Long docId) {
        if (docId == null) {
            return;
        }
        metadata.removeDocumentLength(docId);

        Iterator<Map.Entry<String, PostingList>> iterator = termIndex.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, PostingList> entry = iterator.next();
            PostingList list = entry.getValue();

            boolean removed = list.removeDocument(docId);
            if (removed && list.getDocumentFrequency() == 0) {
                iterator.remove();
            }
        }
    }

    public PostingList getPostingList(String term) {
        if (term == null) {
            return null;
        }
        return termIndex.get(term.toLowerCase());
    }

    public int getDocumentFrequency(String term) {
        PostingList list = getPostingList(term);
        return list != null ? list.getDocumentFrequency() : 0;
    }

    public int getDocumentLength(Long docId) {
        return metadata.getDocumentLength(docId);
    }

    public int getTotalDocuments() {
        return metadata.getTotalDocuments();
    }

    public double getAverageDocumentLength() {
        return metadata.getAverageDocumentLength();
    }

    public Set<String> getAllTerms() {
        return Collections.unmodifiableSet(termIndex.keySet());
    }

    public int getVocabularySize() {
        return termIndex.size();
    }

    public IndexMetadata getMetadata() {
        return metadata;
    }

    public void clear() {
        termIndex.clear();
    }

    /**
     * Returns union of candidate document IDs for given terms (OR logic).
     */
    public Set<Long> getCandidateDocIdsUnion(Collection<String> terms) {
        if (terms == null || terms.isEmpty()) {
            return Collections.emptySet();
        }

        Set<Long> candidates = new HashSet<>();
        for (String term : terms) {
            PostingList list = getPostingList(term);
            if (list != null) {
                for (PostingNode node : list.getNodes()) {
                    candidates.add(node.getDocId());
                }
            }
        }
        return candidates;
    }

    /**
     * Returns intersection of candidate document IDs for given terms (AND logic).
     */
    public Set<Long> getCandidateDocIdsIntersection(Collection<String> terms) {
        if (terms == null || terms.isEmpty()) {
            return Collections.emptySet();
        }

        Set<Long> intersection = null;
        for (String term : terms) {
            PostingList list = getPostingList(term);
            if (list == null) {
                return Collections.emptySet();
            }
            Set<Long> termDocs = list.getNodes().stream()
                    .map(PostingNode::getDocId)
                    .collect(Collectors.toSet());

            if (intersection == null) {
                intersection = new HashSet<>(termDocs);
            } else {
                intersection.retainAll(termDocs);
            }

            if (intersection.isEmpty()) {
                break;
            }
        }
        return intersection != null ? intersection : Collections.emptySet();
    }

    /**
     * Positional matching for consecutive phrase terms.
     */
    public Set<Long> getCandidateDocIdsPhrase(List<String> phraseTerms) {
        if (phraseTerms == null || phraseTerms.isEmpty()) {
            return Collections.emptySet();
        }
        if (phraseTerms.size() == 1) {
            return getCandidateDocIdsUnion(phraseTerms);
        }

        Set<Long> candidates = getCandidateDocIdsIntersection(phraseTerms);
        if (candidates.isEmpty()) {
            return Collections.emptySet();
        }

        Set<Long> matchingDocs = new HashSet<>();
        for (Long docId : candidates) {
            List<List<Integer>> termPositionsList = new ArrayList<>();
            boolean valid = true;

            for (String term : phraseTerms) {
                PostingList list = getPostingList(term);
                Optional<PostingNode> node = list != null ? list.getNodeForDocument(docId) : Optional.empty();
                if (node.isPresent()) {
                    termPositionsList.add(node.get().getPositions());
                } else {
                    valid = false;
                    break;
                }
            }

            if (valid && isConsecutivePhraseMatch(termPositionsList)) {
                matchingDocs.add(docId);
            }
        }
        return matchingDocs;
    }

    private boolean isConsecutivePhraseMatch(List<List<Integer>> termPositionsList) {
        List<Integer> firstTermPositions = termPositionsList.get(0);
        for (int startPos : firstTermPositions) {
            boolean phraseMatches = true;
            for (int t = 1; t < termPositionsList.size(); t++) {
                List<Integer> currentTermPositions = termPositionsList.get(t);
                int expectedPos = startPos + t;
                if (!currentTermPositions.contains(expectedPos)) {
                    phraseMatches = false;
                    break;
                }
            }
            if (phraseMatches) {
                return true;
            }
        }
        return false;
    }
}
