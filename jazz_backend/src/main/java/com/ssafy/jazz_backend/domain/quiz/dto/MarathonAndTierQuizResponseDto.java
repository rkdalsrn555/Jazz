package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MarathonAndTierQuizResponseDto {


    private Integer quizId;
    private String question;
    private List<String> content;
    private Integer caseNum;
    private Boolean isMulti;
    private Integer kind;

    //팩토리 패턴
    public static MarathonAndTierQuizResponseDto create(Integer quizId, String question, List<String> content, Integer caseNum, Boolean isMulti, Integer kind){
        return new MarathonAndTierQuizResponseDto(quizId, question, content, caseNum, isMulti, kind);
    }
}
