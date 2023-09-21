package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.AddToQuizManagementResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManangementId;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddToQuizManagementServiceImpl implements AddToQuizManagementService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public AddToQuizManagementResponseDto addToQuizManagement(String userUUID, int quizId) {
        Member member = memberRepository.findById(userUUID).orElse(null);
        Quiz quiz = quizRepository.findById(quizId).orElse(null);

        if (member == null || quiz == null) {
            // 예외처리
            throw new RuntimeException("Member or Quiz not found!");
        }

        Optional<QuizManagement> existingQuizManagement = quizManagementRepository.findByIdMemberAndIdQuiz(
            member, quiz);
        if (existingQuizManagement.isPresent()) {
            // 예외처리
            throw new RuntimeException(
                "이미 등록된 퀴즈입니다");
        }

        QuizManangementId quizManangementId = new QuizManangementId();
        quizManangementId.setMember(member);
        quizManangementId.setQuiz(quiz);

        QuizManagement quizManagement = QuizManagement.builder()
            .id(quizManangementId)
            .build();

        quizManagementRepository.save(quizManagement);

        return AddToQuizManagementResponseDto.builder()
            .quizID(quizId)
            .build();
    }
}
