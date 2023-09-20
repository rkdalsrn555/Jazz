package com.ssafy.jazz_backend.domain.member.service;

import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedNicknameRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedNicknameResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.ModifyNicknameRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.ModifyNicknameResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.TokenReIssueRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.TokenReIssueResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLogoutRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLogoutResponseDto;

public interface MemberService {
    JoinMemberResponseDto joinMember(JoinMemberRequestDto joinMemberRequestDto);

    UserLoginResponseDto login(UserLoginRequestDto userLoginRequestDto);
    TokenReIssueResponseDto reIssue(TokenReIssueRequestDto tokenReIssueRequestDto);
    UserLogoutResponseDto logout(UserLogoutRequestDto userLogoutRequestDto);

    DuplicatedCheckIdResponseDto duplicatedCheckId(
        DuplicatedCheckIdRequestDto duplicatedCheckIdRequestDto);

    ModifyNicknameResponseDto modifyNickname(ModifyNicknameRequestDto modifyNicknameRequestDto,
        String accessToken);

    DuplicatedNicknameResponseDto duplicatedNicknameCheck(
        DuplicatedNicknameRequestDto duplicatedNicknameRequestDto);

}
