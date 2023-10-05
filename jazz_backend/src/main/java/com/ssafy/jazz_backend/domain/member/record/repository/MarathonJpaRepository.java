package com.ssafy.jazz_backend.domain.member.record.repository;

import com.ssafy.jazz_backend.domain.member.record.entity.Marathon;
import com.ssafy.jazz_backend.domain.member.record.entity.MarathonId;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MarathonJpaRepository extends JpaRepository<Marathon, MarathonId> {

    // 같은 monthly_season 중에서 가장 큰 quiz_record를 갖고 있는 Marathon을 조회합니다.
    @Query("SELECT m FROM Marathon m WHERE m.id.monthlySeason = :monthlySeason " +
        "AND m.quizRecord = (SELECT MAX(m2.quizRecord) FROM Marathon m2 " +
        "WHERE m2.id.monthlySeason = :monthlySeason AND m2.id.member.id =:memberId)")
    List<Marathon> findMarathonWithMaxQuizRecordByMonthlySeason(
        @Param("monthlySeason") Integer monthlySeason,@Param("memberId") String memberId);


}
