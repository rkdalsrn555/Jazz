package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    @Query(value = "SELECT * FROM quiz q WHERE q.kind = ?1 ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Quiz> findRandomQuizzesByKind(int kind);


}
