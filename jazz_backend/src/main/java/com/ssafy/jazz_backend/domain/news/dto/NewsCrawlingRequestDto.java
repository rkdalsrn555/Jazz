package com.ssafy.jazz_backend.domain.news.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class NewsCrawlingRequestDto {
    private String enterpriseName;
    private String accessToken;
}
