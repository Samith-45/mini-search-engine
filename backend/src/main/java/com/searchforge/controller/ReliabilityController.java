package com.searchforge.controller;

import com.searchforge.core.reliability.ReliabilityEngine;
import com.searchforge.dto.ReliabilityExperimentResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reliability")
public class ReliabilityController {

    private final ReliabilityEngine reliabilityEngine;

    public ReliabilityController(ReliabilityEngine reliabilityEngine) {
        this.reliabilityEngine = reliabilityEngine;
    }

    @PostMapping("/simulate")
    public ResponseEntity<ReliabilityExperimentResult> simulateFailure(
            @RequestParam(defaultValue = "KILL_SHARD") String faultAction,
            @RequestParam(defaultValue = "shard-pri-1") String targetShardId,
            @RequestParam(defaultValue = "50") int injectedLatencyMs
    ) {
        ReliabilityExperimentResult result = reliabilityEngine.executeFailureTest(faultAction, targetShardId, injectedLatencyMs);
        return ResponseEntity.ok(result);
    }
}
