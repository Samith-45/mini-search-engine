package com.searchforge.dto;

public class RelevanceEvaluationResult {
    private String strategyName;
    private double precisionAt5;
    private double precisionAt10;
    private double recallAt10;
    private double meanReciprocalRank;
    private double ndcgAt10;
    private int evaluatedQueriesCount;

    public RelevanceEvaluationResult() {}

    public RelevanceEvaluationResult(String strategyName, double precisionAt5, double precisionAt10, double recallAt10, double meanReciprocalRank, double ndcgAt10, int evaluatedQueriesCount) {
        this.strategyName = strategyName;
        this.precisionAt5 = precisionAt5;
        this.precisionAt10 = precisionAt10;
        this.recallAt10 = recallAt10;
        this.meanReciprocalRank = meanReciprocalRank;
        this.ndcgAt10 = ndcgAt10;
        this.evaluatedQueriesCount = evaluatedQueriesCount;
    }

    public String getStrategyName() { return strategyName; }
    public void setStrategyName(String strategyName) { this.strategyName = strategyName; }

    public double getPrecisionAt5() { return precisionAt5; }
    public void setPrecisionAt5(double precisionAt5) { this.precisionAt5 = precisionAt5; }

    public double getPrecisionAt10() { return precisionAt10; }
    public void setPrecisionAt10(double precisionAt10) { this.precisionAt10 = precisionAt10; }

    public double getRecallAt10() { return recallAt10; }
    public void setRecallAt10(double recallAt10) { this.recallAt10 = recallAt10; }

    public double getMeanReciprocalRank() { return meanReciprocalRank; }
    public void setMeanReciprocalRank(double meanReciprocalRank) { this.meanReciprocalRank = meanReciprocalRank; }

    public double getNdcgAt10() { return ndcgAt10; }
    public void setNdcgAt10(double ndcgAt10) { this.ndcgAt10 = ndcgAt10; }

    public int getEvaluatedQueriesCount() { return evaluatedQueriesCount; }
    public void setEvaluatedQueriesCount(int evaluatedQueriesCount) { this.evaluatedQueriesCount = evaluatedQueriesCount; }
}
