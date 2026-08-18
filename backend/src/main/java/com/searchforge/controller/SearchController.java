package com.searchforge.controller;

import com.searchforge.dto.SearchResponseDTO;
import com.searchforge.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Search API", description = "Query execution, autocomplete, and relevance score explanations")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    @Operation(summary = "Execute a search query using BM25 or TF-IDF")
    public ResponseEntity<SearchResponseDTO> search(
            @RequestParam(name = "q") String query,
            @RequestParam(name = "algorithm", defaultValue = "BM25") String algorithm,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "category", required = false) String category
    ) {
        SearchResponseDTO response = searchService.search(query, algorithm, page, size, category);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/autocomplete")
    @Operation(summary = "Get Trie-based prefix autocomplete suggestions")
    public ResponseEntity<List<String>> autocomplete(
            @RequestParam(name = "q") String prefix,
            @RequestParam(name = "limit", defaultValue = "5") int limit
    ) {
        List<String> suggestions = searchService.autocomplete(prefix, limit);
        return ResponseEntity.ok(suggestions);
    }
}
