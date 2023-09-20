package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLoginResponseDto {
    private String userId;
    private String pw;
    private String accessToken;
    private String refreshToken;
}