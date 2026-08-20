package com.searchforge.controller;

import com.searchforge.dto.CorpusStatsDTO;
import com.searchforge.model.IndexingCheckpoint;
import com.searchforge.model.IndexingJob;
import com.searchforge.service.CorpusIngestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/corpus")
public class CorpusController {

    private final CorpusIngestionService ingestionService;

    public CorpusController(CorpusIngestionService ingestionService) {
        this.ingestionService = ingestionService;
    }

    @GetMapping("/stats")
    public ResponseEntity<CorpusStatsDTO> getCorpusStats() {
        return ResponseEntity.ok(ingestionService.getLiveCorpusStats());
    }

    @PostMapping("/ingest")
    public ResponseEntity<IndexingJob> triggerIngestion(
            @RequestParam(defaultValue = "10000") long count,
            @RequestParam(defaultValue = "5000") int batchSize
    ) {
        IndexingJob job = ingestionService.triggerBatchIngestion(count, batchSize);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/checkpoints")
    public ResponseEntity<List<IndexingCheckpoint>> getCheckpoints() {
        return ResponseEntity.ok(ingestionService.getCheckpoints());
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<IndexingJob> getJobStatus(@PathVariable String jobId) {
        IndexingJob job = ingestionService.getJobStatus(jobId);
        if (job == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(job);
    }
}
