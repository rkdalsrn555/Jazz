package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultResponseDto;

public interface QuizResultService {

    QuizResultResponseDto getQuizResult(String accessToken, QuizResultRequestDto request);

}
