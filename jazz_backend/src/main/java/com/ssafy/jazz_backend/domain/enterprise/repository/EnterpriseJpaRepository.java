package com.ssafy.jazz_backend.domain.enterprise.repository;

import com.ssafy.jazz_backend.domain.enterprise.entity.Enterprise;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnterpriseJpaRepository extends JpaRepository<Enterprise, Integer> {

    List<Enterprise> findByNameContains(String name);

    Optional<Enterprise> findByName(String name);

}
