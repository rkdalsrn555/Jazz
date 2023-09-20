package com.ssafy.jazz_backend.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TokenReIssueResponseDto {

    private String accessToken;
}
