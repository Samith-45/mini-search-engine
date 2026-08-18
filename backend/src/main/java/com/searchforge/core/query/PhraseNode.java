package com.searchforge.core.query;

import com.searchforge.core.index.InvertedIndex;
import java.util.*;
import java.util.stream.Collectors;

public class PhraseNode implements QueryNode {
    private final List<String> terms;

    public PhraseNode(List<String> terms) {
        this.terms = terms != null ? terms : Collections.emptyList();
    }

    @Override
    public Set<Long> evaluate(InvertedIndex index) {
        return index.getCandidateDocIdsPhrase(terms);
    }

    @Override
    public List<String> getTerms() {
        return new ArrayList<>(terms);
    }

    @Override
    public String toRepresentation() {
        return "PHRASE(\"" + String.join(" ", terms) + "\")";
    }
}
