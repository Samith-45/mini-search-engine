package com.searchforge.repository;

import com.searchforge.model.ExperimentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperimentRecordRepository extends JpaRepository<ExperimentRecord, Long> {
    List<ExperimentRecord> findAllByOrderByTimestampDesc();
}
