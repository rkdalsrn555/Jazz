package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.MarathonAndTierQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultResponseDto;

import java.util.List;

public interface MarathonService {

    MarathonAndTierQuizResponseDto getMarathonQuiz(String accessToken);
<<<<<<< HEAD

    MarathonResultResponseDto applyMarathonQuizResult(String accessToken,
        MarathonResultRequestDto requestDto);
=======
    MarathonResultResponseDto applyMarathonQuizResult(String accessToken, List<MarathonResultRequestDto> requestDtoList);
>>>>>>> 4b68e214ffcaa74a88d99dde5f12cef635327f48
}
