package com.ssafy.jazz_backend.domain.member.record.dto.redisDto;

import java.io.Serializable;
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
public class LevelRankRedisDto implements Serializable {

    @Id
    private String memberId;
    private Integer expPoint;

    public static LevelRankRedisDto convertToLevelRankRedisDto(TypedTuple<String> tuple) {
        String memberId = tuple.getValue();
        Integer score = tuple.getScore().intValue();
        return new LevelRankRedisDto(memberId, score);

    }


}
