package com.ssafy.jazz_backend.domain.member.record.repository;

import com.ssafy.jazz_backend.domain.member.record.entity.Marathon;
import com.ssafy.jazz_backend.domain.member.record.entity.MarathonId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarathonJpaRepository extends JpaRepository<Marathon, MarathonId> {

}
