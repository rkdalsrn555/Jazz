package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.A;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizStatsResponseDto {

    Double correctRate;
    int quizCount;
    int correctCount;
}
