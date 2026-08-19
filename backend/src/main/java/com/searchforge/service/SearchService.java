package com.searchforge.service;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.normalizer.DefaultTextNormalizer;
import com.searchforge.core.normalizer.TextNormalizer;
import com.searchforge.core.query.QueryNode;
import com.searchforge.core.query.QueryParser;
import com.searchforge.core.ranking.BM25RankingStrategy;
import com.searchforge.core.ranking.RankingStrategy;
import com.searchforge.core.ranking.ScoreResult;
import com.searchforge.core.ranking.TFIDFRankingStrategy;
import com.searchforge.core.tokenizer.SimpleTokenizer;
import com.searchforge.core.tokenizer.Tokenizer;
import com.searchforge.dto.SearchResponseDTO;
import com.searchforge.dto.SearchResultItemDTO;
import com.searchforge.model.DocumentEntity;
import com.searchforge.model.SearchQueryLog;
import com.searchforge.repository.SearchQueryLogRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SearchService {

    private final DocumentService documentService;
    private final CacheService cacheService;
    private final SearchQueryLogRepository queryLogRepository;
    private final Tokenizer tokenizer = new SimpleTokenizer();
    private final TextNormalizer normalizer = new DefaultTextNormalizer();
    private final QueryParser queryParser = new QueryParser(tokenizer, normalizer);

    public SearchService(DocumentService documentService, CacheService cacheService, SearchQueryLogRepository queryLogRepository) {
        this.documentService = documentService;
        this.cacheService = cacheService;
        this.queryLogRepository = queryLogRepository;
    }

    public SearchResponseDTO search(String query, String algorithm, int page, int size, String categoryFilter) {
        String algoName = (algorithm != null && algorithm.equalsIgnoreCase("TF-IDF")) ? "TF-IDF" : "BM25";

        // Handle Category Browse mode when query is empty or blank
        if (query == null || query.isBlank()) {
            List<DocumentEntity> allDocs = documentService.getAllDocuments();
            if (categoryFilter != null && !categoryFilter.isBlank() && !categoryFilter.equalsIgnoreCase("All")) {
                allDocs = allDocs.stream()
                        .filter(d -> categoryFilter.equalsIgnoreCase(d.getCategory()))
                        .toList();
            }

            int total = allDocs.size();
            int from = Math.min((page - 1) * size, total);
            int to = Math.min(from + size, total);
            List<DocumentEntity> paged = (from < total) ? allDocs.subList(from, to) : Collections.emptyList();

            List<SearchResultItemDTO> items = paged.stream().map(doc -> new SearchResultItemDTO(
                    doc.getId(),
                    doc.getTitle(),
                    doc.getContent().substring(0, Math.min(180, doc.getContent().length())) + "...",
                    doc.getUrl(),
                    doc.getCategory(),
                    doc.getTags(),
                    doc.getAuthor(),
                    1.0,
                    Collections.emptyList(),
                    null
            )).toList();

            return new SearchResponseDTO(query != null ? query : "", algoName, 2, total, page, size, false, items);
        }

        String cacheKey = query.trim().toLowerCase() + ":" + algoName + ":" + page + ":" + size + ":" + (categoryFilter != null ? categoryFilter : "");

        // 1. Check Cache
        SearchResponseDTO cached = cacheService.getCachedQuery(cacheKey);
        if (cached != null) {
            cached.setCacheHit(true);
            return cached;
        }

        long startTime = System.currentTimeMillis();

        // 2. Parse Query AST
        QueryNode astNode = queryParser.parse(query);
        InvertedIndex index = documentService.getInvertedIndex();

        // 3. Candidate Retrieval
        Set<Long> candidateDocIds = astNode.evaluate(index);

        // 4. Select Ranking Strategy
        RankingStrategy rankingStrategy = algoName.equals("TF-IDF") ? new TFIDFRankingStrategy() : new BM25RankingStrategy();

        // 5. Rank candidates
        List<ScoreResult> rankedResults = rankingStrategy.rank(candidateDocIds, astNode.getTerms(), index);

        // Filter by category if requested
        if (categoryFilter != null && !categoryFilter.isBlank() && !categoryFilter.equalsIgnoreCase("All")) {
            rankedResults.removeIf(sr -> {
                Optional<DocumentEntity> doc = documentService.getDocumentById(sr.getDocId());
                return doc.isEmpty() || !categoryFilter.equalsIgnoreCase(doc.get().getCategory());
            });
        }

        int totalResults = rankedResults.size();

        // 6. Pagination
        int fromIndex = Math.min((page - 1) * size, totalResults);
        int toIndex = Math.min(fromIndex + size, totalResults);

        List<ScoreResult> pagedScoreResults = (fromIndex < totalResults) ? rankedResults.subList(fromIndex, toIndex) : Collections.emptyList();

        List<SearchResultItemDTO> items = new ArrayList<>();
        for (ScoreResult sr : pagedScoreResults) {
            Optional<DocumentEntity> docOpt = documentService.getDocumentById(sr.getDocId());
            if (docOpt.isPresent()) {
                DocumentEntity doc = docOpt.get();
                String snippet = createSnippet(doc.getContent(), astNode.getTerms());

                items.add(new SearchResultItemDTO(
                        doc.getId(),
                        doc.getTitle(),
                        snippet,
                        doc.getUrl(),
                        doc.getCategory(),
                        doc.getTags(),
                        doc.getAuthor(),
                        sr.getScore(),
                        astNode.getTerms(),
                        sr.getExplanation()
                ));
            }
        }

        long executionTimeMs = System.currentTimeMillis() - startTime;

        // 7. Log analytics asynchronously
        try {
            queryLogRepository.save(new SearchQueryLog(query, algoName, executionTimeMs, totalResults, false));
        } catch (Exception e) {
            // Non-blocking log write
        }

        SearchResponseDTO response = new SearchResponseDTO(query, algoName, executionTimeMs, totalResults, page, size, false, items);

        // 8. Cache response
        cacheService.cacheQuery(cacheKey, response);

        return response;
    }

    public List<String> autocomplete(String prefix, int limit) {
        return documentService.getTrieAutocomplete().getSuggestions(prefix, limit);
    }

    private String createSnippet(String content, List<String> terms) {
        if (content == null || content.isBlank()) return "";
        if (terms == null || terms.isEmpty()) {
            return content.substring(0, Math.min(180, content.length())) + "...";
        }

        String lowerContent = content.toLowerCase();
        int earliestIndex = -1;

        for (String term : terms) {
            int idx = lowerContent.indexOf(term.toLowerCase());
            if (idx != -1 && (earliestIndex == -1 || idx < earliestIndex)) {
                earliestIndex = idx;
            }
        }

        if (earliestIndex == -1) {
            return content.substring(0, Math.min(180, content.length())) + "...";
        }

        int start = Math.max(0, earliestIndex - 40);
        int end = Math.min(content.length(), start + 200);

        String snippet = content.substring(start, end);
        if (start > 0) snippet = "..." + snippet;
        if (end < content.length()) snippet = snippet + "...";

        return snippet;
    }
}
