package com.ssafy.jazz_backend.domain.websocket.dto;

import java.util.HashSet;

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
}
