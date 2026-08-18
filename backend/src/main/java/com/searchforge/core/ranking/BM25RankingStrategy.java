package com.searchforge.core.ranking;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.index.PostingList;
import com.searchforge.core.index.PostingNode;

import java.util.*;

/**
 * First-principles Okapi BM25 Ranking Implementation.
 */
public class BM25RankingStrategy implements RankingStrategy {

    private final double k1;
    private final double b;

    public BM25RankingStrategy() {
        this(1.2, 0.75);
    }

    public BM25RankingStrategy(double k1, double b) {
        this.k1 = k1;
        this.b = b;
    }

    @Override
    public String getName() {
        return "BM25";
    }

    public double getK1() {
        return k1;
    }

    public double getB() {
        return b;
    }

    @Override
    public List<ScoreResult> rank(Set<Long> candidateDocIds, List<String> queryTerms, InvertedIndex index) {
        if (candidateDocIds == null || candidateDocIds.isEmpty() || queryTerms == null || queryTerms.isEmpty()) {
            return Collections.emptyList();
        }

        int totalDocs = index.getTotalDocuments();
        double avgLength = index.getAverageDocumentLength();

        List<ScoreResult> scoreResults = new ArrayList<>();

        for (Long docId : candidateDocIds) {
            int docLen = index.getDocumentLength(docId);
            if (docLen == 0) continue;

            double totalScore = 0.0;
            RelevanceExplanation explanation = new RelevanceExplanation(docId, getName());
            explanation.setDocumentLength(docLen);
            explanation.setAverageDocumentLength(avgLength);

            for (String term : queryTerms) {
                PostingList postingList = index.getPostingList(term);
                if (postingList == null) continue;

                int df = postingList.getDocumentFrequency();
                Optional<PostingNode> nodeOpt = postingList.getNodeForDocument(docId);

                int tfRaw = nodeOpt.map(PostingNode::getTermFrequency).orElse(0);
                if (tfRaw > 0) {
                    // Standard Okapi BM25 IDF: ln(1 + (N - df + 0.5) / (df + 0.5))
                    double idf = Math.log(1.0 + ((double) totalDocs - df + 0.5) / (df + 0.5));
                    if (idf < 0) idf = 0.0001; // floor to avoid negative IDF for ubiquitous terms

                    // Term Frequency Component with length normalization penalty
                    double lenRatio = avgLength > 0 ? (double) docLen / avgLength : 1.0;
                    double tfComponent = (tfRaw * (k1 + 1.0)) / (tfRaw + k1 * (1.0 - b + b * lenRatio));

                    double termContribution = idf * tfComponent;
                    totalScore += termContribution;

                    explanation.addTermExplanation(term, tfRaw, df, tfComponent, idf, termContribution);
                }
            }

            if (totalScore > 0.0) {
                explanation.setFinalScore(totalScore);
                scoreResults.add(new ScoreResult(docId, totalScore, explanation));
            }
        }

        Collections.sort(scoreResults);
        return scoreResults;
    }
}
