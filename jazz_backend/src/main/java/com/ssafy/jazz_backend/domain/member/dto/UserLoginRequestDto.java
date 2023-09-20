package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Getter;

@Getter
public class UserLoginRequestDto {

    private String userId;
    private String pw;
}
