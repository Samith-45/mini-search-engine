package com.searchforge.repository;

import com.searchforge.model.SearchQueryLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchQueryLogRepository extends JpaRepository<SearchQueryLog, Long> {

    @Query("SELECT q.queryText, COUNT(q) as cnt FROM SearchQueryLog q GROUP BY q.queryText ORDER BY cnt DESC")
    List<Object[]> findPopularQueries(Pageable pageable);

    @Query("SELECT COUNT(q) FROM SearchQueryLog q WHERE q.totalResults = 0")
    long countZeroResultQueries();

    @Query("SELECT AVG(q.executionTimeMs) FROM SearchQueryLog q")
    Double findAverageLatency();

    @Query("SELECT COUNT(q) FROM SearchQueryLog q WHERE q.cacheHit = true")
    long countCacheHits();
}
