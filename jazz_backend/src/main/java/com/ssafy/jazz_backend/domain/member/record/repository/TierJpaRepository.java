package com.ssafy.jazz_backend.domain.member.record.repository;

import com.ssafy.jazz_backend.domain.member.record.entity.Tier;
import com.ssafy.jazz_backend.domain.member.record.entity.TierId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TierJpaRepository extends JpaRepository<Tier, TierId> {


}
