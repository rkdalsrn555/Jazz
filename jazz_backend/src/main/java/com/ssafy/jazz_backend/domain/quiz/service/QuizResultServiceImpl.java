package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.record.dto.redisDto.DailyMarathonRankRedisDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultResponseDto;
import com.ssafy.jazz_backend.global.Util;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuizResultServiceImpl implements QuizResultService {

    private final Util util;
    private final JwtService jwtService;
    private final ProfileRepository profileRepository;
    //키 : String , Value : String, 스코어는 Double로 고정임
    private final ZSetOperations<String, String> zSetOperations;

    @Transactional
    @Override
    public QuizResultResponseDto getQuizResult(String accessToken, QuizResultRequestDto request) {

        String memberId = jwtService.getInfo("account", accessToken);
        Profile profile = findByMemberId(memberId);
        //맞은 문제 수
        int correctCount = getCorrectCount(request);
        //rewardExp = 맞은 수 * 10
        int rewardExpPoint = getRewardExpPoint(correctCount);
        //rewardDiamond = 맞은 수 * 2
        int rewardDiamond = getRewardDiamond(correctCount);
        //DB에 값 업데이트
        Profile updatedProfile = updateExpPointAndDiamond(profile, rewardExpPoint, rewardDiamond);
        //Redis 값 넣기
        zSetOperations.add(util.getLevelRankKeyName(), memberId, updatedProfile.getExpPoint());

        QuizResultResponseDto responseDto = QuizResultResponseDto.create(
            rewardDiamond, rewardExpPoint);

        return responseDto;
    }

    @RedisHash(timeToLive = 31536000) //TTL 1년으로 설정
    @AllArgsConstructor
    @Getter
    @Setter
    public class DailyMarathonRankRedisDto {

        @Id
        private String memberId;

        private Integer quizRecord;

        public static com.ssafy.jazz_backend.domain.member.record.dto.redisDto.DailyMarathonRankRedisDto convertToDailyMarathonRankRedisDto(
            TypedTuple<String> tuple) {
            String memberId = tuple.getValue();
            Integer score = tuple.getScore().intValue();
            return new com.ssafy.jazz_backend.domain.member.record.dto.redisDto.DailyMarathonRankRedisDto(
                memberId, score);

        }
    }

    private Profile updateExpPointAndDiamond(Profile profile, int rewardExpPoint,
        int rewardDiamond) {
        int preExpPoint = profile.getExpPoint();
        int preDiamond = profile.getDiamond();

        profile.setExpPoint(rewardExpPoint + preExpPoint);
        profile.setDiamond(rewardDiamond + preDiamond);
        profileRepository.save(profile);
        return profile;


    }

    private Profile findByMemberId(String memberId) {
        return profileRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 uuid에 맞는 프로필이 없습니다."));

    }

    private int getCorrectCount(QuizResultRequestDto request) {
        return request.getCorrectCount();
    }

    private int getRewardExpPoint(int correctCount) {
        return correctCount * 10;

    }

    private int getRewardDiamond(int correctCount) {
        return correctCount * 2;
    }

}
