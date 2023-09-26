package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.ChoiceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsertChoiceService extends JpaRepository<Choice, ChoiceId> {

}
