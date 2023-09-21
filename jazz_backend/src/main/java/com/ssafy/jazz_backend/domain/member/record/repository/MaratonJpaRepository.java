package com.ssafy.jazz_backend.domain.member.record.repository;

import com.ssafy.jazz_backend.domain.member.record.entity.Maraton;
import com.ssafy.jazz_backend.domain.member.record.entity.MaratonId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaratonJpaRepository extends JpaRepository<Maraton, MaratonId> {

}
