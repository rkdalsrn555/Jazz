package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExplanationWrongAnswerResponseDto {

    int quizId;
    String correctContent;
    String correctExplanation;
    String wrongContent;
    String wrongExplanation;
}
