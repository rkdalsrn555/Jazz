package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectiveQuizDto {
    private Long quizId;
    private String question;
    private String content;
    private boolean isMulti;
    private int kind;
}
