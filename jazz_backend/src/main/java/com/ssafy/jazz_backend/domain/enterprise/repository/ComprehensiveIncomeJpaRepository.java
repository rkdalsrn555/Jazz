package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.ComprehensiveIncome;
import com.ssafy.jazz_backend.domain.enterprise.entity.ComprehensiveIncomeId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ComprehensiveIncomeJpaRepository extends
    JpaRepository<ComprehensiveIncome, ComprehensiveIncomeId> {

    @Query("Select f from ComprehensiveIncome f where f.id.enterpriseId = :enterpriseId")
    List<ComprehensiveIncome> findByEnterpriseId(@Param("enterpriseId") Integer enterpriseId);
}
