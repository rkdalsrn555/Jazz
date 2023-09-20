package com.ssafy.jazz_backend.domain.member.record.service;

import com.ssafy.jazz_backend.domain.member.record.dto.LevelRankingResponseDto;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface RankingService {

    public List<LevelRankingResponseDto> getLevelRankingTopTen(String accessTocken);
}
