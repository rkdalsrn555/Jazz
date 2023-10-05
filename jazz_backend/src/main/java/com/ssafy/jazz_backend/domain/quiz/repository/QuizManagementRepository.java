package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagementId;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuizManagementRepository extends JpaRepository<QuizManagement, QuizManagementId> {

    @Query("SELECT qm FROM QuizManagement qm WHERE qm.id.member.id = :memberId AND qm.id.quiz.id = :quizId")
    QuizManagement findByMemberIdAndQuizId(@Param("memberId") String memberId,
        @Param("quizId") int quizId);

    Optional<QuizManagement> findByIdMemberAndIdQuiz(Member member, Quiz quiz);

    List<QuizManagement> findAllByIdMember(Member member);

    List<QuizManagement> findAllByIdMemberAndIsBookmark(Member member, Boolean isBookmark);

    @Query(value = "SELECT COUNT(*) FROM quiz_management WHERE member_id = :member_id AND is_correct = :is_correct", nativeQuery = true)
    Optional<Integer> findCorrectQuestionById(@Param("member_id") String memberId, @Param("is_correct") boolean isCorrect);

    @Query(value = "SELECT COUNT(*) FROM quiz_management WHERE member_id = :member_id AND is_bookmark = :is_bookmark", nativeQuery = true)
    Optional<Integer> countAllByMemberIdAndIsBookmark(@Param("member_id") String memberId, @Param("is_bookmark") boolean isBookmark);
}
