package com.ssafy.jazz_backend.domain.member.record.dto.redisDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;

@RedisHash(timeToLive = 31536000) //TTL 1년으로 설정
@AllArgsConstructor
@Getter
@Setter
public class TierRankRedisDto {

    @Id
    private String memberId;

    private Integer rankPoint;

    public static TierRankRedisDto convertToTierRankRedisDto(TypedTuple<String> tuple) {
        String memberId = tuple.getValue();
        Integer score = tuple.getScore().intValue();
        return new TierRankRedisDto(memberId, score);

    }
}
