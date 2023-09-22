package com.ssafy.jazz_backend.domain.member.record.service;

import com.ssafy.jazz_backend.domain.member.record.dto.responseDto.RankingTopTenResponseDto;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface RankingService {

    List<RankingTopTenResponseDto> getLevelRankingTopTen(String accessTocken);

    List<RankingTopTenResponseDto> getTierRankingTopTen(String accessTocken);

    List<RankingTopTenResponseDto> getMarathonRankingTopTen(String accessTocken);
}
