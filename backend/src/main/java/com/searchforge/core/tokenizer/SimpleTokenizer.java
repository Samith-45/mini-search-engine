package com.searchforge.core.tokenizer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Standard implementation of Tokenizer that splits on non-alphanumeric boundaries.
 * Preserves alphanumeric terms and single-byte/multi-byte words, stripping punctuation.
 */
public class SimpleTokenizer implements Tokenizer {

    private static final Pattern NON_ALPHANUMERIC_PATTERN = Pattern.compile("[^a-zA-Z0-9]+");

    @Override
    public List<String> tokenize(String text) {
        if (text == null || text.isBlank()) {
            return Collections.emptyList();
        }

        String[] rawTokens = NON_ALPHANUMERIC_PATTERN.split(text);
        List<String> tokens = new ArrayList<>(rawTokens.length);

        for (String token : rawTokens) {
            String trimmed = token.trim();
            if (!trimmed.isEmpty()) {
                tokens.add(trimmed);
            }
        }

        return tokens;
    }
}
