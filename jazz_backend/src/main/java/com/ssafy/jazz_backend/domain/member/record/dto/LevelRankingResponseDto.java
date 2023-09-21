package com.ssafy.jazz_backend.domain.member.record.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class LevelRankingResponseDto {

    private String nickname;
    private String rank;
    private Integer level;
    private Integer winRate;
    private Integer quizRecord; // 마라톤 기록

}
