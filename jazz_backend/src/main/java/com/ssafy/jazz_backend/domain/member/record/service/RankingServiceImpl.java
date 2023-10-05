package com.ssafy.jazz_backend.domain.member.record.service;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.LevelRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.DailyMarathonRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.MonthlyMarathonRankRedisDto;
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

import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.global.Util;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
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

    //level 랭크 top 10 조회
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

    //티어 랭크 top 10 조회
    @Override
    public List<RankingTopTenResponseDto> getTierRankingTopTen(String accessToken) {
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

    //마라톤 일간 랭크 top 10 조회
    @Override
    public List<RankingTopTenResponseDto> getDailyMarathonRankingTopTen(String accessToken) {
        //redis에서 top 10 가져옴
        System.out.println("1");
        List<DailyMarathonRankRedisDto> dailyMarathonRankRedisDtoList = getTopTenDailyMarathonRanks();
        System.out.println("2");
        Season nowSeason = getCurrentSeason();
        System.out.println("3");
        List<RankingTopTenResponseDto> responseDtoList = new ArrayList<>();
        System.out.println("4");
        System.out.println(dailyMarathonRankRedisDtoList.size()
            + " redis에서 가져온 dailyMarathonRankRedisDtoList size");
        for (DailyMarathonRankRedisDto dailyMarathonRankRedisDto : dailyMarathonRankRedisDtoList) {
            String memberId = dailyMarathonRankRedisDto.getMemberId();
            System.out.println(memberId);
            Member member = findMemberById(memberId);
            Profile profile = findProfileById(memberId);
            //일간 랭킹에서 nowSeason은 MarathonDailySeason도 맞고 MarathonMonthlySeason 도 같은 시즌을 의미함.
            Marathon marathon = findMarathonByMemberAndSeason(member, nowSeason);
            Tier tier = findTierByMemberAndSeason(member, nowSeason);
            RankingTopTenResponseDto responseDto = buildResponseDto(profile, tier, marathon);

            responseDtoList.add(responseDto);

        }
        System.out.println("5");
        return responseDtoList;
    }

    //마라톤 월간 랭크 top 10 조회
    @Override
    public List<RankingTopTenResponseDto> getMonthlyMarathonRankingTopTen(String accessToken) {
        //redis에서 top 10 가져옴
        List<MonthlyMarathonRankRedisDto> monthlyMarathonRankRedisDtoList = getTopTenMonthlyMarathonRanks();
        Season nowSeason = getCurrentSeason();
        List<RankingTopTenResponseDto> responseDtoList = new ArrayList<>();
        //랭킹에 있는 애들은 일간 마라톤 점수만 볼 수 있음
        for (MonthlyMarathonRankRedisDto dailyMarathonRankRedisDto : monthlyMarathonRankRedisDtoList) {
            String memberId = dailyMarathonRankRedisDto.getMemberId();
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
    public void insertRedis(String accessToken) {
        List<Member> memberList =  memberRepository.findAll();
        Season nowSeason = seasonJpaRepository.findById(1).orElseThrow(() -> new NullPointerException("시즌 없음"));
        for(Member member : memberList){
            String memberId = member.getId();
            Tier tier = tierJpaRepository.findById(new TierId(member,nowSeason.getTierSeason())).orElse(null);
            if(tier == null){
                zSetOperations.add(util.getTierRankKeyName(),memberId, 0);
            }else{
                zSetOperations.add(util.getTierRankKeyName(),memberId, tier.getRankPoint());
            }
            Profile profile = profileRepository.findById(memberId).orElse(null);
            if (profile == null){
                zSetOperations.add(util.getLevelRankKeyName(), memberId, 0);
            }else{
                zSetOperations.add(util.getLevelRankKeyName(), memberId, profile.getExpPoint());
            }
            Marathon dailyMarathon = marathonJpaRepository.findById(new MarathonId(member,nowSeason.getDailySeason(),nowSeason.getMonthlySeason())).orElse(null);
            if(dailyMarathon == null){
                zSetOperations.add(util.getDailyMarathonRankKeyName(),memberId, 0);
            }else{
                zSetOperations.add(util.getDailyMarathonRankKeyName(),memberId, dailyMarathon.getQuizRecord());
            }
            List<Marathon> monthlyMarathonList = marathonJpaRepository.findMarathonWithMaxQuizRecordByMonthlySeason(nowSeason.getMonthlySeason());
            if(monthlyMarathonList.size() == 0){
                zSetOperations.add(util.getMonthlyMarathonRankKeyName(),memberId, 0);
            }else{
                Marathon monthlyMarathon = monthlyMarathonList.get(0);
                zSetOperations.add(util.getMonthlyMarathonRankKeyName(),memberId,monthlyMarathon.getQuizRecord());
            }




        }



    }

    private List<MonthlyMarathonRankRedisDto> getTopTenMonthlyMarathonRanks() {
        //월간 랭킹 10명 uuid 와 record 가져옴
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            util.getMonthlyMarathonRankKeyName(), 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
        System.out.println("getTopTenMonthlyMarathonRanks 시 redis에서는 에러 안남!");
        return topTenMemberIds.stream()
            .map(MonthlyMarathonRankRedisDto::convertToMonthlyMarathonRankRedisDto)
            .collect(Collectors.toList());
    }

    private List<DailyMarathonRankRedisDto> getTopTenDailyMarathonRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            util.getDailyMarathonRankKeyName(), 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
        System.out.println("getTopTenDailyMarathonRanks 시 redis에서는 에러 안남!");
        return topTenMemberIds.stream()
            .map(DailyMarathonRankRedisDto::convertToDailyMarathonRankRedisDto)
            .collect(Collectors.toList());
    }

    private List<TierRankRedisDto> getTopTenTierRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            util.getTierRankKeyName(), 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
        System.out.println("getTopTenTierRanks 시 redis에서는 에러 안남!");
        return topTenMemberIds.stream().map(TierRankRedisDto::convertToTierRankRedisDto).collect(
            Collectors.toList());
    }

    //redis에서 score기준으로 top 10 뽑아옴
    private List<LevelRankRedisDto> getTopTenLevelRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            util.getLevelRankKeyName(), 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
        System.out.println("getTopTenLevelRanks 시 redis에서는 에러 안남!");
        return topTenMemberIds.stream()
            .map(LevelRankRedisDto::convertToLevelRankRedisDto)
            .collect(Collectors.toList());
    }

    //현재 시즌 가져오기
    private Season getCurrentSeason() {
        return seasonJpaRepository.findById(1)
            .orElseThrow(() -> new NullPointerException("Season 테이블에 값이 존재하지 않습니다."));
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
        Marathon marathon = marathonJpaRepository.findById(
            new MarathonId(member, season.getDailySeason(),
                season.getMonthlySeason())).orElse(null);
        if (marathon == null) {
            return null;
        }
        return marathon;
    }

    private Tier findTierByMemberAndSeason(Member member, Season season) {
        Tier tier = tierJpaRepository.findById(new TierId(member, season.getTierSeason()))
            .orElse(null);
        if (tier == null) {
            System.out.println("tier 가 null 입니다.");
            return null;
        }
        return tier;
//            .orElseThrow(() -> new IllegalArgumentException("uuid와 season에 해당하는 티어 기록이 없습니다."));

    }

    private RankingTopTenResponseDto buildResponseDto(Profile profile, Tier tier,
        Marathon marathon) {
        int winRate = 0;
        String rank = "Bronze";
        int level = 1;
        int quizRecord = 0;
        //profile이 null인 경우
        if (profile != null) {
            level = util.makeLevel(profile.getExpPoint());
        }

        //tier가 null 인 경우
        if (tier != null) {
            rank = util.makeRank(tier.getRankPoint());
            winRate = util.makeWinRate(tier.getWin(), tier.getDraw(), tier.getLose());
        }
        // marathon이 null 인 경우
        if (marathon != null) {
            quizRecord = marathon.getQuizRecord();
        }
        return new RankingTopTenResponseDto(profile.getNickname(), rank, level, winRate,
            quizRecord);
    }

}
