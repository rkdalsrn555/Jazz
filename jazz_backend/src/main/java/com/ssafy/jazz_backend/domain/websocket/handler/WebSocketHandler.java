package com.ssafy.jazz_backend.domain.websocket.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.jazz_backend.domain.websocket.service.GameService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {
	private final ObjectMapper objectMapper;
	private final GameService gameService;

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		super.handleTextMessage(session, message);
	}
}
