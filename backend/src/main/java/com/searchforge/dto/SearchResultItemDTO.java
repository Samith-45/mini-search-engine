package com.searchforge.dto;

import com.searchforge.core.ranking.RelevanceExplanation;
import java.util.List;

public class SearchResultItemDTO {

    private Long id;
    private String title;
    private String contentSnippet;
    private String url;
    private String category;
    private String tags;
    private String author;
    private double score;
    private List<String> matchedTerms;
    private RelevanceExplanation explanation;

    public SearchResultItemDTO() {}

    public SearchResultItemDTO(Long id, String title, String contentSnippet, String url, String category, String tags, String author, double score, List<String> matchedTerms, RelevanceExplanation explanation) {
        this.id = id;
        this.title = title;
        this.contentSnippet = contentSnippet;
        this.url = url;
        this.category = category;
        this.tags = tags;
        this.author = author;
        this.score = score;
        this.matchedTerms = matchedTerms;
        this.explanation = explanation;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getContentSnippet() { return contentSnippet; }
    public String getUrl() { return url; }
    public String getCategory() { return category; }
    public String getTags() { return tags; }
    public String getAuthor() { return author; }
    public double getScore() { return score; }
    public List<String> getMatchedTerms() { return matchedTerms; }
    public RelevanceExplanation getExplanation() { return explanation; }
}
