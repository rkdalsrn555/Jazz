package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.QuizStatsResponseDto;

public interface QuizStatsService {

    QuizStatsResponseDto quizStats(String userUUID);
}
