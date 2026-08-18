package com.searchforge.core.ranking;

import com.searchforge.core.index.InvertedIndex;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class RankingStrategiesTest {

    private InvertedIndex index;
    private TFIDFRankingStrategy tfidf;
    private BM25RankingStrategy bm25;

    @BeforeEach
    void setUp() {
        index = new InvertedIndex();
        index.addDocument(1L, List.of("java", "java", "java", "spring")); // high TF for java
        index.addDocument(2L, List.of("java", "python"));
        index.addDocument(3L, List.of("python", "django", "flask"));

        tfidf = new TFIDFRankingStrategy();
        bm25 = new BM25RankingStrategy();
    }

    @Test
    void testTFIDFRankingOrder() {
        Set<Long> candidates = Set.of(1L, 2L);
        List<ScoreResult> results = tfidf.rank(candidates, List.of("java"), index);

        assertEquals(2, results.size());
        assertEquals(1L, results.get(0).getDocId(), "Doc 1 should rank higher due to higher TF");
        assertTrue(results.get(0).getScore() > results.get(1).getScore());
    }

    @Test
    void testBM25RankingOrder() {
        Set<Long> candidates = Set.of(1L, 2L);
        List<ScoreResult> results = bm25.rank(candidates, List.of("java"), index);

        assertEquals(2, results.size());
        assertEquals(1L, results.get(0).getDocId(), "Doc 1 should rank higher under BM25");
        assertNotNull(results.get(0).getExplanation());
        assertEquals("BM25", results.get(0).getExplanation().getAlgorithmName());
    }
}
