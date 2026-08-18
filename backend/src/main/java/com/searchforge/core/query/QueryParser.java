package com.searchforge.core.query;

import com.searchforge.core.normalizer.DefaultTextNormalizer;
import com.searchforge.core.normalizer.TextNormalizer;
import com.searchforge.core.tokenizer.SimpleTokenizer;
import com.searchforge.core.tokenizer.Tokenizer;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Robust Query Parser transforming raw user input query strings into Abstract Syntax Trees (QueryNode AST).
 */
public class QueryParser {

    private static final Pattern PHRASE_PATTERN = Pattern.compile("\"([^\"]+)\"");

    private final Tokenizer tokenizer;
    private final TextNormalizer normalizer;

    public QueryParser() {
        this(new SimpleTokenizer(), new DefaultTextNormalizer(false, true)); // keep search terms, enable light stem
    }

    public QueryParser(Tokenizer tokenizer, TextNormalizer normalizer) {
        this.tokenizer = tokenizer;
        this.normalizer = normalizer;
    }

    public QueryNode parse(String rawQuery) {
        if (rawQuery == null || rawQuery.isBlank()) {
            return new TermNode("");
        }

        String query = rawQuery.trim();

        // 1. Check for phrase query in quotes: "distributed systems"
        Matcher phraseMatcher = PHRASE_PATTERN.matcher(query);
        if (phraseMatcher.find()) {
            String phraseText = phraseMatcher.group(1);
            List<String> rawTokens = tokenizer.tokenize(phraseText);
            List<String> normTokens = normalizer.normalizeTokens(rawTokens);
            if (!normTokens.isEmpty()) {
                return new PhraseNode(normTokens);
            }
        }

        // 2. Check for explicit Boolean AND / OR operators
        if (query.contains(" AND ")) {
            String[] parts = query.split("\\s+AND\\s+");
            List<QueryNode> children = new ArrayList<>();
            for (String part : parts) {
                children.add(parse(part));
            }
            return new AndNode(children);
        }

        if (query.contains(" OR ")) {
            String[] parts = query.split("\\s+OR\\s+");
            List<QueryNode> children = new ArrayList<>();
            for (String part : parts) {
                children.add(parse(part));
            }
            return new OrNode(children);
        }

        // 3. Multi-term or single-term query (default OR list)
        List<String> rawTokens = tokenizer.tokenize(query);
        List<String> normTokens = normalizer.normalizeTokens(rawTokens);

        if (normTokens.isEmpty()) {
            return new TermNode("");
        }
        if (normTokens.size() == 1) {
            return new TermNode(normTokens.get(0));
        }

        List<QueryNode> terms = new ArrayList<>();
        for (String t : normTokens) {
            terms.add(new TermNode(t));
        }
        return new OrNode(terms);
    }
}
