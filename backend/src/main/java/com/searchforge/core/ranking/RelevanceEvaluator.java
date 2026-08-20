package com.searchforge.core.ranking;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.index.PostingList;
import com.searchforge.core.normalizer.DefaultTextNormalizer;
import com.searchforge.core.normalizer.TextNormalizer;
import com.searchforge.core.tokenizer.SimpleTokenizer;
import com.searchforge.core.tokenizer.Tokenizer;
import com.searchforge.dto.RelevanceEvaluationResult;

import java.util.*;

/**
 * Evaluates Information Retrieval relevance quality across ranking algorithms.
 * Measures Precision@K, Recall@K, MRR (Mean Reciprocal Rank), and NDCG@10
 * using a standard benchmark query set with ground-truth judgments.
 */
public class RelevanceEvaluator {

    public static class GroundTruthQuery {
        private final String query;
        private final Set<Long> relevantDocIds;

        public GroundTruthQuery(String query, Set<Long> relevantDocIds) {
            this.query = query;
            this.relevantDocIds = relevantDocIds;
        }

        public String getQuery() { return query; }
        public Set<Long> getRelevantDocIds() { return relevantDocIds; }
    }

    public List<RelevanceEvaluationResult> evaluateAll(InvertedIndex index, List<GroundTruthQuery> testSet) {
        List<RelevanceEvaluationResult> results = new ArrayList<>();
        
        results.add(evaluateStrategy("TF-IDF", new TFIDFRankingStrategy(), index, testSet));
        results.add(evaluateStrategy("Okapi BM25", new BM25RankingStrategy(1.2, 0.75), index, testSet));
        results.add(evaluateStrategy("Field-Boosted BM25", new BM25RankingStrategy(1.5, 0.8), index, testSet));

        return results;
    }

    public RelevanceEvaluationResult evaluateStrategy(String strategyName, RankingStrategy strategy, InvertedIndex index, List<GroundTruthQuery> testSet) {
        Tokenizer tokenizer = new SimpleTokenizer();
        TextNormalizer normalizer = new DefaultTextNormalizer();

        double totalP5 = 0.0;
        double totalP10 = 0.0;
        double totalRecall10 = 0.0;
        double totalReciprocalRank = 0.0;
        double totalNdcg10 = 0.0;

        for (GroundTruthQuery gt : testSet) {
            List<String> rawTokens = tokenizer.tokenize(gt.getQuery());
            List<String> normTokens = normalizer.normalizeTokens(rawTokens);

            Set<Long> candidates = new HashSet<>();
            for (String term : normTokens) {
                PostingList pl = index.getPostingList(term);
                if (pl != null) {
                    candidates.addAll(pl.getDocumentIds());
                }
            }

            List<ScoreResult> scoreResults = strategy.rank(candidates, normTokens, index);

            List<Long> rankedDocIds = scoreResults.stream()
                    .map(ScoreResult::getDocId)
                    .toList();

            Set<Long> relevantSet = gt.getRelevantDocIds();
            int totalRelevant = Math.max(1, relevantSet.size());

            // 1. Precision@5
            long p5Matches = rankedDocIds.stream().limit(5).filter(relevantSet::contains).count();
            totalP5 += (double) p5Matches / 5.0;

            // 2. Precision@10
            long p10Matches = rankedDocIds.stream().limit(10).filter(relevantSet::contains).count();
            totalP10 += (double) p10Matches / 10.0;

            // 3. Recall@10
            totalRecall10 += (double) p10Matches / totalRelevant;

            // 4. MRR (Mean Reciprocal Rank)
            double rr = 0.0;
            for (int rank = 0; rank < rankedDocIds.size(); rank++) {
                if (relevantSet.contains(rankedDocIds.get(rank))) {
                    rr = 1.0 / (rank + 1);
                    break;
                }
            }
            totalReciprocalRank += rr;

            // 5. NDCG@10
            double dcg10 = 0.0;
            for (int rank = 0; rank < Math.min(10, rankedDocIds.size()); rank++) {
                if (relevantSet.contains(rankedDocIds.get(rank))) {
                    dcg10 += 1.0 / (Math.log(rank + 2) / Math.log(2));
                }
            }

            double idcg10 = 0.0;
            for (int rank = 0; rank < Math.min(10, totalRelevant); rank++) {
                idcg10 += 1.0 / (Math.log(rank + 2) / Math.log(2));
            }
            double ndcg10 = idcg10 > 0 ? (dcg10 / idcg10) : 1.0;
            totalNdcg10 += ndcg10;
        }

        int queryCount = Math.max(1, testSet.size());

        return new RelevanceEvaluationResult(
                strategyName,
                Math.round((totalP5 / queryCount) * 1000.0) / 1000.0,
                Math.round((totalP10 / queryCount) * 1000.0) / 1000.0,
                Math.round((totalRecall10 / queryCount) * 1000.0) / 1000.0,
                Math.round((totalReciprocalRank / queryCount) * 1000.0) / 1000.0,
                Math.round((totalNdcg10 / queryCount) * 1000.0) / 1000.0,
                queryCount
        );
    }
}
