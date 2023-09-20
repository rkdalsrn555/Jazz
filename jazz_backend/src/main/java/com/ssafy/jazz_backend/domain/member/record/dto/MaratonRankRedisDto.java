package com.ssafy.jazz_backend.domain.member.record.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(timeToLive = 86400) //TTL 하루로 설정
public class MaratonRankRedisDto {

    @Id
    private String memberId;

    private Integer quizRecord;


}
