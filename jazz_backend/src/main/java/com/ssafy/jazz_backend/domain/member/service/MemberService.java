package com.ssafy.jazz_backend.domain.member.service;

import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberResponseDto;

public interface MemberService {
    JoinMemberResponseDto joinMember(JoinMemberRequestDto joinMemberRequestDto);

}
