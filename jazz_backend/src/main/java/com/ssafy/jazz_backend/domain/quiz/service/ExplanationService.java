package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationCorrectAnswerRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationCorrectAnswerResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationWrongAnswerRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationWrongAnswerResponseDto;

public interface ExplanationService {

    ExplanationCorrectAnswerResponseDto getCorrectExplanation(String userUUID,
        ExplanationCorrectAnswerRequestDto request);

    ExplanationWrongAnswerResponseDto getWrongExplanation(String userUUID,
        ExplanationWrongAnswerRequestDto request);

}
