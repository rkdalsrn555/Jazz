package com.ssafy.jazz_backend.domain.member.record.service;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.LevelRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.MarathonRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.TierRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.responseDto.RankingTopTenResponseDto;
import com.ssafy.jazz_backend.domain.member.record.entity.Marathon;
import com.ssafy.jazz_backend.domain.member.record.entity.MarathonId;
import com.ssafy.jazz_backend.domain.member.record.entity.Season;
import com.ssafy.jazz_backend.domain.member.record.entity.Tier;
import com.ssafy.jazz_backend.domain.member.record.entity.TierId;
import com.ssafy.jazz_backend.domain.member.record.repository.MarathonJpaRepository;
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
    private final MarathonJpaRepository marathonJpaRepository;
    private final TierJpaRepository tierJpaRepository;
    private final MemberRepository memberRepository;
    
    //Sorted Set 을 위한 DI
    //키 : String , Value : String, 스코어는 Double로 고정임
    private final ZSetOperations<String, String> zSetOperations;

    @Override
    public List<RankingTopTenResponseDto> getLevelRankingTopTen(String accessToken) {
        //top 10을 LevelRankRedisDto 리스트로 만듦
        List<LevelRankRedisDto> levelRankRedisDtoList = getTopTenLevelRanks();
        Season nowSeason = getCurrentSeason();
        List<RankingTopTenResponseDto> responseDtoList = new ArrayList<>();

        for (LevelRankRedisDto levelRankRedisDto : levelRankRedisDtoList) {
            String memberId = levelRankRedisDto.getMemberId();
            Member member = findMemberById(memberId);
            Profile profile = findProfileById(memberId);
            Marathon marathon = findMarathonByMemberAndSeason(member, nowSeason);
            Tier tier = findTierByMemberAndSeason(member, nowSeason);
            RankingTopTenResponseDto responseDto = buildResponseDto(profile, tier, marathon);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

    @Override
    public List<RankingTopTenResponseDto> getTierRankingTopTen(String accessTocken) {
        //redis에서 top 10 가져옴
        List<TierRankRedisDto> tierRankRedisDtoList = getTopTenTierRanks();
        Season nowSeason = getCurrentSeason();
        List<RankingTopTenResponseDto> responseDtoList = new ArrayList<>();

        for (TierRankRedisDto tierRankRedisDto : tierRankRedisDtoList) {
            String memberId = tierRankRedisDto.getMemberId();
            Member member = findMemberById(memberId);
            Profile profile = findProfileById(memberId);
            Marathon marathon = findMarathonByMemberAndSeason(member, nowSeason);
            Tier tier = findTierByMemberAndSeason(member, nowSeason);
            RankingTopTenResponseDto responseDto = buildResponseDto(profile, tier, marathon);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

    @Override
    public List<RankingTopTenResponseDto> getMarathonRankingTopTen(String accessTocken) {
        //redis에서 top 10 가져옴
        List<MarathonRankRedisDto> marathonRankRedisDtoList = getTopTenMarathonRanks();
        Season nowSeason = getCurrentSeason();
        List<RankingTopTenResponseDto> responseDtoList = new ArrayList<>();
        for (MarathonRankRedisDto marathonRankRedisDto : marathonRankRedisDtoList) {
            String memberId = marathonRankRedisDto.getMemberId();
            Member member = findMemberById(memberId);
            Profile profile = findProfileById(memberId);
            Marathon marathon = findMarathonByMemberAndSeason(member, nowSeason);
            Tier tier = findTierByMemberAndSeason(member, nowSeason);
            RankingTopTenResponseDto responseDto = buildResponseDto(profile, tier, marathon);

            responseDtoList.add(responseDto);

        }
        return responseDtoList;
    }

    private List<MarathonRankRedisDto> getTopTenMarathonRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            "marathon-ranking", 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
        return topTenMemberIds.stream().map(MarathonRankRedisDto::convertToMarathonRankRedisDto)
            .collect(Collectors.toList());
    }

    private List<TierRankRedisDto> getTopTenTierRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            "tier-ranking", 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
        return topTenMemberIds.stream().map(TierRankRedisDto::convertToTierRankRedisDto).collect(
            Collectors.toList());
    }

    //redis에서 score기준으로 top 10 뽑아옴
    private List<LevelRankRedisDto> getTopTenLevelRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            "level-ranking", 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미

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

    private Marathon findMarathonByMemberAndSeason(Member member, Season season) {
        return marathonJpaRepository.findById(new MarathonId(member, season.getMarathonSeason()))
            .orElseThrow(() -> new IllegalArgumentException("uuid와 season에 해당하는 마라톤 기록이 없습니다."));
    }

    private Tier findTierByMemberAndSeason(Member member, Season season) {
        return tierJpaRepository.findById(new TierId(member, season.getTierSeason()))
            .orElseThrow(() -> new IllegalArgumentException("uuid와 season에 해당하는 티어 기록이 없습니다."));
    }

    private RankingTopTenResponseDto buildResponseDto(Profile profile, Tier tier,
        Marathon marathon) {
        int level = util.makeLevel(profile.getExpPoint());
        String rank = util.makeRank(tier.getRankPoint());
        int winRate = util.makeWinRate(tier.getWin(), tier.getDraw(), tier.getLose());
        int quizRecord = marathon.getQuizRecord();
        return new RankingTopTenResponseDto(profile.getNickname(), rank, level, winRate,
            quizRecord);
    }

}
