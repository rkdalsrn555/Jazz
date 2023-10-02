package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.FinancialGraph;
import com.ssafy.jazz_backend.domain.enterprise.entity.FinancialGraphId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FinancialGraphJpaRepository extends
    JpaRepository<FinancialGraph, FinancialGraphId> {

    //기업 id를 기준으로 전부 다 가져옴
    @Query("SELECT f FROM FinancialGraph f WHERE f.id.enterpriseId = :enterpriseId")
    List<FinancialGraph> findByEnterpriseId(@Param("enterpriseId") Integer enterpriseId);

}
