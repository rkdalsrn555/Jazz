package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.QuizDto;
import com.ssafy.jazz_backend.domain.quiz.dto.SubjectiveQuizDto;
import com.ssafy.jazz_backend.domain.quiz.dto.CaseObjectiveQuizDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public List<QuizDto> getRandomObjectiveQuizzes() {
        List<Quiz> quizzes = quizRepository.findRandomQuizzesByKind(1);
        return quizzes.stream()
                .map(q -> new QuizDto(q.getId(), q.getQuestion(), q.getContent(), q.getCaseNum(), q.isMulti(), q.getKind()))
                .collect(Collectors.toList());
    }

    public List<SubjectiveQuizDto> getRandomSubjectiveQuizzes() {
        List<Quiz> quizzes = quizRepository.findRandomQuizzesByKind(2);
        return quizzes.stream()
                .map(q -> new SubjectiveQuizDto(q.getId(), q.getQuestion(), q.getContent().get(0), q.isMulti(), q.getKind()))
                .collect(Collectors.toList());
    }

    public List<CaseObjectiveQuizDto> getRandomCaseObjectiveQuizzes() {
        List<Quiz> quizzes = quizRepository.findRandomQuizzesByKind(3);
        return quizzes.stream()
                .map(q -> new CaseObjectiveQuizDto(q.getId(), q.getQuestion(), q.getContent(), q.getCaseNum(), q.isMulti(), q.getKind()))
                .collect(Collectors.toList());
    }

    public List<?> getQuizByKind(int kind) {
        return switch (kind) {
            case 1 -> getRandomObjectiveQuizzes();
            case 2 -> getRandomSubjectiveQuizzes();
            case 3 -> getRandomCaseObjectiveQuizzes();
            default -> throw new IllegalArgumentException("Invalid kind value");
        };
    }

}
