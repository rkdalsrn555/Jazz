package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Integer> {

}
