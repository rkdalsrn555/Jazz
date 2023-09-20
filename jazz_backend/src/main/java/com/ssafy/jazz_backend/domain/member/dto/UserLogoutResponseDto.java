package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLogoutResponseDto {
    private String message;

    public UserLogoutResponseDto(String message) {
        this.message = message;
    }
}
