package com.ssafy.jazz_backend.domain.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GameResponse {

    private ResponseResult responseResult;
    private String gameRoomId;
    private String session;
    private String enemyId;
    private UserInfo me;
    private UserInfo other;
    private GameMessage initGameMessage;

    public enum ResponseResult {
        SUCCESS, CANCEL, TIMEOUT;
    }
}
