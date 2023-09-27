package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsertQuizService extends JpaRepository<Quiz, Integer> {

}
