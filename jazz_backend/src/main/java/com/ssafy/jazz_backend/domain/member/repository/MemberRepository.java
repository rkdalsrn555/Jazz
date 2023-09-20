package com.ssafy.jazz_backend.domain.member.repository;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    Optional<Member> findByUserId(String userId);
}
