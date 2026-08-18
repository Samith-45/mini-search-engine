package com.searchforge.core.autocomplete;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class TrieAutocompleteTest {

    private TrieAutocomplete trie;

    @BeforeEach
    void setUp() {
        trie = new TrieAutocomplete();
        trie.insert("java", 10);
        trie.insert("javascript", 8);
        trie.insert("java spring boot", 15);
        trie.insert("python", 5);
    }

    @Test
    void testPrefixSuggestionsRanking() {
        List<String> suggestions = trie.getSuggestions("jav", 5);
        assertEquals(3, suggestions.size());
        assertEquals("java spring boot", suggestions.get(0), "Highest frequency should come first");
        assertEquals("java", suggestions.get(1));
        assertEquals("javascript", suggestions.get(2));
    }

    @Test
    void testNonMatchingPrefix() {
        List<String> suggestions = trie.getSuggestions("xyz", 5);
        assertTrue(suggestions.isEmpty());
    }
}
