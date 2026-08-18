package com.searchforge.core.ranking;

import java.util.HashMap;
import java.util.Map;

/**
 * Breakdown explanation payload describing why a document matched and how its score was calculated.
 */
public class RelevanceExplanation {

    private final Long docId;
    private final String algorithmName;
    private double finalScore;
    private int documentLength;
    private double averageDocumentLength;
    private final Map<String, TermExplanation> termExplanations = new HashMap<>();

    public RelevanceExplanation(Long docId, String algorithmName) {
        this.docId = docId;
        this.algorithmName = algorithmName;
    }

    public static class TermExplanation {
        private final String term;
        private final int termFrequency;
        private final int documentFrequency;
        private final double tfScore;
        private final double idfScore;
        private final double termContribution;

        public TermExplanation(String term, int termFrequency, int documentFrequency, double tfScore, double idfScore, double termContribution) {
            this.term = term;
            this.termFrequency = termFrequency;
            this.documentFrequency = documentFrequency;
            this.tfScore = tfScore;
            this.idfScore = idfScore;
            this.termContribution = termContribution;
        }

        public String getTerm() { return term; }
        public int getTermFrequency() { return termFrequency; }
        public int getDocumentFrequency() { return documentFrequency; }
        public double getTfScore() { return tfScore; }
        public double getIdfScore() { return idfScore; }
        public double getTermContribution() { return termContribution; }
    }

    public void addTermExplanation(String term, int tf, int df, double tfScore, double idfScore, double contribution) {
        termExplanations.put(term, new TermExplanation(term, tf, df, tfScore, idfScore, contribution));
    }

    public Long getDocId() { return docId; }
    public String getAlgorithmName() { return algorithmName; }
    public double getFinalScore() { return finalScore; }
    public void setFinalScore(double finalScore) { this.finalScore = finalScore; }
    public int getDocumentLength() { return documentLength; }
    public void setDocumentLength(int documentLength) { this.documentLength = documentLength; }
    public double getAverageDocumentLength() { return averageDocumentLength; }
    public void setAverageDocumentLength(double averageDocumentLength) { this.averageDocumentLength = averageDocumentLength; }
    public Map<String, TermExplanation> getTermExplanations() { return termExplanations; }
}
