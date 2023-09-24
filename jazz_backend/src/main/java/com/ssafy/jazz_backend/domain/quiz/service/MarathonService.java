package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.MarathonQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultResponseDto;

import java.util.List;

public interface MarathonService {

    MarathonQuizResponseDto getMarathonQuiz(String accessToken);
    MarathonResultResponseDto applyMarathonQuizResult(String accessToken, List<MarathonResultRequestDto> requestDtoList);
}
