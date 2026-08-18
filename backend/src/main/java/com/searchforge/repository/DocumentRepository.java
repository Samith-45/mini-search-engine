package com.searchforge.repository;

import com.searchforge.model.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity, Long> {
    List<DocumentEntity> findByCategoryIgnoreCase(String category);

    @Query("SELECT DISTINCT d.category FROM DocumentEntity d WHERE d.category IS NOT NULL")
    List<String> findDistinctCategories();
}
