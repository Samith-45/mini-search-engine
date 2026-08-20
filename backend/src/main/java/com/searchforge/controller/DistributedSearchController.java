package com.searchforge.controller;

import com.searchforge.core.distributed.DistributedClusterManager;
import com.searchforge.core.distributed.SearchShard;
import com.searchforge.dto.ClusterTopologyDTO;
import com.searchforge.dto.ShardStatusDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cluster")
public class DistributedSearchController {

    private final DistributedClusterManager clusterManager;

    public DistributedSearchController(DistributedClusterManager clusterManager) {
        this.clusterManager = clusterManager;
    }

    @GetMapping("/topology")
    public ResponseEntity<ClusterTopologyDTO> getTopology() {
        List<ShardStatusDTO> primaryDTOs = new ArrayList<>();
        long totalDocs = 0;
        for (SearchShard s : clusterManager.getPrimaryShards()) {
            primaryDTOs.add(new ShardStatusDTO(
                    s.getShardId(),
                    s.getPartitionIndex(),
                    s.getNodeHost(),
                    s.getPort(),
                    true,
                    s.isHealthy(),
                    s.getArtificialLatencyMs(),
                    s.getTotalDocuments()
            ));
            totalDocs += s.getTotalDocuments();
        }

        List<ShardStatusDTO> replicaDTOs = new ArrayList<>();
        for (SearchShard s : clusterManager.getReplicaShards()) {
            replicaDTOs.add(new ShardStatusDTO(
                    s.getShardId(),
                    s.getPartitionIndex(),
                    s.getNodeHost(),
                    s.getPort(),
                    false,
                    s.isHealthy(),
                    s.getArtificialLatencyMs(),
                    s.getTotalDocuments()
            ));
        }

        DistributedClusterManager.ClusterConfigProfile profile = clusterManager.getActiveProfile();

        ClusterTopologyDTO topology = new ClusterTopologyDTO(
                profile.name(),
                profile.getDisplayName(),
                clusterManager.getPrimaryShards().size(),
                clusterManager.getReplicaShards().size(),
                profile.isCacheEnabled(),
                totalDocs,
                primaryDTOs,
                replicaDTOs
        );

        return ResponseEntity.ok(topology);
    }

    @PostMapping("/profile")
    public ResponseEntity<ClusterTopologyDTO> switchProfile(@RequestParam String profile) {
        try {
            DistributedClusterManager.ClusterConfigProfile p = DistributedClusterManager.ClusterConfigProfile.valueOf(profile);
            clusterManager.applyProfile(p);
            return getTopology();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
