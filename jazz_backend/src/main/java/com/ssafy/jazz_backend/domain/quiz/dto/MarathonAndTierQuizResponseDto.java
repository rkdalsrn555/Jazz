package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MarathonQuizResponseDto {


    private Integer quizId;
    private String question;
    private List<String> content;
    private Integer caseNum;
    private Boolean isMulti;
    private Integer kind;

    //팩토리 패턴
    public static MarathonQuizResponseDto create(Integer quizId, String question, List<String> content, Integer caseNum, Boolean isMulti, Integer kind){
        return new MarathonQuizResponseDto(quizId, question, content, caseNum, isMulti, kind);
    }
}
