package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.InsertChoiceRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.InsertExplanationRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.InsertQuizRequestDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.ChoiceId;
import com.ssafy.jazz_backend.domain.quiz.entity.Explanation;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertServiceImpl {

    @Autowired
    private InsertQuizService insertQuizService;

    @Autowired
    private InsertChoiceService insertChoiceService;

    @Autowired
    private InsertExplanationService insertExplanationService;

    public Quiz insertQuiz(InsertQuizRequestDto requestDto) {
        Quiz quiz = Quiz.builder()
            .financialType(requestDto.getFinancialType())
            .question(requestDto.getQuestion())
            .kind(requestDto.getKind())
            .build();
        return insertQuizService.save(quiz);
    }

    public Choice insertChoice(InsertChoiceRequestDto requestDto) {
        ChoiceId id = new ChoiceId();
        id.setCaseNum(requestDto.getCaseNum());
        id.setQuizId(requestDto.getQuizId());

        Choice choice = Choice.builder()
            .id(id)
            .content(requestDto.getContent())
            .isMulti(requestDto.getIsMulti())
            .build();
        return insertChoiceService.save(choice);
    }

    public Explanation insertExplanation(InsertExplanationRequestDto requestDto) {
        Explanation explanation = Explanation.builder()
            .word(requestDto.getWord())
            .description(requestDto.getDescription())
            .build();
        return insertExplanationService.save(explanation);
    }
}
