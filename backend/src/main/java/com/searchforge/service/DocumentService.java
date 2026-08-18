package com.searchforge.service;

import com.searchforge.core.autocomplete.TrieAutocomplete;
import com.searchforge.core.index.InvertedIndex;
import com.searchforge.core.normalizer.DefaultTextNormalizer;
import com.searchforge.core.normalizer.TextNormalizer;
import com.searchforge.core.tokenizer.SimpleTokenizer;
import com.searchforge.core.tokenizer.Tokenizer;
import com.searchforge.dto.DocumentRequestDTO;
import com.searchforge.model.DocumentEntity;
import com.searchforge.repository.DocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class DocumentService {

    private static final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final DocumentRepository documentRepository;
    private final InvertedIndex invertedIndex = new InvertedIndex();
    private final TrieAutocomplete trieAutocomplete = new TrieAutocomplete();
    private final Tokenizer tokenizer = new SimpleTokenizer();
    private final TextNormalizer normalizer = new DefaultTextNormalizer();

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Transactional
    public DocumentEntity createDocument(DocumentRequestDTO request) {
        DocumentEntity doc = new DocumentEntity(
                request.getTitle(),
                request.getContent(),
                request.getUrl(),
                request.getCategory(),
                request.getTags(),
                request.getAuthor()
        );

        String fullText = doc.getTitle() + " " + doc.getContent() + " " + (doc.getTags() != null ? doc.getTags() : "");
        List<String> rawTokens = tokenizer.tokenize(fullText);
        List<String> normTokens = normalizer.normalizeTokens(rawTokens);

        doc.setDocLength(normTokens.size());
        DocumentEntity saved = documentRepository.save(doc);

        // Index in memory
        indexDocumentInMemory(saved.getId(), normTokens, doc.getTitle(), doc.getTags());
        return saved;
    }

    public void indexDocumentInMemory(Long docId, List<String> normTokens, String title, String tags) {
        invertedIndex.addDocument(docId, normTokens);

        // Index title & terms into Trie for Autocomplete
        if (title != null) {
            trieAutocomplete.insert(title, 5);
            for (String word : tokenizer.tokenize(title)) {
                trieAutocomplete.insert(word, 2);
            }
        }
        if (tags != null) {
            for (String tag : tags.split("[,;\\s]+")) {
                trieAutocomplete.insert(tag, 3);
            }
        }
    }

    public Optional<DocumentEntity> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    public List<DocumentEntity> getAllDocuments() {
        return documentRepository.findAll();
    }

    @Transactional
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
        invertedIndex.removeDocument(id);
    }

    public InvertedIndex getInvertedIndex() {
        return invertedIndex;
    }

    public TrieAutocomplete getTrieAutocomplete() {
        return trieAutocomplete;
    }
}
