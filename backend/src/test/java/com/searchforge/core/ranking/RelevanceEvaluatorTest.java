package com.searchforge.core.ranking;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.dto.RelevanceEvaluationResult;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

public class RelevanceEvaluatorTest {

    @Test
    void testEvaluateAllStrategies() {
        InvertedIndex index = new InvertedIndex();
        index.addDocument(1L, Arrays.asList("java", "virtual", "threads", "concurrency"));
        index.addDocument(2L, Arrays.asList("python", "asyncio", "fastapi", "machine", "learning"));
        index.addDocument(3L, Arrays.asList("java", "spring", "boot", "microservices"));

        RelevanceEvaluator evaluator = new RelevanceEvaluator();
        List<RelevanceEvaluator.GroundTruthQuery> testSet = List.of(
                new RelevanceEvaluator.GroundTruthQuery("java concurrency", Set.of(1L, 3L))
        );

        List<RelevanceEvaluationResult> results = evaluator.evaluateAll(index, testSet);
        assertNotNull(results);
        assertEquals(3, results.size());

        for (RelevanceEvaluationResult res : results) {
            assertTrue(res.getPrecisionAt5() > 0.0);
            assertTrue(res.getMeanReciprocalRank() > 0.0);
            assertTrue(res.getNdcgAt10() > 0.0);
        }
    }
}
