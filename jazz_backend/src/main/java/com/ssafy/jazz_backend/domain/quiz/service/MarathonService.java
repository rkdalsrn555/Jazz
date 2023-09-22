package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResponseDto;

public interface MarathonService {

    MarathonResponseDto getMarathonQuiz(String accessToken);
}
