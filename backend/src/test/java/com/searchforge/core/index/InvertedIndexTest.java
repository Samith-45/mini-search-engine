package com.searchforge.core.index;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class InvertedIndexTest {

    private InvertedIndex index;

    @BeforeEach
    void setUp() {
        index = new InvertedIndex();
    }

    @Test
    void testAddDocumentAndLookup() {
        index.addDocument(1L, List.of("java", "spring", "boot"));
        index.addDocument(2L, List.of("python", "django", "spring"));

        PostingList springList = index.getPostingList("spring");
        assertNotNull(springList);
        assertEquals(2, springList.getDocumentFrequency());

        PostingList javaList = index.getPostingList("java");
        assertNotNull(javaList);
        assertEquals(1, javaList.getDocumentFrequency());
        assertEquals(1L, javaList.getNodes().get(0).getDocId());
    }

    @Test
    void testPhraseSearch() {
        index.addDocument(1L, List.of("distributed", "systems", "architecture"));
        index.addDocument(2L, List.of("systems", "distributed", "design"));

        Set<Long> phraseDocs = index.getCandidateDocIdsPhrase(List.of("distributed", "systems"));
        assertEquals(1, phraseDocs.size());
        assertTrue(phraseDocs.contains(1L));
        assertFalse(phraseDocs.contains(2L));
    }
}
