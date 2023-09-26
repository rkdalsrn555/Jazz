package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.entity.Explanation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsertExplanationService extends JpaRepository<Explanation, Integer> {

}
