package com.searchforge.service;

import com.searchforge.dto.AnalyticsSummaryDTO;
import com.searchforge.dto.EngineeringStatsDTO;
import com.searchforge.repository.DocumentRepository;
import com.searchforge.repository.SearchQueryLogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnalyticsService {

    private final SearchQueryLogRepository queryLogRepository;
    private final DocumentService documentService;

    public AnalyticsService(SearchQueryLogRepository queryLogRepository, DocumentService documentService) {
        this.queryLogRepository = queryLogRepository;
        this.documentService = documentService;
    }

    public AnalyticsSummaryDTO getSummary() {
        long totalSearches = queryLogRepository.count();
        Double avgLatency = queryLogRepository.findAverageLatency();
        long zeroResults = queryLogRepository.countZeroResultQueries();
        long cacheHits = queryLogRepository.countCacheHits();

        double hitRatio = totalSearches > 0 ? (double) cacheHits / totalSearches : 0.0;
        int indexedDocs = documentService.getInvertedIndex().getTotalDocuments();

        return new AnalyticsSummaryDTO(
                totalSearches,
                avgLatency != null ? Math.round(avgLatency * 100.0) / 100.0 : 0.0,
                zeroResults,
                Math.round(hitRatio * 100.0) / 100.0,
                indexedDocs
        );
    }

    public List<Map<String, Object>> getPopularQueries(int limit) {
        List<Object[]> rows = queryLogRepository.findPopularQueries(PageRequest.of(0, limit));
        List<Map<String, Object>> results = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> map = new HashMap<>();
            map.put("query", row[0]);
            map.put("count", row[1]);
            results.add(map);
        }
        return results;
    }

    public EngineeringStatsDTO getEngineeringStats() {
        var metadata = documentService.getInvertedIndex().getMetadata();
        Set<String> terms = documentService.getInvertedIndex().getAllTerms();

        Map<String, Object> algos = Map.of(
                "TF-IDF", Map.of("description", "Term Frequency - Inverse Document Frequency", "smoothing", "Smoothed Logarithmic IDF"),
                "BM25", Map.of("description", "Okapi BM25 Non-Linear Term Saturation", "k1", 1.2, "b", 0.75)
        );

        return new EngineeringStatsDTO(
                metadata.getTotalDocuments(),
                metadata.getTotalTokens(),
                Math.round(metadata.getAverageDocumentLength() * 100.0) / 100.0,
                terms.size(),
                algos
        );
    }
}
