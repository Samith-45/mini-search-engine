package com.searchforge.core.query;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class QueryParserTest {

    private QueryParser parser;

    @BeforeEach
    void setUp() {
        parser = new QueryParser();
    }

    @Test
    void testSingleTermParsing() {
        QueryNode node = parser.parse("java");
        assertTrue(node instanceof TermNode);
        assertEquals(1, node.getTerms().size());
    }

    @Test
    void testAndBooleanQuery() {
        QueryNode node = parser.parse("java AND spring");
        assertTrue(node instanceof AndNode);
        assertEquals(2, node.getTerms().size());
    }

    @Test
    void testPhraseQuery() {
        QueryNode node = parser.parse("\"distributed systems\"");
        assertTrue(node instanceof PhraseNode);
    }
}
