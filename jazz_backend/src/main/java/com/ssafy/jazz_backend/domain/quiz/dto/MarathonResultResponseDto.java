package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MarathonResultResponseDto {
    private Integer solveCount;

    public static MarathonResultResponseDto create(Integer solveCount){

        return new MarathonResultResponseDto(solveCount);
    }
}
