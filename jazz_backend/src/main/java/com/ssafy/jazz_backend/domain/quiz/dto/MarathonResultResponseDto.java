package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MarathonResultResponseDto {
    private Integer solveCount;
    private Integer diamondCount;

    public static MarathonResultResponseDto create(Integer solveCount, Integer diamondCount){

        return new MarathonResultResponseDto(solveCount, diamondCount);
    }
}
