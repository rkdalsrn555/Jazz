package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CaseObjectiveQuizResponseDto {
    Long quizId;
    String question;
    List<String> content;
    int caseNum;
    boolean isMulti;
    int kind;
}
