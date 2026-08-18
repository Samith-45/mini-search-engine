package com.searchforge.controller;

import com.searchforge.core.benchmark.BenchmarkResult;
import com.searchforge.core.benchmark.SearchBenchmarkRunner;
import com.searchforge.core.index.PostingList;
import com.searchforge.dto.EngineeringStatsDTO;
import com.searchforge.service.AnalyticsService;
import com.searchforge.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/engineering")
@Tag(name = "Engineering API", description = "Internal data structure inspection & benchmark runner")
public class EngineeringController {

    private final AnalyticsService analyticsService;
    private final DocumentService documentService;

    public EngineeringController(AnalyticsService analyticsService, DocumentService documentService) {
        this.analyticsService = analyticsService;
        this.documentService = documentService;
    }

    @GetMapping("/index-stats")
    @Operation(summary = "Get internal Inverted Index metadata and memory metrics")
    public ResponseEntity<EngineeringStatsDTO> getIndexStats() {
        return ResponseEntity.ok(analyticsService.getEngineeringStats());
    }

    @GetMapping("/posting-list")
    @Operation(summary = "Inspect the inverted index posting list for a specific term")
    public ResponseEntity<Map<String, Object>> getPostingList(@RequestParam(name = "term") String term) {
        PostingList list = documentService.getInvertedIndex().getPostingList(term);
        Map<String, Object> response = new HashMap<>();
        response.put("term", term);
        if (list == null) {
            response.put("found", false);
            response.put("documentFrequency", 0);
            response.put("postings", Collections.emptyList());
        } else {
            response.put("found", true);
            response.put("documentFrequency", list.getDocumentFrequency());
            response.put("postings", list.getNodes());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/benchmark")
    @Operation(summary = "Trigger a real performance benchmark run across 1k, 10k, or custom doc scale")
    public ResponseEntity<BenchmarkResult> runBenchmark(
            @RequestParam(name = "docCount", defaultValue = "1000") int docCount,
            @RequestParam(name = "queryCount", defaultValue = "100") int queryCount
    ) {
        SearchBenchmarkRunner runner = new SearchBenchmarkRunner();
        BenchmarkResult result = runner.runBenchmark(docCount, queryCount);
        return ResponseEntity.ok(result);
    }
}
