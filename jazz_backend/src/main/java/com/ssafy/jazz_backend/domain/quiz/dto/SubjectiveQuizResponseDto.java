package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class SubjectiveQuizResponseDto {
    Long quizId;
    String question;
    String content;
    boolean isMulti;
    int kind;
}
