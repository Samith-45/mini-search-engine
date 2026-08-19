package com.searchforge.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.searchforge.dto.DocumentRequestDTO;
import com.searchforge.model.DocumentEntity;
import com.searchforge.repository.DocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class SeedDataService implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(SeedDataService.class);

    private final DocumentRepository documentRepository;
    private final DocumentService documentService;
    private final ObjectMapper objectMapper;

    public SeedDataService(DocumentRepository documentRepository, DocumentService documentService, ObjectMapper objectMapper) {
        this.documentRepository = documentRepository;
        this.documentService = documentService;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            ClassPathResource resource = new ClassPathResource("seed/documents.json");
            if (resource.exists()) {
                InputStream inputStream = resource.getInputStream();
                List<DocumentRequestDTO> seedDocs = objectMapper.readValue(inputStream, new TypeReference<List<DocumentRequestDTO>>() {});
                int added = 0;
                for (DocumentRequestDTO dto : seedDocs) {
                    if (!documentRepository.existsByTitle(dto.getTitle())) {
                        documentService.createDocument(dto);
                        added++;
                    }
                }
                if (added > 0) {
                    log.info("Seeded and indexed {} new documents into SearchForge!", added);
                }
            }
        } catch (Exception e) {
            log.error("Failed to seed initial document dataset: {}", e.getMessage(), e);
        }

        // Re-index all database documents into memory on startup
        List<DocumentEntity> existingDocs = documentService.getAllDocuments();
        for (DocumentEntity doc : existingDocs) {
            String text = doc.getTitle() + " " + doc.getContent() + " " + (doc.getTags() != null ? doc.getTags() : "");
            var raw = new com.searchforge.core.tokenizer.SimpleTokenizer().tokenize(text);
            var norm = new com.searchforge.core.normalizer.DefaultTextNormalizer().normalizeTokens(raw);
            documentService.indexDocumentInMemory(doc.getId(), norm, doc.getTitle(), doc.getTags());
        }
        log.info("SearchForge in-memory index loaded with {} total documents!", existingDocs.size());
    }
}
