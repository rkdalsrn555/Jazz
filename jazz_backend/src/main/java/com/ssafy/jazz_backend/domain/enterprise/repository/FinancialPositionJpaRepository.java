package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.FinancialPosition;
import com.ssafy.jazz_backend.domain.enterprise.entity.FinancialPositionId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FinancialPositionJpaRepository extends
    JpaRepository<FinancialPosition, FinancialPositionId> {

    @Query("Select f from FinancialPosition f where f.id.enterpriseId = :enterpriseId")
    List<FinancialPosition> findByEnterpriseId(Integer enterpriseId);

}
