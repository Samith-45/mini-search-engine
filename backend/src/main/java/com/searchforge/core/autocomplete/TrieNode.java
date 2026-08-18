package com.searchforge.core.autocomplete;

import java.util.HashMap;
import java.util.Map;

/**
 * Node in the Prefix Trie for autocomplete.
 */
public class TrieNode {

    private final Map<Character, TrieNode> children = new HashMap<>();
    private boolean isEndOfWord = false;
    private String word = null;
    private int frequency = 0;

    public Map<Character, TrieNode> getChildren() {
        return children;
    }

    public boolean isEndOfWord() {
        return isEndOfWord;
    }

    public void setEndOfWord(boolean endOfWord) {
        isEndOfWord = endOfWord;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public int getFrequency() {
        return frequency;
    }

    public void incrementFrequency() {
        this.frequency++;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }
}
