package com.searchforge.dto;

public class CorpusStatsDTO {
    private String corpusVersion;
    private long totalDocuments;
    private long totalTokens;
    private double averageDocumentLength;
    private long uniqueTermsCount;
    private String checksum;
    private String lastIndexedTime;

    public CorpusStatsDTO() {}

    public CorpusStatsDTO(String corpusVersion, long totalDocuments, long totalTokens, double averageDocumentLength, long uniqueTermsCount, String checksum, String lastIndexedTime) {
        this.corpusVersion = corpusVersion;
        this.totalDocuments = totalDocuments;
        this.totalTokens = totalTokens;
        this.averageDocumentLength = averageDocumentLength;
        this.uniqueTermsCount = uniqueTermsCount;
        this.checksum = checksum;
        this.lastIndexedTime = lastIndexedTime;
    }

    public String getCorpusVersion() { return corpusVersion; }
    public void setCorpusVersion(String corpusVersion) { this.corpusVersion = corpusVersion; }

    public long getTotalDocuments() { return totalDocuments; }
    public void setTotalDocuments(long totalDocuments) { this.totalDocuments = totalDocuments; }

    public long getTotalTokens() { return totalTokens; }
    public void setTotalTokens(long totalTokens) { this.totalTokens = totalTokens; }

    public double getAverageDocumentLength() { return averageDocumentLength; }
    public void setAverageDocumentLength(double averageDocumentLength) { this.averageDocumentLength = averageDocumentLength; }

    public long getUniqueTermsCount() { return uniqueTermsCount; }
    public void setUniqueTermsCount(long uniqueTermsCount) { this.uniqueTermsCount = uniqueTermsCount; }

    public String getChecksum() { return checksum; }
    public void setChecksum(String checksum) { this.checksum = checksum; }

    public String getLastIndexedTime() { return lastIndexedTime; }
    public void setLastIndexedTime(String lastIndexedTime) { this.lastIndexedTime = lastIndexedTime; }
}
