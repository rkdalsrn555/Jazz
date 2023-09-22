package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultResponseDto;
import com.ssafy.jazz_backend.global.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizResultServiceImpl implements QuizResultService {

    private final Util util;
    private final JwtService jwtService;
    private final ProfileRepository profileRepository;
    //키 : String , Value : String, 스코어는 Double로 고정임
    private final ZSetOperations<String, String> zSetOperations;

    @Override
    public QuizResultResponseDto getQuizResult(String accessToken, QuizResultRequestDto request) {

        String memberId = jwtService.getInfo("account", accessToken);
        Profile profile = findByMemberId(memberId);
        //DB에 값 업데이트
        Profile updatedProfile = updateExpPointAndDiamond(profile, request);
        //Redis 값 넣기
        zSetOperations.add(util.getLevelRankKeyName(), memberId, updatedProfile.getExpPoint());

        QuizResultResponseDto responseDto = QuizResultResponseDto.create(
            updatedProfile.getDiamond(), updatedProfile.getExpPoint());

        return responseDto;
    }

    private Profile updateExpPointAndDiamond(Profile profile, QuizResultRequestDto request) {
        int correctCount = getCorrectCount(request);
        int rewardExpPoint = getRewardExpPoint(correctCount);
        int rewardDiamond = getRewardDiamond(correctCount);

        profile.setExpPoint(rewardExpPoint + profile.getExpPoint());
        profile.setExpPoint(rewardDiamond + profile.getDiamond());
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
