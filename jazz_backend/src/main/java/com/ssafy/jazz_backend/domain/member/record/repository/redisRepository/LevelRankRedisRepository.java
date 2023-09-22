package com.ssafy.jazz_backend.domain.member.record.repository.redisRepository;

import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.LevelRankRedisDto;
import org.springframework.data.repository.CrudRepository;


public interface LevelRankRedisRepository extends CrudRepository<LevelRankRedisDto, String> {

}
