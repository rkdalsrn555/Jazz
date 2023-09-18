package com.ssafy.jazz_backend.domain.quiz.service;

import java.util.List;

public interface QuizService {

    List<?> getQuizByKind(int kind);
}
