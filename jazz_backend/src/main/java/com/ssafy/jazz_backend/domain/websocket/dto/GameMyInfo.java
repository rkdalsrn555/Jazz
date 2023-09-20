package com.ssafy.jazz_backend.domain.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GameMyInfo {
    private String userUUID;
    private String session;
    private int lives;
}
