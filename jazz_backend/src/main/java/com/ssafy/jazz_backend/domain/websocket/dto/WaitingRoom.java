package com.ssafy.jazz_backend.domain.websocket.dto;

import java.util.LinkedList;

import org.springframework.web.socket.WebSocketSession;

import lombok.Getter;

@Getter
public class WaitingRoom {
	private String waitingRoomId;
	private LinkedList<WebSocketSession> sessions = new LinkedList<>();

}
