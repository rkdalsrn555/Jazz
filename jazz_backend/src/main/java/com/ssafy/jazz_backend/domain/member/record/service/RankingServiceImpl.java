package com.ssafy.jazz_backend.domain.member.record.service;

import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.record.dto.LevelRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.LevelRankingResponseDto;
import com.ssafy.jazz_backend.domain.member.record.repository.redisRepository.LevelRankRedisRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;


@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    private final LevelRankRedisRepository levelRankRedisRepository;
    //Sorted Set 을 위한 DI
    //키 : String , Value : String, 스코어는 Double로 고정임
    private final ZSetOperations<String, String> zSetOperations;

    private final ProfileRepository profileRepository;


    @Override

    public List<LevelRankingResponseDto> getLevelRankingTopTen(String accessTocken) {

        //redis에서 score기준으로 top 10 뽑아옴
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            "level-ranking", 0, 9);

        //top 10을 LevelRankRedisDto 리스트로 만듦
        List<LevelRankRedisDto> levelRankRedisDtoList = topTenMemberIds.stream()
            .map(LevelRankRedisDto::convertToLevelRankRedisDto)
            .collect(Collectors.toList());

        List<LevelRankingResponseDto> responseDto = new ArrayList<>();
        for (int i = 0; i < levelRankRedisDtoList.size(); i++) {
            responseDto.add(
                profileRepository.findById(levelRankRedisDtoList.get(i).getMemberId())
                    .getExpPoint());
        }

        return responseDto;

    }
}
