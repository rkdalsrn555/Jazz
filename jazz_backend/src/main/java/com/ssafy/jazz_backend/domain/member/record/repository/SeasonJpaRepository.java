package com.ssafy.jazz_backend.domain.member.record.repository;

import com.ssafy.jazz_backend.domain.member.record.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonJpaRepository extends JpaRepository<Season, Long> {

}
