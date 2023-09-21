package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.AddToQuizManagementResponseDto;

public interface AddToQuizManagementService {

    AddToQuizManagementResponseDto addToQuizManagement(String userUUID, int quizId);
}
