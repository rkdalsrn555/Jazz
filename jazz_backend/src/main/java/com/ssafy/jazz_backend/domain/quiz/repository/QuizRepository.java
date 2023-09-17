package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = "SELECT q FROM Quiz q WHERE q.kind = ?1 ORDER BY FUNCTION('RAND') LIMIT 10")
    List<Quiz> findRandomQuizzesByKind(int kind);


}
