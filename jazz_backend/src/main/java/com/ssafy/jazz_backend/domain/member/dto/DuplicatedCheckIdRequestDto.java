package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Getter;

@Getter
public class DuplicatedCheckIdRequestDto {

    private String userId;

    public DuplicatedCheckIdRequestDto(String userId) {
        this.userId = userId;
    }
}
