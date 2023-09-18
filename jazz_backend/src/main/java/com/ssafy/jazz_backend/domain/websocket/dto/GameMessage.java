package com.ssafy.jazz_backend.domain.websocket.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GameMessage {
    private String session;
    private String message;
    private MessageType messageType;
}
