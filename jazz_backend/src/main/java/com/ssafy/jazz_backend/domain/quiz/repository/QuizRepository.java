package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    @Query(value = "SELECT * FROM quiz q WHERE q.kind = ?1 ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Quiz> findRandomQuizzesByKind(int kind);

    // 스프링에서 전체 id 구간 중에 random id 하나 가져오기 위해 만든 코드
    @Query(value = "SELECT MIN(id) FROM quiz", nativeQuery = true)
    Optional<Integer> getMinId();
    @Query(value = "SELECT MAX(id) FROM quiz", nativeQuery = true)
    Optional<Integer> getMaxId();

}
