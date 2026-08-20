package com.searchforge.dto;

import java.util.List;

public class PerformanceProfileDTO {
    private double totalQueryLatencyMs;
    private double tokenizationTimeUs;
    private double cacheLookupTimeUs;
    private double shardDispatchTimeUs;
    private double postingTraversalTimeUs;
    private double bm25RankingTimeUs;
    private double topKHeapMergeTimeUs;
    private double serializationTimeUs;
    private List<BottleneckItemDTO> bottlenecks;

    public PerformanceProfileDTO() {}

    public PerformanceProfileDTO(double totalQueryLatencyMs, double tokenizationTimeUs, double cacheLookupTimeUs, double shardDispatchTimeUs, double postingTraversalTimeUs, double bm25RankingTimeUs, double topKHeapMergeTimeUs, double serializationTimeUs, List<BottleneckItemDTO> bottlenecks) {
        this.totalQueryLatencyMs = totalQueryLatencyMs;
        this.tokenizationTimeUs = tokenizationTimeUs;
        this.cacheLookupTimeUs = cacheLookupTimeUs;
        this.shardDispatchTimeUs = shardDispatchTimeUs;
        this.postingTraversalTimeUs = postingTraversalTimeUs;
        this.bm25RankingTimeUs = bm25RankingTimeUs;
        this.topKHeapMergeTimeUs = topKHeapMergeTimeUs;
        this.serializationTimeUs = serializationTimeUs;
        this.bottlenecks = bottlenecks;
    }

    public double getTotalQueryLatencyMs() { return totalQueryLatencyMs; }
    public void setTotalQueryLatencyMs(double totalQueryLatencyMs) { this.totalQueryLatencyMs = totalQueryLatencyMs; }

    public double getTokenizationTimeUs() { return tokenizationTimeUs; }
    public void setTokenizationTimeUs(double tokenizationTimeUs) { this.tokenizationTimeUs = tokenizationTimeUs; }

    public double getCacheLookupTimeUs() { return cacheLookupTimeUs; }
    public void setCacheLookupTimeUs(double cacheLookupTimeUs) { this.cacheLookupTimeUs = cacheLookupTimeUs; }

    public double getShardDispatchTimeUs() { return shardDispatchTimeUs; }
    public void setShardDispatchTimeUs(double shardDispatchTimeUs) { this.shardDispatchTimeUs = shardDispatchTimeUs; }

    public double getPostingTraversalTimeUs() { return postingTraversalTimeUs; }
    public void setPostingTraversalTimeUs(double postingTraversalTimeUs) { this.postingTraversalTimeUs = postingTraversalTimeUs; }

    public double getBm25RankingTimeUs() { return bm25RankingTimeUs; }
    public void setBm25RankingTimeUs(double bm25RankingTimeUs) { this.bm25RankingTimeUs = bm25RankingTimeUs; }

    public double getTopKHeapMergeTimeUs() { return topKHeapMergeTimeUs; }
    public void setTopKHeapMergeTimeUs(double topKHeapMergeTimeUs) { this.topKHeapMergeTimeUs = topKHeapMergeTimeUs; }

    public double getSerializationTimeUs() { return serializationTimeUs; }
    public void setSerializationTimeUs(double serializationTimeUs) { this.serializationTimeUs = serializationTimeUs; }

    public List<BottleneckItemDTO> getBottlenecks() { return bottlenecks; }
    public void setBottlenecks(List<BottleneckItemDTO> bottlenecks) { this.bottlenecks = bottlenecks; }

    public static class BottleneckItemDTO {
        private String component;
        private String impact;
        private String optimization;
        private String status;

        public BottleneckItemDTO() {}

        public BottleneckItemDTO(String component, String impact, String optimization, String status) {
            this.component = component;
            this.impact = impact;
            this.optimization = optimization;
            this.status = status;
        }

        public String getComponent() { return component; }
        public void setComponent(String component) { this.component = component; }

        public String getImpact() { return impact; }
        public void setImpact(String impact) { this.impact = impact; }

        public String getOptimization() { return optimization; }
        public void setOptimization(String optimization) { this.optimization = optimization; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
