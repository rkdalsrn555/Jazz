package com.ssafy.jazz_backend.domain.enterprise.repository;


import com.ssafy.jazz_backend.domain.enterprise.entity.IncomeStatement;
import com.ssafy.jazz_backend.domain.enterprise.entity.IncomeStatementId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IncomeStatementJpaRepository extends
    JpaRepository<IncomeStatement, IncomeStatementId> {

    @Query("Select f from IncomeStatement f where f.id.enterpriseId = :enterpriseId")
    List<IncomeStatement> findByEnterpriseId(Integer enterpriseId);

}
