package com.ssafy.jazz_backend.domain.websocket.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.jazz_backend.domain.websocket.service.GameService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/game")
public class GameController {
	private final GameService gameService;


}
