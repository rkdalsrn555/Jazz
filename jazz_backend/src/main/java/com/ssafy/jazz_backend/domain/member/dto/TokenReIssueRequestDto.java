package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenReIssueRequestDto {

    private String refreshToken;
}
