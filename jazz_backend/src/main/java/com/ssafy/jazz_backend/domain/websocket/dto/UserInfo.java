package com.ssafy.jazz_backend.domain.websocket.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserInfo {
    private String userId;
    private int expPoint;
    private int rankPoint;
}
