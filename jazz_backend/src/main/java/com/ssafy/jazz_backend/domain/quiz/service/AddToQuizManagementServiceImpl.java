package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.AddToQuizManagementResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagementId;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddToQuizManagementServiceImpl implements AddToQuizManagementService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Override
    @Transactional
    public AddToQuizManagementResponseDto addToQuizManagement(String userUUID, int quizId) {
        Member member = memberRepository.findById(userUUID).orElse(null);
        Quiz quiz = quizRepository.findById(quizId).orElse(null);

        if (member == null || quiz == null) {
            // 예외처리
            throw new RuntimeException("Member or Quiz not found!");
        }

        Optional<QuizManagement> existingQuizManagement = quizManagementRepository.findByIdMemberAndIdQuiz(
            member, quiz);

        if (!existingQuizManagement.isPresent()) {
            QuizManagementId quizManagementId = new QuizManagementId();
            quizManagementId.setMember(member);
            quizManagementId.setQuiz(quiz);

            QuizManagement quizManagement = QuizManagement.builder()
                .id(quizManagementId)
                .build();

            quizManagementRepository.save(quizManagement);
        }

        return AddToQuizManagementResponseDto.builder()
            .quizID(quizId)
            .build();
    }
}
