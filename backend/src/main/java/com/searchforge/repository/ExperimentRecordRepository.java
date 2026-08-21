package com.searchforge.repository;

import com.searchforge.model.ExperimentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExperimentRecordRepository extends JpaRepository<ExperimentRecord, Long> {
    List<ExperimentRecord> findAllByOrderByTimestampDesc();
    Optional<ExperimentRecord> findFirstByOrderByTimestampDesc();
}
