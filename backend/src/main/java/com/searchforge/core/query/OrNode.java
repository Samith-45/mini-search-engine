package com.searchforge.core.query;

import com.searchforge.core.index.InvertedIndex;
import java.util.*;
import java.util.stream.Collectors;

public class OrNode implements QueryNode {
    private final List<QueryNode> children;

    public OrNode(List<QueryNode> children) {
        this.children = children != null ? children : Collections.emptyList();
    }

    @Override
    public Set<Long> evaluate(InvertedIndex index) {
        Set<Long> result = new HashSet<>();
        for (QueryNode child : children) {
            result.addAll(child.evaluate(index));
        }
        return result;
    }

    @Override
    public List<String> getTerms() {
        return children.stream().flatMap(c -> c.getTerms().stream()).collect(Collectors.toList());
    }

    @Override
    public String toRepresentation() {
        return "OR(" + children.stream().map(QueryNode::toRepresentation).collect(Collectors.joining(", ")) + ")";
    }
}
