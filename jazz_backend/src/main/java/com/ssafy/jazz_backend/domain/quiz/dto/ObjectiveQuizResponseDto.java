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
public class ObjectiveQuizResponseDto {

    int quizId;
    String question;
    List<String> content;
    int caseNum;
    boolean isMulti;
    boolean isBookmark;
    int financialType;
    int kind;
    int hint;
}
