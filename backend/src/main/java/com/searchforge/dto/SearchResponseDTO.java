package com.searchforge.dto;

import com.searchforge.core.ranking.RelevanceExplanation;
import java.util.List;

public class SearchResponseDTO {

    private String query;
    private String algorithm;
    private long executionTimeMs;
    private int totalResults;
    private int page;
    private int size;
    private boolean cacheHit;
    private List<SearchResultItemDTO> results;

    public SearchResponseDTO() {}

    public SearchResponseDTO(String query, String algorithm, long executionTimeMs, int totalResults, int page, int size, boolean cacheHit, List<SearchResultItemDTO> results) {
        this.query = query;
        this.algorithm = algorithm;
        this.executionTimeMs = executionTimeMs;
        this.totalResults = totalResults;
        this.page = page;
        this.size = size;
        this.cacheHit = cacheHit;
        this.results = results;
    }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }
    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }
    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }
    public int getTotalResults() { return totalResults; }
    public void setTotalResults(int totalResults) { this.totalResults = totalResults; }
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }
    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }
    public boolean isCacheHit() { return cacheHit; }
    public void setCacheHit(boolean cacheHit) { this.cacheHit = cacheHit; }
    public List<SearchResultItemDTO> getResults() { return results; }
    public void setResults(List<SearchResultItemDTO> results) { this.results = results; }
}
