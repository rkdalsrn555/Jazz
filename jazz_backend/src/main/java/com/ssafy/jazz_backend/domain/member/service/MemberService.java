package com.ssafy.jazz_backend.domain.member.service;

import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;

public interface MemberService {

    DuplicatedCheckIdResponseDto duplicatedCheckId(
        DuplicatedCheckIdRequestDto duplicatedCheckIdRequestDto);

    void joinMember(JoinMemberRequestDto joinMemberRequestDto);


}
