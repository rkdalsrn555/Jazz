package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizCorrectionServiceImpl implements QuizCorrectionService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public void updateIsCorrect(String userUUID, int quizId, Boolean isCorrect) {
        Member member = memberRepository.findById(userUUID).orElse(null);
        Quiz quiz = quizRepository.findById(quizId).orElse(null);

        if (member == null || quiz == null) {
            throw new RuntimeException("Member or Quiz not found!");
        }

        Optional<QuizManagement> optionalQuizManagement = quizManagementRepository.findByIdMemberAndIdQuiz(
            member, quiz);
        if (optionalQuizManagement.isPresent()) {
            QuizManagement quizManagement = optionalQuizManagement.get();
            quizManagement.setIsCorrect(isCorrect);
            quizManagementRepository.save(quizManagement);
        } else {
            throw new RuntimeException("No QuizManagement found for given userUUID and quizId");
        }
    }
}
