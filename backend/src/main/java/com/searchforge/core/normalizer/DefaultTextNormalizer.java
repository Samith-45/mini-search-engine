package com.searchforge.core.normalizer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Composite text normalizer combining lowercasing, stopword removal, and light stemming.
 */
public class DefaultTextNormalizer implements TextNormalizer {

    private final StopWordsFilter stopWordsFilter;
    private final LightStemmer stemmer;
    private final boolean stemmingEnabled;
    private final boolean stopWordsEnabled;

    public DefaultTextNormalizer() {
        this(true, true);
    }

    public DefaultTextNormalizer(boolean stopWordsEnabled, boolean stemmingEnabled) {
        this.stopWordsEnabled = stopWordsEnabled;
        this.stemmingEnabled = stemmingEnabled;
        this.stopWordsFilter = new StopWordsFilter(stopWordsEnabled, null);
        this.stemmer = new LightStemmer();
    }

    @Override
    public String normalizeToken(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }

        String lower = token.trim().toLowerCase();

        if (stopWordsEnabled && stopWordsFilter.isStopWord(lower)) {
            return null;
        }

        if (stemmingEnabled) {
            return stemmer.stem(lower);
        }

        return lower;
    }

    @Override
    public List<String> normalizeTokens(List<String> tokens) {
        if (tokens == null || tokens.isEmpty()) {
            return Collections.emptyList();
        }

        List<String> normalized = new ArrayList<>(tokens.size());
        for (String token : tokens) {
            String norm = normalizeToken(token);
            if (norm != null && !norm.isEmpty()) {
                normalized.add(norm);
            }
        }
        return normalized;
    }
}
