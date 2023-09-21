package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManangementId;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuizManagementRepository extends JpaRepository<QuizManagement, QuizManangementId> {

    @Query("SELECT qm FROM QuizManagement qm WHERE qm.id.member.id = :memberId AND qm.id.quiz.id = :quizId")
    QuizManagement findByMemberIdAndQuizId(@Param("memberId") String memberId,
        @Param("quizId") int quizId);

    Optional<QuizManagement> findByIdMemberAndIdQuiz(Member member, Quiz quiz);

}
