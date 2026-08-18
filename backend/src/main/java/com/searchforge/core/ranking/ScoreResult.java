package com.searchforge.core.ranking;

import java.util.Objects;

/**
 * Encapsulates docId, final score, and explanation breakdown.
 */
public class ScoreResult implements Comparable<ScoreResult> {

    private final Long docId;
    private final double score;
    private final RelevanceExplanation explanation;

    public ScoreResult(Long docId, double score, RelevanceExplanation explanation) {
        this.docId = docId;
        this.score = score;
        this.explanation = explanation;
    }

    public Long getDocId() {
        return docId;
    }

    public double getScore() {
        return score;
    }

    public RelevanceExplanation getExplanation() {
        return explanation;
    }

    @Override
    public int compareTo(ScoreResult o) {
        // Sort descending by score
        int cmp = Double.compare(o.score, this.score);
        if (cmp == 0) {
            return this.docId.compareTo(o.docId);
        }
        return cmp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScoreResult that = (ScoreResult) o;
        return Double.compare(that.score, score) == 0 && Objects.equals(docId, that.docId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(docId, score);
    }

    @Override
    public String toString() {
        return "ScoreResult{docId=" + docId + ", score=" + score + '}';
    }
}
