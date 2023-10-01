package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.IncomeStatement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeStatementRepository extends JpaRepository<IncomeStatement, Integer> {

}
