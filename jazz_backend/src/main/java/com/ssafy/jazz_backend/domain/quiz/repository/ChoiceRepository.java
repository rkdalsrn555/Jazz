package com.ssafy.jazz_backend.domain.quiz.repository;

import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Integer> {

    Choice findByQuizAndIdCaseNum(Quiz quiz, int caseNum);

    List<Choice> findAllByQuiz(Quiz quiz);

}
