package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationCorrectAnswerRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationCorrectAnswerResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationWrongAnswerRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationWrongAnswerResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Explanation;
import com.ssafy.jazz_backend.domain.quiz.repository.ChoiceRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.ExplanationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExplanationServiceImpl implements ExplanationService {

    @Autowired
    private ChoiceRepository choiceRepository;

    @Autowired
    private ExplanationRepository explanationRepository;

    @Override
    public ExplanationCorrectAnswerResponseDto getCorrectExplanation(String userUUID,
        ExplanationCorrectAnswerRequestDto request) {
        // Quiz ID로 정답 Choice 찾기
        Choice correctChoice = choiceRepository.findByQuizIdAndIdCaseNum(request.getQuizId(), 1);

        if (correctChoice == null) {
            throw new IllegalArgumentException("Invalid quiz ID provided.");
        }

        // 정답의 Explanation 찾기
        Explanation explanation = explanationRepository.findByWord(correctChoice.getContent());

        if (explanation == null) {
            throw new IllegalArgumentException("Explanation not found for the provided word.");
        }

        // 응답 구성
        return ExplanationCorrectAnswerResponseDto.builder()
            .quizId(request.getQuizId())
            .correctContent(correctChoice.getContent())
            .correctExplanation(explanation.getDescription())
            .build();
    }

    @Override
    public ExplanationWrongAnswerResponseDto getWrongExplanation(String userUUID,
        ExplanationWrongAnswerRequestDto request) {
        // Quiz ID로 정답 Choice 찾기
        Choice correctChoice = choiceRepository.findByQuizIdAndIdCaseNum(request.getQuizId(), 1);

        if (correctChoice == null) {
            throw new IllegalArgumentException("Invalid quiz ID provided.");
        }

        // 정답의 Explanation 찾기
        Explanation correctExplanation = explanationRepository.findByWord(
            correctChoice.getContent());

        // 사용자가 선택한 오답의 Explanation 찾기
        Explanation wrongExplanation = explanationRepository.findByWord(request.getWrongContent());

        if (correctExplanation == null || wrongExplanation == null) {
            throw new IllegalArgumentException("Explanation not found for the provided word.");
        }

        // 응답 구성
        return ExplanationWrongAnswerResponseDto.builder()
            .quizId(request.getQuizId())
            .correctContent(correctChoice.getContent())
            .correctExplanation(correctExplanation.getDescription())
            .wrongContent(request.getWrongContent())
            .wrongExplanation(wrongExplanation.getDescription())
            .build();
    }
}
