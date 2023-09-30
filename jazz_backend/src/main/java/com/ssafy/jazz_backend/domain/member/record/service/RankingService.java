package com.ssafy.jazz_backend.domain.member.record.service;

import com.ssafy.jazz_backend.domain.member.record.dto.responseDto.RankingTopTenResponseDto;
import java.util.List;


public interface RankingService {

    List<RankingTopTenResponseDto> getLevelRankingTopTen(String accessToken);

    List<RankingTopTenResponseDto> getTierRankingTopTen(String accessToken);

    List<RankingTopTenResponseDto> getDailyMarathonRankingTopTen(String accessToken);

    List<RankingTopTenResponseDto> getMonthlyMarathonRankingTopTen(String accessToken);
}
