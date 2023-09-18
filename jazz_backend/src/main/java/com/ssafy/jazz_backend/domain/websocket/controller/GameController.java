package com.ssafy.jazz_backend.domain.websocket.controller;

import com.ssafy.jazz_backend.domain.websocket.dto.GameRequest;
import com.ssafy.jazz_backend.domain.websocket.dto.GameResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.jazz_backend.domain.websocket.service.GameService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

@RequiredArgsConstructor
@RestController
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    private final GameService gameService;

    @GetMapping("/join")
    @ResponseBody
    public DeferredResult<GameResponse> joinRequest(SimpMessageHeaderAccessor accessor) {
        String session = accessor.getSessionId();
        logger.info(">> Join request. session : {}", session);

        final GameRequest user = new GameRequest(session);
        final DeferredResult<GameResponse> deferredResult = new DeferredResult<>(null);
        gameService.joinGameRoom(user, deferredResult);

        deferredResult.onCompletion(() -> gameService.cancelGameRoom(user));
        deferredResult.onError((throwable -> gameService.cancelGameRoom(user)));
        deferredResult.onTimeout(() -> gameService.timeout(user));

        return deferredResult;
    }

    @GetMapping("/cancel")
    @ResponseBody
    public ResponseEntity<Void> cancelRequest(SimpMessageHeaderAccessor accessor) {
        String session = accessor.getSessionId();
        logger.info(">> Cancel request. session : {}", session);

        final GameRequest user = new GameRequest(session);
        gameService.cancelGameRoom(user);

        return ResponseEntity.ok().build();
    }

    /*
    게임 로직 구현 부분
     */

}
