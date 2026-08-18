package com.searchforge.core.tokenizer;

import java.util.List;

/**
 * Contract for splitting raw text into tokens.
 */
public interface Tokenizer {
    /**
     * Tokenizes input text into a list of raw tokens.
     * @param text Raw document or query text
     * @return List of extracted tokens
     */
    List<String> tokenize(String text);
}
