package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.MarathonAndTierQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultResponseDto;

import java.util.List;

public interface MarathonService {

    MarathonAndTierQuizResponseDto getMarathonQuiz(String accessToken);

    MarathonResultResponseDto applyMarathonQuizResult(String accessToken,
        MarathonResultRequestDto requestDto);
}
