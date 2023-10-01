package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.FinancialPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinancialPositionRepository extends JpaRepository<FinancialPosition, Integer> {

}
