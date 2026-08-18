package com.searchforge.core.normalizer;

import java.util.List;

/**
 * Normalizer pipeline interface for transforming tokens (lowercasing, stopword filtering, stemming).
 */
public interface TextNormalizer {
    /**
     * Normalizes a single token. Returns empty string or null if token should be filtered out.
     */
    String normalizeToken(String token);

    /**
     * Normalizes a list of tokens.
     */
    List<String> normalizeTokens(List<String> tokens);
}
