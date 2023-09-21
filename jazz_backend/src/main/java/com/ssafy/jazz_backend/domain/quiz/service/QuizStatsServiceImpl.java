package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.QuizStatsResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizStatsServiceImpl implements QuizStatsService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public QuizStatsResponseDto quizStats(String userUUID) {
        Member member = memberRepository.findById(userUUID).orElse(null);

        if (member == null) {
            throw new RuntimeException("Member not found!");
        }

        List<QuizManagement> allQuizzesForMember = quizManagementRepository.findAllByIdMember(
            member);

        int quizCount = allQuizzesForMember.size();
        int correctCount = (int) allQuizzesForMember.stream().filter(QuizManagement::getIsCorrect)
            .count();

        double correctRate = (double) correctCount / quizCount * 100;
        correctRate = Math.round(correctRate * 100.0) / 100.0; // 소수점 둘째자리까지 반올림

        return QuizStatsResponseDto.builder()
            .correctRate(correctRate)
            .quizCount(quizCount)
            .correctCount(correctCount)
            .build();
    }
}
