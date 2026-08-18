package com.searchforge.dto;

import java.util.Map;

public class EngineeringStatsDTO {

    private int totalDocuments;
    private long totalTokens;
    private double averageDocumentLength;
    private int uniqueTermsCount;
    private Map<String, Object> rankingAlgorithms;

    public EngineeringStatsDTO() {}

    public EngineeringStatsDTO(int totalDocuments, long totalTokens, double averageDocumentLength, int uniqueTermsCount, Map<String, Object> rankingAlgorithms) {
        this.totalDocuments = totalDocuments;
        this.totalTokens = totalTokens;
        this.averageDocumentLength = averageDocumentLength;
        this.uniqueTermsCount = uniqueTermsCount;
        this.rankingAlgorithms = rankingAlgorithms;
    }

    public int getTotalDocuments() { return totalDocuments; }
    public long getTotalTokens() { return totalTokens; }
    public double getAverageDocumentLength() { return averageDocumentLength; }
    public int getUniqueTermsCount() { return uniqueTermsCount; }
    public Map<String, Object> getRankingAlgorithms() { return rankingAlgorithms; }
}
