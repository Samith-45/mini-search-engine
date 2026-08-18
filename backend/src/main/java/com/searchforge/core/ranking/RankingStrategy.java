package com.searchforge.core.ranking;

import com.searchforge.core.index.InvertedIndex;

import java.util.List;
import java.util.Set;

/**
 * Strategy interface for search document ranking.
 */
public interface RankingStrategy {

    /**
     * Name identifier of the ranking algorithm.
     */
    String getName();

    /**
     * Ranks a collection of candidate document IDs against normalized query terms using the inverted index.
     *
     * @param candidateDocIds Set of candidate document IDs matching the query
     * @param queryTerms Normalized query terms
     * @param index Inverted Index reference
     * @return List of ScoreResult sorted in descending relevance order
     */
    List<ScoreResult> rank(Set<Long> candidateDocIds, List<String> queryTerms, InvertedIndex index);
}
