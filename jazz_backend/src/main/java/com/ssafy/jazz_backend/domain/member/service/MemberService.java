package com.ssafy.jazz_backend.domain.member.service;

import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginResponseDto;

public interface MemberService {
    JoinMemberResponseDto joinMember(JoinMemberRequestDto joinMemberRequestDto);

    UserLoginResponseDto login(UserLoginRequestDto userLoginRequestDto);

}
