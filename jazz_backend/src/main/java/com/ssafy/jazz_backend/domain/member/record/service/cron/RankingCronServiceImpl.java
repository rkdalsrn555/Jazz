package com.ssafy.jazz_backend.domain.member.record.service.cron;

import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.LevelRankRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.MarathonRankDailyRedisDto;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.TierRankRedisDto;
import com.ssafy.jazz_backend.global.Util;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RankingCronServiceImpl {

    private final ZSetOperations<String, String> zSetOperations;
    private final Util util;

    //top 10 가져오고
    //delete하고
    //cache warming 진행

    private List<TierRankRedisDto> getTopTenTierRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            util.getTierRankKeyName(), 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
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

        return topTenMemberIds.stream()
            .map(LevelRankRedisDto::convertToLevelRankRedisDto)
            .collect(Collectors.toList());
    }

    private List<MarathonRankDailyRedisDto> getTopTenMarathonDailyRanks() {
        Set<ZSetOperations.TypedTuple<String>> topTenMemberIds = zSetOperations.reverseRangeWithScores(
            util.getMarathonDailyRankKeyName(), 0, 9);
        //<ZSetOperations.TypedTuple<String>> 는 Set에 저장되는 타입
        //  ZSetOperations.TypedTuple 는 redis zset의 멤버(value)와 score 를 포함하는 튜플 인터페이스
        //      String은 zset에 저장되는 value가 String 타입이다 를 의미
        return topTenMemberIds.stream()
            .map(MarathonRankDailyRedisDto::convertToMarathonRankRedisDto)
            .collect(Collectors.toList());
    }

    //#############    Delete    ################

    public void DeleteDailyMarathonRankInRedis() {
        zSetOperations.remove(util.getMarathonDailyRankKeyName());
    }

    public void DeleteMonthlyMarathonRankInRedis() {
        zSetOperations.remove(util.getMarathonMonthlyRankKeyName());
    }

    public void DeleteTierRankInRedis() {
        zSetOperations.remove(util.getTierRankKeyName());
    }

    public void DeleteLevelRankInRedis() {
        zSetOperations.remove(util.getLevelRankKeyName());
    }

    //##############    캐싱 Warming   #################

    public void cacheWarmingDailyMarathonRankInRedis(List<MarathonRankDailyRedisDto> toptenList) {

        for (MarathonRankDailyRedisDto topten : toptenList) {
            zSetOperations.add(util.getMarathonDailyRankKeyName(), topten.getMemberId(),
                topten.getQuizRecord());
        }
    }

    public void cacheWarmingMonthlyMarathonRankInRedis() {
        
    }

    public void cacheWarmingLevelRankInRedis(List<LevelRankRedisDto> toptenList) {

        for (LevelRankRedisDto topten : toptenList) {
            zSetOperations.add(util.getLevelRankKeyName(), topten.getMemberId(),
                topten.getExpPoint());
        }
    }

    public void cacheWarmingTierRankInRedis(List<TierRankRedisDto> toptenList) {
        for (TierRankRedisDto topten : toptenList) {

            zSetOperations.add(util.getTierRankKeyName(), topten.getMemberId(),
                topten.getRankPoint());
        }

    }


}
