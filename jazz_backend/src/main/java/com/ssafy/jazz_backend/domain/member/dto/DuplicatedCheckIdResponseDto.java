package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Getter;

@Getter
public class DuplicatedCheckIdResponseDto {

    private boolean isDuplicated;

    public DuplicatedCheckIdResponseDto(boolean isDuplicated) {
        this.isDuplicated = isDuplicated;
    }
}
