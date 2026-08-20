package com.searchforge.controller;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.ranking.RelevanceEvaluator;
import com.searchforge.dto.RelevanceEvaluationResult;
import com.searchforge.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/relevance")
public class RelevanceController {

    private final DocumentService documentService;
    private final RelevanceEvaluator evaluator;

    public RelevanceController(DocumentService documentService) {
        this.documentService = documentService;
        this.evaluator = new RelevanceEvaluator();
    }

    @GetMapping("/evaluate")
    public ResponseEntity<List<RelevanceEvaluationResult>> evaluateRelevance() {
        InvertedIndex index = documentService.getInvertedIndex();

        List<RelevanceEvaluator.GroundTruthQuery> testSet = Arrays.asList(
                new RelevanceEvaluator.GroundTruthQuery("Java 21 virtual threads concurrency", new HashSet<>(Arrays.asList(1L, 3L, 19L, 21L, 35L))),
                new RelevanceEvaluator.GroundTruthQuery("Distributed systems consensus raft paxos", new HashSet<>(Arrays.asList(2L, 12L, 27L, 32L, 43L, 47L))),
                new RelevanceEvaluator.GroundTruthQuery("Vector search embeddings neural machine learning", new HashSet<>(Arrays.asList(4L, 7L, 13L, 31L, 47L))),
                new RelevanceEvaluator.GroundTruthQuery("Inverted index information retrieval BM25 ranking", new HashSet<>(Arrays.asList(21L, 22L, 37L, 38L, 52L, 53L))),
                new RelevanceEvaluator.GroundTruthQuery("llama.cpp vLLM local deepseek inference", new HashSet<>(Arrays.asList(1L, 2L, 3L, 4L, 8L, 9L)))
        );

        List<RelevanceEvaluationResult> results = evaluator.evaluateAll(index, testSet);
        return ResponseEntity.ok(results);
    }
}
