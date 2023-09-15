package com.ssafy.jazz_backend.domain.websocket.dto;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GameRoom {
	private String gameRoomId;
	private Set<WebSocketSession> sessions = new HashSet<>();

	@Builder
	public GameRoom(String gameRoomId) {
		this.gameRoomId = gameRoomId;
	}

	public void handlerActions(WebSocketSession session) {
	}
}
