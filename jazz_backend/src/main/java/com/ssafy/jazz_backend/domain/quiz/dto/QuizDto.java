package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizDto {
    private Long quizId;
    private String question;
    private List<String> content;
    private int caseNum;
    private boolean isMulti;
    private int kind;
}
