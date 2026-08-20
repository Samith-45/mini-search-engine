package com.searchforge.core.index;

import java.util.*;

/**
 * Sorted list of PostingNode entries for a single term in the inverted index.
 */
public class PostingList {

    private final String term;
    private final List<PostingNode> nodes;

    public PostingList(String term) {
        this.term = term;
        this.nodes = new ArrayList<>();
    }

    public synchronized void addOrUpdate(Long docId, int position) {
        Optional<PostingNode> existing = nodes.stream()
                .filter(n -> n.getDocId().equals(docId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().addOccurrence(position);
        } else {
            PostingNode newNode = new PostingNode(docId);
            newNode.addOccurrence(position);
            nodes.add(newNode);
            Collections.sort(nodes);
        }
    }

    public String getTerm() {
        return term;
    }

    public synchronized boolean removeDocument(Long docId) {
        return nodes.removeIf(n -> n.getDocId().equals(docId));
    }

    public synchronized List<PostingNode> getNodes() {
        return Collections.unmodifiableList(new ArrayList<>(nodes));
    }

    public synchronized Set<Long> getDocumentIds() {
        Set<Long> ids = new HashSet<>(nodes.size());
        for (PostingNode node : nodes) {
            ids.add(node.getDocId());
        }
        return ids;
    }

    public synchronized int getDocumentFrequency() {
        return nodes.size();
    }

    public synchronized Optional<PostingNode> getNodeForDocument(Long docId) {
        return nodes.stream()
                .filter(n -> n.getDocId().equals(docId))
                .findFirst();
    }

    @Override
    public String toString() {
        return "PostingList{term='" + term + "', df=" + getDocumentFrequency() + '}';
    }
}
