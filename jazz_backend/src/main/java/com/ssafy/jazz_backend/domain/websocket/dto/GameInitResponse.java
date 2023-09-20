package com.ssafy.jazz_backend.domain.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GameInitResponse {
    private String userId;
    private int expPoint;
    private int rankPoint;
    private GameMessage initGameMessage;
}
