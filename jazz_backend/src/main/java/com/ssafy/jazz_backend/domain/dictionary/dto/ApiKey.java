package com.ssafy.jazz_backend.domain.dictionary.dto;

import lombok.Getter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@ToString
@Component
public class ApiKey {
    @Value("${dictionary.serviceKey}")
    private String apiKey;
}
