package com.searchforge.core.query;

import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.index.PostingList;
import com.searchforge.core.index.PostingNode;

import java.util.*;

public class TermNode implements QueryNode {
    private final String term;

    public TermNode(String term) {
        this.term = term;
    }

    public String getTerm() { return term; }

    @Override
    public Set<Long> evaluate(InvertedIndex index) {
        PostingList postingList = index.getPostingList(term);
        if (postingList == null) {
            return Collections.emptySet();
        }
        Set<Long> docIds = new HashSet<>();
        for (PostingNode node : postingList.getNodes()) {
            docIds.add(node.getDocId());
        }
        return docIds;
    }

    @Override
    public List<String> getTerms() {
        return Collections.singletonList(term);
    }

    @Override
    public String toRepresentation() {
        return "TERM(" + term + ")";
    }
}
