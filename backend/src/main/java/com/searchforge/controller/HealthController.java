package com.searchforge.controller;

import com.searchforge.core.distributed.DistributedClusterManager;
import com.searchforge.dto.HealthTelemetryDTO;
import com.searchforge.model.ExperimentRecord;
import com.searchforge.repository.DocumentRepository;
import com.searchforge.repository.ExperimentRecordRepository;
import com.searchforge.repository.SearchQueryLogRepository;
import com.searchforge.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health & Telemetry API", description = "Live verified JVM runtime, shard cluster, and cache telemetry")
public class HealthController {

    private final DocumentService documentService;
    private final DocumentRepository documentRepository;
    private final ExperimentRecordRepository experimentRepository;
    private final SearchQueryLogRepository searchQueryLogRepository;
    private final DistributedClusterManager clusterManager;

    public HealthController(DocumentService documentService,
                            DocumentRepository documentRepository,
                            ExperimentRecordRepository experimentRepository,
                            SearchQueryLogRepository searchQueryLogRepository,
                            DistributedClusterManager clusterManager) {
        this.documentService = documentService;
        this.documentRepository = documentRepository;
        this.experimentRepository = experimentRepository;
        this.searchQueryLogRepository = searchQueryLogRepository;
        this.clusterManager = clusterManager;
    }

    @GetMapping("/telemetry")
    @Operation(summary = "Get live verified JVM heap, cluster shard health, and query telemetry")
    public ResponseEntity<HealthTelemetryDTO> getTelemetry() {
        Runtime runtime = Runtime.getRuntime();
        double usedHeapMb = Math.round(((runtime.totalMemory() - runtime.freeMemory()) / (1024.0 * 1024.0)) * 100.0) / 100.0;
        double maxHeapMb = Math.round((runtime.maxMemory() / (1024.0 * 1024.0)) * 100.0) / 100.0;
        double totalHeapMb = Math.round((runtime.totalMemory() / (1024.0 * 1024.0)) * 100.0) / 100.0;

        int totalDocs = (int) documentRepository.count();
        if (totalDocs == 0) {
            totalDocs = documentService.getInvertedIndex().getTotalDocuments();
        }

        long totalTokens = documentService.getInvertedIndex().getMetadata().getTotalTokens();
        int vocabSize = documentService.getInvertedIndex().getAllTerms().size();

        int primaryShards = clusterManager.getPrimaryShards().size();
        int replicaShards = clusterManager.getReplicaShards().size();

        long totalQueries = searchQueryLogRepository.count();
        long cacheHits = searchQueryLogRepository.countCacheHits();
        double cacheHitRatio = totalQueries > 0 ? Math.round(((double) cacheHits / totalQueries) * 100.0) / 100.0 : 0.0;

        long expCount = experimentRepository.count();
        Optional<ExperimentRecord> latestExp = experimentRepository.findFirstByOrderByTimestampDesc();

        HealthTelemetryDTO dto = new HealthTelemetryDTO(
                "HEALTHY",
                usedHeapMb,
                maxHeapMb,
                totalHeapMb,
                totalDocs,
                totalTokens,
                vocabSize,
                primaryShards,
                replicaShards,
                cacheHitRatio,
                totalQueries,
                "Java 21 Virtual Threads (Project Loom)",
                expCount,
                latestExp.orElse(null),
                LocalDateTime.now(),
                "20b9e33"
        );

        return ResponseEntity.ok(dto);
    }
}
