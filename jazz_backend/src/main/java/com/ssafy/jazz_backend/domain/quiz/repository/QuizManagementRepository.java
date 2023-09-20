package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManangementId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizManagementRepository extends JpaRepository<QuizManagement, QuizManangementId> {

}
