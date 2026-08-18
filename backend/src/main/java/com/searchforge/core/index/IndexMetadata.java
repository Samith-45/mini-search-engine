package com.searchforge.core.index;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Metadata snapshot for the inverted index, including document lengths and global term metrics.
 */
public class IndexMetadata {

    private final Map<Long, Integer> documentLengths = new ConcurrentHashMap<>();
    private long totalTokens = 0;

    public void recordDocumentLength(Long docId, int length) {
        Integer old = documentLengths.put(docId, length);
        if (old != null) {
            totalTokens -= old;
        }
        totalTokens += length;
    }

    public void removeDocumentLength(Long docId) {
        Integer length = documentLengths.remove(docId);
        if (length != null) {
            totalTokens -= length;
        }
    }

    public int getDocumentLength(Long docId) {
        return documentLengths.getOrDefault(docId, 0);
    }

    public int getTotalDocuments() {
        return documentLengths.size();
    }

    public long getTotalTokens() {
        return totalTokens;
    }

    public double getAverageDocumentLength() {
        int count = getTotalDocuments();
        if (count == 0) {
            return 0.0;
        }
        return (double) totalTokens / count;
    }

    public Map<Long, Integer> getDocumentLengths() {
        return Collections.unmodifiableMap(documentLengths);
    }
}
