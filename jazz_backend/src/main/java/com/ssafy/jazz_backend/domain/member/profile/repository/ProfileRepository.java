package com.ssafy.jazz_backend.domain.member.profile.repository;

import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {
    // 식별 관계라도 ID의 타입은 해당 부모 테이블 ID 타입을 따라감
    Optional<Profile> findByNickname(String nickname);
}
