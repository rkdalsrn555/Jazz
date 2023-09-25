package com.ssafy.jazz_backend.domain.websocket.service;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import com.ssafy.jazz_backend.domain.websocket.dto.GameInitResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameMessage;
import com.ssafy.jazz_backend.domain.websocket.dto.GameMyInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.GameRequest;
import com.ssafy.jazz_backend.domain.websocket.dto.GameResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameResponse.ResponseResult;
import com.ssafy.jazz_backend.domain.websocket.dto.GameResultResponse;
import com.ssafy.jazz_backend.domain.websocket.dto.GameUserInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.MessageType;
import com.ssafy.jazz_backend.domain.websocket.dto.MyInfo;
import com.ssafy.jazz_backend.domain.websocket.dto.QuizMessage;
import com.ssafy.jazz_backend.domain.websocket.dto.UserInfo;
import com.ssafy.jazz_backend.global.Util;
import jakarta.servlet.http.HttpSession;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.context.request.async.DeferredResult;

@Service
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);
    private Map<GameRequest, DeferredResult<GameResponse>> waitingUsers;
    // <WebSocketSession, GameRoomId>의 정보를 저장
    private Map<String, String> connectedUsers;
    private ReentrantReadWriteLock lock;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private Util util;

    /*
    필드 초기화 메서드
     */
    @PostConstruct
    private void setUp() {
        this.waitingUsers = new LinkedHashMap<>();
        this.lock = new ReentrantReadWriteLock();
        this.connectedUsers = new ConcurrentHashMap<>();
    }

    /*
    - 사용자의 게임룸 참가요청 메서드를 비동기로 처리
    - waitingUsers Map에 사용자를 추가 후에 게임방 생성 메서드 (establishGameRoom()) 호출
     */
    @Async("asyncThreadPool")
    public void joinGameRoom(GameRequest request, DeferredResult<GameResponse> deferredResult) {
        logger.info("## Join game room request. {}[{}]", Thread.currentThread().getName(),
            Thread.currentThread().getId());
        System.out.println(request.toString());
        System.out.println(deferredResult.toString());
        if (request == null || deferredResult == null) {
            return;
        }

        try {
            lock.writeLock().lock();
            waitingUsers.put(request, deferredResult);
        } finally {
            lock.writeLock().unlock();
            establishGameRoom();
        }
    }

    public void cancelGameRoom(GameRequest gameRequest) {
        try {
            lock.writeLock().lock();
            setJoinResult(waitingUsers.remove(gameRequest),
                new GameResponse(ResponseResult.CANCEL, null, gameRequest.getSession()));
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void timeout(GameRequest gameRequest) {
        try {
            lock.writeLock().lock();
            setJoinResult(waitingUsers.remove(gameRequest),
                new GameResponse(ResponseResult.TIMEOUT, null, gameRequest.getSession()));
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void establishGameRoom() {
        try {
            logger.info("--> 게임룸 생성 검사 중");
            // readLock 설정
            lock.readLock().lock();
            // 대기유저 2명이상을 만족하지 않는다면 return
            if (waitingUsers.size() < 2) {
                logger.info("대기 유저 만족 X ... 계속 대기합니다. [waitingUsers = " + waitingUsers.size() + "]");
                return;
            }
            logger.info("매칭 완료 곧 게임이 시작됩니다.");
            // waitingUsers Map을 Iterator로 조회 it.next()값이 null이 아님을 보장한다.
            Iterator<GameRequest> it = waitingUsers.keySet().iterator();
            GameRequest user1 = it.next();
            GameRequest user2 = it.next();

            String uuid = UUID.randomUUID().toString();

            // user1, user2를 waitingUsers에서 제거 후 userResult로 저장
            DeferredResult<GameResponse> user1Result = waitingUsers.remove(user1);
            DeferredResult<GameResponse> user2Result = waitingUsers.remove(user2);

            logger.info("user1 : " + user1Result.getResult());
            logger.info("user2 : " + user2Result.getResult());

            user1Result.setResult(
                new GameResponse(ResponseResult.SUCCESS, uuid, user1.getSession()));
            user2Result.setResult(
                new GameResponse(ResponseResult.SUCCESS, uuid, user2.getSession()));
        } catch (Exception e) {
            logger.warn("Exception occur while checking waiting users", e);
        } finally {
            // readLock 해제
            lock.readLock().unlock();
        }
    }

    public void sendMessage(String gameRoomId, GameMessage gameMessage) {
        // 게임룸 Url 받기
        String destination = getDestination(gameRoomId);
        messagingTemplate.convertAndSend(destination, gameMessage);
    }

    public void sendQuizMessage(String gameRoomId, QuizMessage quizMessage) {
        String destination = getDestination(gameRoomId);
        messagingTemplate.convertAndSend(destination, quizMessage);
    }

    public void connectUser(String gameRoomId, String webSocketSessionId) {
        connectedUsers.put(webSocketSessionId, gameRoomId);
    }

    // GameMessage 수정해야 함
    public void disConnectUser(String webSocketSessionId) {
        String gameRoomId = connectedUsers.get(webSocketSessionId);
        GameMessage gameMessage = new GameMessage();

        gameMessage.setMessageType(MessageType.DISCONNECTED);
        sendMessage(gameRoomId, gameMessage);
    }
    // --------------------------------------------

    private String getDestination(String gameRoomId) {
        return "/sub/game/" + gameRoomId;
    }

    private void setJoinResult(DeferredResult<GameResponse> result, GameResponse response) {
        if (result != null) {
            result.setResult(response);
        }
    }

    public GameInitResponse gameInit(String accessToken, HttpSession session, String enemyId) {
        Member member = memberRepository.findById(jwtService.getInfo("account", accessToken)).orElseThrow(() -> new NullPointerException());
        Member enemy = memberRepository.findById(enemyId).orElseThrow(() -> new NullPointerException());

        MyInfo myInfo = new MyInfo(member.getUserId(), member.getProfile().getExpPoint(), 100);
        UserInfo userInfo = new UserInfo(enemy.getUserId(), enemy.getProfile().getExpPoint(), 100);
        GameMyInfo gameMyInfo = new GameMyInfo(member.getId(), session.getId(), 5);
        GameUserInfo gameUserInfo = new GameUserInfo(5);
        GameMessage initGameMessage = new GameMessage(session.getId(), "Game init Message", MessageType.GAME, 1, gameMyInfo, gameUserInfo);

        GameInitResponse gameInitResponse = new GameInitResponse(myInfo, userInfo, initGameMessage);
        return gameInitResponse;
    }

    public GameResultResponse gameResult(String accessToken) {
        /*
        프론트와 협의 후 작성
         */
        GameResultResponse gameResultResponse = new GameResultResponse();
        return gameResultResponse;
    }

}
