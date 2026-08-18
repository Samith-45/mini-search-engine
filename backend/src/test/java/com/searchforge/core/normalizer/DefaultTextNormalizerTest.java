package com.searchforge.core.normalizer;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DefaultTextNormalizerTest {

    private TextNormalizer normalizer;

    @BeforeEach
    void setUp() {
        normalizer = new DefaultTextNormalizer(true, true);
    }

    @Test
    void testLowercasingAndStopwords() {
        List<String> raw = List.of("The", "quick", "brown", "fox", "and", "a", "dog");
        List<String> normalized = normalizer.normalizeTokens(raw);

        assertFalse(normalized.contains("the"));
        assertFalse(normalized.contains("and"));
        assertFalse(normalized.contains("a"));
        assertTrue(normalized.contains("quick"));
        assertTrue(normalized.contains("fox"));
    }

    @Test
    void testStemming() {
        assertEquals("system", normalizer.normalizeToken("systems"));
        assertEquals("index", normalizer.normalizeToken("indexing"));
    }
}
