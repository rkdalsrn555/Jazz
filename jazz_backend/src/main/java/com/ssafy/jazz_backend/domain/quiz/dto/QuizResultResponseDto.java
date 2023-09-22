
package com.ssafy.jazz_backend.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultResponseDto {

    private Integer diamond;
    private Integer expPoint;

    // 팩토리 패턴 적용
    public static QuizResultResponseDto create(Integer diamond, Integer expPoint) {
        return new QuizResultResponseDto(diamond, expPoint);
    }

}
