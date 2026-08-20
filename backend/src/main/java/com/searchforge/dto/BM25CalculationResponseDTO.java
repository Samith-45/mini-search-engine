package com.searchforge.dto;

public class BM25CalculationResponseDTO {
    private double idfScore;
    private double lengthNormalizationPenalty;
    private double saturatedTfScore;
    private double finalBM25Score;
    private double tfIdfBaselineScore;
    private String mathematicalStepBreakdown;

    public BM25CalculationResponseDTO() {}

    public BM25CalculationResponseDTO(double idfScore, double lengthNormalizationPenalty, double saturatedTfScore, double finalBM25Score, double tfIdfBaselineScore, String mathematicalStepBreakdown) {
        this.idfScore = idfScore;
        this.lengthNormalizationPenalty = lengthNormalizationPenalty;
        this.saturatedTfScore = saturatedTfScore;
        this.finalBM25Score = finalBM25Score;
        this.tfIdfBaselineScore = tfIdfBaselineScore;
        this.mathematicalStepBreakdown = mathematicalStepBreakdown;
    }

    public double getIdfScore() { return idfScore; }
    public void setIdfScore(double idfScore) { this.idfScore = idfScore; }

    public double getLengthNormalizationPenalty() { return lengthNormalizationPenalty; }
    public void setLengthNormalizationPenalty(double lengthNormalizationPenalty) { this.lengthNormalizationPenalty = lengthNormalizationPenalty; }

    public double getSaturatedTfScore() { return saturatedTfScore; }
    public void setSaturatedTfScore(double saturatedTfScore) { this.saturatedTfScore = saturatedTfScore; }

    public double getFinalBM25Score() { return finalBM25Score; }
    public void setFinalBM25Score(double finalBM25Score) { this.finalBM25Score = finalBM25Score; }

    public double getTfIdfBaselineScore() { return tfIdfBaselineScore; }
    public void setTfIdfBaselineScore(double tfIdfBaselineScore) { this.tfIdfBaselineScore = tfIdfBaselineScore; }

    public String getMathematicalStepBreakdown() { return mathematicalStepBreakdown; }
    public void setMathematicalStepBreakdown(String mathematicalStepBreakdown) { this.mathematicalStepBreakdown = mathematicalStepBreakdown; }
}
