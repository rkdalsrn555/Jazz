package com.ssafy.jazz_backend.domain.websocket.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.jazz_backend.domain.websocket.dto.GameRoom;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class GameService {
	// private final ObjectMapper objectMapper;
	private Map<String, GameRoom> gameRooms;

	@PostConstruct
	private void init() {
		gameRooms = new LinkedHashMap<>();
	}

	public List<GameRoom> findAllRoom() {
		return new ArrayList<>(gameRooms.values());
	}

	public GameRoom createRoom() {
		String randomId = UUID.randomUUID().toString();
		GameRoom gameRoom = GameRoom.builder()
			.gameRoomId(randomId)
			.build();
		gameRooms.put(randomId, gameRoom);
		return gameRoom;
	}

}
