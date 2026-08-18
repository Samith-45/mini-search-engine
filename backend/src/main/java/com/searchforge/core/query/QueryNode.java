package com.searchforge.core.query;

import com.searchforge.core.index.InvertedIndex;
import java.util.List;
import java.util.Set;

/**
 * Abstract Syntax Tree (AST) node for query processing.
 */
public interface QueryNode {

    /**
     * Evaluates the AST node against the InvertedIndex to return candidate document IDs.
     */
    Set<Long> evaluate(InvertedIndex index);

    /**
     * Returns list of normalized terms contained within this AST node.
     */
    List<String> getTerms();

    /**
     * Human-readable string representation of the parsed query structure.
     */
    String toRepresentation();
}
