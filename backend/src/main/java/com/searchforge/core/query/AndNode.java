package com.searchforge.core.query;

import com.searchforge.core.index.InvertedIndex;
import java.util.*;
import java.util.stream.Collectors;

public class AndNode implements QueryNode {
    private final List<QueryNode> children;

    public AndNode(List<QueryNode> children) {
        this.children = children != null ? children : Collections.emptyList();
    }

    @Override
    public Set<Long> evaluate(InvertedIndex index) {
        if (children.isEmpty()) {
            return Collections.emptySet();
        }
        Set<Long> result = null;
        for (QueryNode child : children) {
            Set<Long> childRes = child.evaluate(index);
            if (result == null) {
                result = new HashSet<>(childRes);
            } else {
                result.retainAll(childRes);
            }
            if (result.isEmpty()) {
                break;
            }
        }
        return result != null ? result : Collections.emptySet();
    }

    @Override
    public List<String> getTerms() {
        return children.stream().flatMap(c -> c.getTerms().stream()).collect(Collectors.toList());
    }

    @Override
    public String toRepresentation() {
        return "AND(" + children.stream().map(QueryNode::toRepresentation).collect(Collectors.joining(", ")) + ")";
    }
}
