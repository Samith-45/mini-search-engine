package com.searchforge.controller;

import com.searchforge.core.concurrency.ConcurrencyComparisonRunner;
import com.searchforge.dto.ConcurrencyComparisonResultDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/concurrency")
public class ConcurrencyController {

    private final ConcurrencyComparisonRunner concurrencyRunner;

    public ConcurrencyController(ConcurrencyComparisonRunner concurrencyRunner) {
        this.concurrencyRunner = concurrencyRunner;
    }

    @PostMapping("/compare")
    public ResponseEntity<List<ConcurrencyComparisonResultDTO>> runConcurrencyBenchmark(
            @RequestParam(defaultValue = "100") int concurrency,
            @RequestParam(defaultValue = "500") int totalOperations
    ) {
        List<ConcurrencyComparisonResultDTO> results = concurrencyRunner.runComparison(concurrency, totalOperations);
        return ResponseEntity.ok(results);
    }
}
