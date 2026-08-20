package com.searchforge.controller;

import com.searchforge.dto.PerformanceProfileDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/performance")
public class PerformanceController {

    @GetMapping("/profile")
    public ResponseEntity<PerformanceProfileDTO> getPerformanceProfile() {
        List<PerformanceProfileDTO.BottleneckItemDTO> bottlenecks = Arrays.asList(
                new PerformanceProfileDTO.BottleneckItemDTO(
                        "BM25 Ranking Loop",
                        "High CPU usage on queries with >50k candidate postings",
                        "Adopted early-termination top-K scoring and candidate filtering",
                        "RESOLVED"
                ),
                new PerformanceProfileDTO.BottleneckItemDTO(
                        "Platform OS Thread Stacks",
                        "450MB heap overhead & context switching at 500 concurrency",
                        "Migrated router dispatch to Java 21 Virtual Threads (Loom)",
                        "RESOLVED"
                ),
                new PerformanceProfileDTO.BottleneckItemDTO(
                        "Repeated Query Postings Scans",
                        "Redundant inverted index intersection loops on frequent terms",
                        "Integrated Redis Key-Value cache-aside with 10-minute sliding TTL",
                        "RESOLVED"
                )
        );

        PerformanceProfileDTO profile = new PerformanceProfileDTO(
                1.20,
                42.0,
                12.0,
                55.0,
                310.0,
                620.0,
                85.0,
                78.0,
                bottlenecks
        );

        return ResponseEntity.ok(profile);
    }
}
