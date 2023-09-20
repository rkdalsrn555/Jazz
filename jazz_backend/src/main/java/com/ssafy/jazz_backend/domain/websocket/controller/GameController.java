package com.ssafy.jazz_backend.domain.websocket.controller;

import com.ssafy.jazz_backend.domain.websocket.dto.GameInitResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameMessage;
import com.ssafy.jazz_backend.domain.websocket.dto.GameMyInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.GameRequest;
import com.ssafy.jazz_backend.domain.websocket.dto.GameResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameUserInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.jazz_backend.domain.websocket.service.GameService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

@RequiredArgsConstructor
@RestController
@RequestMapping("/game")
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

//    private final JwtService jwtService;
    private final GameService gameService;

    @GetMapping("/join")
    @ResponseBody
    public DeferredResult<GameResponse> joinRequest() {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.create();
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
    public ResponseEntity<Void> cancelRequest() {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.create();
        String session = accessor.getSessionId();
        logger.info(">> Cancel request. session : {}", session);

        final GameRequest user = new GameRequest(session);
        gameService.cancelGameRoom(user);

        return ResponseEntity.ok().build();
    }

    /*
    initGameMessage와 랜덤 퀴즈 9문제를 같이 줄것인가 ? (고민)
     */
    @GetMapping("/play")
    @ResponseBody
    public GameInitResponse startGame(@RequestHeader("accessToken") String accessToken) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.create();
        String session = accessor.getSessionId();
//        String userUUID = jwtService.getInfo("account", accessToken);
        /*
        JpaRepository로 user 정보 갖고오기
        #
        #
        #
        #
         */

        GameMyInfo myInfo = new GameMyInfo("userUUID", session, 5);
        GameUserInfo userInfo = new GameUserInfo(5);
        GameMessage initGameMessage = new GameMessage(session, "init Message", MessageType.GAME, 1, myInfo, userInfo);

        GameInitResponse gameInitResponse = new GameInitResponse("김싸피", 500, 30, initGameMessage);

        return gameInitResponse;
    }

    @MessageMapping("/status-message/{gameRoomId}")
    public void sendGameStatus(@DestinationVariable("gameRoomId") String gameRoomId, @Payload
        GameMessage gameMessage) {
        logger.info("Request message. room id : {} | game message : {} | principal : {}",
            gameRoomId, gameMessage);
        if (!StringUtils.hasText(gameRoomId) || gameMessage == null) {
            return;
        }

        if (gameMessage.getMessageType() == MessageType.GAME) {
            gameService.sendMessage(gameRoomId, gameMessage);
        }
    }

    /*
    게임 로직 구현 부분
     */

}
