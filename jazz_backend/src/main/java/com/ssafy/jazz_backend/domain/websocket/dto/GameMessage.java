package com.ssafy.jazz_backend.domain.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GameMessage {
    private String session;
    private String message;
    // 게임 종료 여부 GAME / FINISH
    private MessageType messageType;
    // 진행 중인 라운드
    private int round;
    private GameMyInfo myInfo;
    private GameUserInfo userInfo;
}
