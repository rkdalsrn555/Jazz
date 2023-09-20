package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ModifyNicknameResponseDto {
    private boolean avail;
}
