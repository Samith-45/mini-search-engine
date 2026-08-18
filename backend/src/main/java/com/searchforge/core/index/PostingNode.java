package com.searchforge.core.index;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * A single entry in a posting list representing term occurrence within a specific document.
 */
public class PostingNode implements Comparable<PostingNode> {

    private final Long docId;
    private int termFrequency;
    private final List<Integer> positions;

    public PostingNode(Long docId) {
        this.docId = docId;
        this.termFrequency = 0;
        this.positions = new ArrayList<>();
    }

    public PostingNode(Long docId, int termFrequency, List<Integer> positions) {
        this.docId = docId;
        this.termFrequency = termFrequency;
        this.positions = positions != null ? new ArrayList<>(positions) : new ArrayList<>();
    }

    public void addOccurrence(int position) {
        this.termFrequency++;
        this.positions.add(position);
    }

    public Long getDocId() {
        return docId;
    }

    public int getTermFrequency() {
        return termFrequency;
    }

    public List<Integer> getPositions() {
        return Collections.unmodifiableList(positions);
    }

    @Override
    public int compareTo(PostingNode o) {
        return this.docId.compareTo(o.docId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostingNode that = (PostingNode) o;
        return Objects.equals(docId, that.docId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(docId);
    }

    @Override
    public String toString() {
        return "PostingNode{docId=" + docId + ", tf=" + termFrequency + ", posCount=" + positions.size() + '}';
    }
}
