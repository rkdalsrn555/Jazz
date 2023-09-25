package com.ssafy.jazz_backend.domain.websocket.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameInitResponse {
    private MyInfo myInfo;
    private UserInfo userInfo;
    private GameMessage initGameMessage;
}
