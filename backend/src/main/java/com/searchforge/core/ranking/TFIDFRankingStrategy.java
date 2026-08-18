package com.searchforge.core.ranking;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.index.PostingList;
import com.searchforge.core.index.PostingNode;

import java.util.*;

/**
 * First-principles TF-IDF (Term Frequency - Inverse Document Frequency) Ranking Implementation.
 */
public class TFIDFRankingStrategy implements RankingStrategy {

    @Override
    public String getName() {
        return "TF-IDF";
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
                    // Normalized TF: raw tf / doc length
                    double tfNormalized = (double) tfRaw / docLen;
                    // Smoothed IDF: ln((totalDocs + 1) / (df + 1)) + 1
                    double idf = Math.log((double) (totalDocs + 1) / (df + 1)) + 1.0;

                    double termContribution = tfNormalized * idf;
                    totalScore += termContribution;

                    explanation.addTermExplanation(term, tfRaw, df, tfNormalized, idf, termContribution);
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
