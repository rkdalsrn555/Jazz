package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagementId;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuizManagementRepository extends JpaRepository<QuizManagement, QuizManagementId> {

    @Query("SELECT qm FROM QuizManagement qm WHERE qm.id.member.id = :memberId AND qm.id.quiz.id = :quizId")
    QuizManagement findByMemberIdAndQuizId(@Param("memberId") String memberId,
        @Param("quizId") int quizId);

    Optional<QuizManagement> findByIdMemberAndIdQuiz(Member member, Quiz quiz);

    List<QuizManagement> findAllByIdMember(Member member);

    List<QuizManagement> findAllByIdMemberAndIsBookmark(Member member, Boolean isBookmark);

}
