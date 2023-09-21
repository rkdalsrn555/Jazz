package com.ssafy.jazz_backend.domain.quiz.service;

public interface QuizCorrectionService {

    void updateIsCorrect(String userUUID, int quizId, Boolean isCorrect);
}
