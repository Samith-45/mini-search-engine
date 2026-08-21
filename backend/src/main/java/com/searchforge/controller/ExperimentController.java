package com.searchforge.controller;

import com.searchforge.model.ExperimentRecord;
import com.searchforge.repository.ExperimentRecordRepository;
import com.searchforge.service.ArchitectureDecisionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ExperimentController {

    private final ExperimentRecordRepository experimentRepo;
    private final ArchitectureDecisionService adrService;

    public ExperimentController(ExperimentRecordRepository experimentRepo, ArchitectureDecisionService adrService) {
        this.experimentRepo = experimentRepo;
        this.adrService = adrService;
    }

    @GetMapping("/experiments")
    public ResponseEntity<List<ExperimentRecord>> listExperiments() {
        return ResponseEntity.ok(experimentRepo.findAllByOrderByTimestampDesc());
    }

    @GetMapping("/experiments/latest")
    public ResponseEntity<ExperimentRecord> getLatestExperiment() {
        Optional<ExperimentRecord> latest = experimentRepo.findFirstByOrderByTimestampDesc();
        return latest.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping("/experiments")
    public ResponseEntity<ExperimentRecord> recordExperiment(@RequestBody ExperimentRecord record) {
        ExperimentRecord saved = experimentRepo.save(record);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/adrs")
    public ResponseEntity<List<ArchitectureDecisionService.ArchitectureDecisionRecord>> getADRs() {
        return ResponseEntity.ok(adrService.getAllDecisions());
    }
}
