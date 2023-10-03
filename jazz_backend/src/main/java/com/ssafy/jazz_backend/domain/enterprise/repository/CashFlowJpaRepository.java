package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.CashFlow;
import com.ssafy.jazz_backend.domain.enterprise.entity.CashFlowId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CashFlowJpaRepository extends JpaRepository<CashFlow, CashFlowId> {

    @Query("Select f from CashFlow f where f.id.enterpriseId = :enterpriseId")
    List<CashFlow> findByEnterpriseId(@Param("enterpriseId") Integer enterpriseId);

}
