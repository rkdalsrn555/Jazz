package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Getter;

@Getter
public class JoinMemberRequestDto {

    private String userId;
    private String nickname;
    private String pw;
    private String confirmPw; // ???
}
