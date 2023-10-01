package com.ssafy.jazz_backend.domain.websocket.controller;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonAndTierQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.service.MarathonServiceImpl;
import com.ssafy.jazz_backend.domain.websocket.dto.GameInitResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameMessage;
import com.ssafy.jazz_backend.domain.websocket.dto.GameMyInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.GameRequest;
import com.ssafy.jazz_backend.domain.websocket.dto.GameResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameResultResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameUserInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.MessageType;
import com.ssafy.jazz_backend.domain.websocket.dto.MyInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.QuizMessage;
import com.ssafy.jazz_backend.domain.websocket.dto.UserInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.ssafy.jazz_backend.domain.websocket.service.GameService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    private final JwtService jwtService;
    private final GameService gameService;

    private final MarathonServiceImpl marathonService;

    @GetMapping("/join")
    @ResponseBody
    public DeferredResult<GameResponse> joinRequest(@RequestHeader("accessToken") String accessToken, HttpServletRequest request) {
        String session = request.getSession().getId();
//        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.create();
//        String session = accessor.getSessionId();
        logger.info(">> Join request. session : {}", session);
        String memberUUID = jwtService.getInfo("account", accessToken);

        final GameRequest user = new GameRequest(session, memberUUID);
        final DeferredResult<GameResponse> deferredResult = new DeferredResult<>(null);
        gameService.joinGameRoom(user, deferredResult);

        deferredResult.onCompletion(() -> gameService.cancelGameRoom(user));
        deferredResult.onError((throwable -> gameService.cancelGameRoom(user)));
        deferredResult.onTimeout(() -> gameService.timeout(user));

        return deferredResult;
    }

    @GetMapping("/cancel")
    @ResponseBody
    public ResponseEntity<String> cancelRequest(@RequestHeader("accessToken") String accessToken) {
        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.create();
        String session = accessor.getSessionId();
        logger.info(">> Cancel request. session : {}", session);

        final GameRequest user = new GameRequest(session, null);
        gameService.cancelGameRoom(user);

        return new ResponseEntity<>("매칭 취소 성공", HttpStatus.OK);
    }

    @GetMapping("/play/{enemyId}")
    @ResponseBody
    public GameInitResponse startGame(@RequestHeader("accessToken") String accessToken, HttpSession session, @PathVariable String enemyId) {
//        String session = request.getSession().getId();
//        SimpMessageHeaderAccessor accessor = SimpMessageHeaderAccessor.create();
//        String session = accessor.getSessionId();
//        String userUUID = jwtService.getInfo("account", accessToken);

        GameInitResponse gameInitResponse = gameService.gameInit(accessToken, session, enemyId);

        return gameInitResponse;
    }

    @PatchMapping("/result")
    @ResponseBody
    public GameResultResponse endGame(@RequestHeader("accessToken") String accessToken) {
        GameResultResponse gameResultResponse = gameService.gameResult(accessToken);

        return gameResultResponse;
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

    @MessageMapping("/quiz-message/{gameRoomId}")
    public void sendQuizMessage(@DestinationVariable("gameRoomId") String gameRoomId) {
       MarathonAndTierQuizResponseDto marathonAndTierQuizResponseDto = marathonService.getMarathonQuiz("NoAccessToken");
       logger.info("Random Quiz : {}", marathonAndTierQuizResponseDto.getQuestion());
       if(marathonAndTierQuizResponseDto == null) {
           return;
       }

       QuizMessage quizMessage = new QuizMessage(MessageType.QUIZ, marathonAndTierQuizResponseDto.getQuizId(), marathonAndTierQuizResponseDto.getQuestion(),
           marathonAndTierQuizResponseDto.getContent(), marathonAndTierQuizResponseDto.getCaseNum(),
           marathonAndTierQuizResponseDto.getIsMulti(), marathonAndTierQuizResponseDto.getKind());

       gameService.sendQuizMessage(gameRoomId, quizMessage);
    }

}
