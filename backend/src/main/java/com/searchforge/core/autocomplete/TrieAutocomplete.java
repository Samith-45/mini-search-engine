package com.searchforge.core.autocomplete;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Thread-safe In-Memory Prefix Trie providing O(L) insertion and fast prefix autocomplete search.
 */
public class TrieAutocomplete {

    private final TrieNode root = new TrieNode();

    public synchronized void insert(String word) {
        insert(word, 1);
    }

    public synchronized void insert(String word, int weight) {
        if (word == null || word.isBlank()) {
            return;
        }

        String cleaned = word.trim().toLowerCase();
        TrieNode current = root;

        for (char c : cleaned.toCharArray()) {
            current = current.getChildren().computeIfAbsent(c, k -> new TrieNode());
        }

        current.setEndOfWord(true);
        current.setWord(cleaned);
        if (weight > 1) {
            current.setFrequency(current.getFrequency() + weight);
        } else {
            current.incrementFrequency();
        }
    }

    /**
     * Finds top-K term/phrase suggestions matching a given prefix.
     */
    public synchronized List<String> getSuggestions(String prefix, int limit) {
        if (prefix == null || prefix.isBlank()) {
            return Collections.emptyList();
        }

        String cleanedPrefix = prefix.trim().toLowerCase();
        TrieNode current = root;

        for (char c : cleanedPrefix.toCharArray()) {
            current = current.getChildren().get(c);
            if (current == null) {
                return Collections.emptyList(); // Prefix not found
            }
        }

        // Collect all descendant words
        List<TrieNode> matches = new ArrayList<>();
        collectWords(current, matches);

        // Sort descending by frequency and length
        matches.sort((a, b) -> {
            int cmp = Integer.compare(b.getFrequency(), a.getFrequency());
            if (cmp == 0) {
                return Integer.compare(a.getWord().length(), b.getWord().length());
            }
            return cmp;
        });

        List<String> results = new ArrayList<>();
        for (int i = 0; i < Math.min(limit, matches.size()); i++) {
            results.add(matches.get(i).getWord());
        }

        return results;
    }

    private void collectWords(TrieNode node, List<TrieNode> matches) {
        if (node.isEndOfWord()) {
            matches.add(node);
        }

        for (TrieNode child : node.getChildren().values()) {
            collectWords(child, matches);
        }
    }

    public synchronized void clear() {
        root.getChildren().clear();
    }
}
