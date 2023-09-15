package com.ssafy.jazz_backend.domain.websocket.dto;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;

@Getter
public class User {
	private String id;
	private WebSocketSession session;
}
