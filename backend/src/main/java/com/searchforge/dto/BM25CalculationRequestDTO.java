package com.searchforge.dto;

public class BM25CalculationRequestDTO {
    private double k1 = 1.2;
    private double b = 0.75;
    private int termFrequency = 3;
    private int documentLength = 120;
    private double averageDocumentLength = 135.0;
    private int totalDocuments = 10000;
    private int documentFrequency = 45;

    public BM25CalculationRequestDTO() {}

    public double getK1() { return k1; }
    public void setK1(double k1) { this.k1 = k1; }

    public double getB() { return b; }
    public void setB(double b) { this.b = b; }

    public int getTermFrequency() { return termFrequency; }
    public void setTermFrequency(int termFrequency) { this.termFrequency = termFrequency; }

    public int getDocumentLength() { return documentLength; }
    public void setDocumentLength(int documentLength) { this.documentLength = documentLength; }

    public double getAverageDocumentLength() { return averageDocumentLength; }
    public void setAverageDocumentLength(double averageDocumentLength) { this.averageDocumentLength = averageDocumentLength; }

    public int getTotalDocuments() { return totalDocuments; }
    public void setTotalDocuments(int totalDocuments) { this.totalDocuments = totalDocuments; }

    public int getDocumentFrequency() { return documentFrequency; }
    public void setDocumentFrequency(int documentFrequency) { this.documentFrequency = documentFrequency; }
}
