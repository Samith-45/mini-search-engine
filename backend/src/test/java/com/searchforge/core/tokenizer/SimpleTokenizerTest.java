package com.searchforge.core.tokenizer;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SimpleTokenizerTest {

    private Tokenizer tokenizer;

    @BeforeEach
    void setUp() {
        tokenizer = new SimpleTokenizer();
    }

    @Test
    void testBasicTokenization() {
        String text = "Java, Spring Boot & Distributed Systems!";
        List<String> tokens = tokenizer.tokenize(text);

        assertEquals(5, tokens.size());
        assertEquals(List.of("Java", "Spring", "Boot", "Distributed", "Systems"), tokens);
    }

    @Test
    void testEmptyAndNullString() {
        assertTrue(tokenizer.tokenize(null).isEmpty());
        assertTrue(tokenizer.tokenize("   ").isEmpty());
    }

    @Test
    void testNumbersAndSpecialChars() {
        List<String> tokens = tokenizer.tokenize("HTTP 2.0 & WebSockets 100%");
        assertEquals(List.of("HTTP", "2", "0", "WebSockets", "100"), tokens);
    }
}
