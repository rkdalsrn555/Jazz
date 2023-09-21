package com.ssafy.jazz_backend.domain.member.record.service;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.record.dto.LevelRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.LevelRankingResponseDto;
import com.ssafy.jazz_backend.domain.member.record.entity.Maraton;
import com.ssafy.jazz_backend.domain.member.record.entity.MaratonId;
import com.ssafy.jazz_backend.domain.member.record.entity.Season;
import com.ssafy.jazz_backend.domain.member.record.entity.Tier;
import com.ssafy.jazz_backend.domain.member.record.entity.TierId;
import com.ssafy.jazz_backend.domain.member.record.repository.MaratonJpaRepository;
import com.ssafy.jazz_backend.domain.member.record.repository.SeasonJpaRepository;
import com.ssafy.jazz_backend.domain.member.record.repository.TierJpaRepository;
import com.ssafy.jazz_backend.domain.member.record.repository.redisRepository.LevelRankRedisRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.global.Util;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;


@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService {

    //JPA repository
    private final Util util;
    private final ProfileRepository profileRepository;
    private final SeasonJpaRepository seasonJpaRepository;
    private final MaratonJpaRepository maratonJpaRepository;
    private final TierJpaRepository tierJpaRepository;
    private final MemberRepository memberRepository;
    //Redis repository
    private final LevelRankRedisRepository levelRankRedisRepository;

    //Sorted Set 을 위한 DI
    //키 : String , Value : String, 스코어는 Double로 고정임
    private final ZSetOperations<String, String> zSetOperations;

    @Override
    public List<LevelRankingResponseDto> getLevelRankingTopTen(String accessToken) {
        //top 10을 LevelRankRedisDto 리스트로 만듦
        List<LevelRankRedisDto> levelRankRedisDtoList = getTopTenLevelRanks();
        Season nowSeason = getCurrentSeason();
        List<LevelRankingResponseDto> responseDtoList = new ArrayList<>();

        for (LevelRankRedisDto levelRankRedisDto : levelRankRedisDtoList) {
            String memberId = levelRankRedisDto.getMemberId();
            Member member = findMemberById(memberId);
            Profile profile = findProfileById(memberId);
            Maraton maraton = findMaratonByMemberAndSeason(member, nowSeason);
            Tier tier = findTierByMemberAndSeason(member, nowSeason);
            LevelRankingResponseDto responseDto = buildResponseDto(profile, tier, maraton);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

    //redis에서 score기준으로 top 10 뽑아옴
    private List<LevelRankRedisDto> getTopTenLevelRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            "level-ranking", 0, 9);
        return topTenMemberIds.stream()
            .map(LevelRankRedisDto::convertToLevelRankRedisDto)
            .collect(Collectors.toList());
    }

    //현재 시즌 가져오기
    private Season getCurrentSeason() {
        return seasonJpaRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("Season 테이블에 값이 존재하지 않습니다."));
    }

    private Member findMemberById(String memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 uuid가 DB에 존재하지 않습니다. " + memberId));
    }

    private Profile findProfileById(String memberId) {
        return profileRepository.findById(memberId)
            .orElseThrow(
                () -> new IllegalArgumentException("해당 uuid에 맞는 profile이 없습니다." + memberId));
    }

    private Maraton findMaratonByMemberAndSeason(Member member, Season season) {
        return maratonJpaRepository.findById(new MaratonId(member, season.getMaratonSeason()))
            .orElseThrow(() -> new IllegalArgumentException("uuid와 season에 해당하는 마라톤 기록이 없습니다."));
    }

    private Tier findTierByMemberAndSeason(Member member, Season season) {
        return tierJpaRepository.findById(new TierId(member, season.getTierSeason()))
            .orElseThrow(() -> new IllegalArgumentException("uuid와 season에 해당하는 티어 기록이 없습니다."));
    }

    private LevelRankingResponseDto buildResponseDto(Profile profile, Tier tier, Maraton maraton) {
        int level = util.makeLevel(profile.getExpPoint());
        String rank = util.makeRank(tier.getRankPoint());
        int winRate = util.makeWinRate(tier.getWin(), tier.getDraw(), tier.getLose());
        int quizRecord = maraton.getQuizRecord();
        return new LevelRankingResponseDto(profile.getNickname(), rank, level, winRate, quizRecord);
    }

}
