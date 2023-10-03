package com.ssafy.jazz_backend.domain.news.service.serviceImpl;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.news.dto.NewsCrawlingRequestDto;
import com.ssafy.jazz_backend.domain.news.service.NewsService;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class NewServiceImpl implements NewsService {

    @Autowired
    JwtService jwtService;

    private final ConcurrentHashMap<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    @Override
    public void newsCrawling(NewsCrawlingRequestDto newsCrawlingRequestDto) throws IOException {
        /*
                프로세스
            0. 구독하기
            1. 레디스에 해당 기업의 뉴스 크롤링 정보가 있는지 확인하기
              2-1. 있다면 해당 기업의 뉴스 크롤링 정보를 리턴
              2-2. 없다면 해당 기업을 크롤링 하기
                3. 기업명 토픽에 입력으로 들어온 기업명 게시하기(사용자의 아이디도 같이)
                4. 파이썬에서 기업명 토픽을 구독하고 있고, 구독하고 있는 기업명 토픽에 3번에 보낸 기업명이 들어옴
                   기업명이 들어오면 파이썬은 크롤링 시작
                5. 크롤링이 완료 되면 크롤링 토픽에 크롤링 정보 게시하기(아이디도 같이)
                6. 자바에서 크롤링 토픽에 올라온 데이터를 받기
                7. 해당 그거에 맞는 사용자한테 리턴해주기
         */
        String enterpriseName = newsCrawlingRequestDto.getEnterpriseName();
        String accessToken = newsCrawlingRequestDto.getAccessToken();

        String UUID = jwtService.getInfo("account", accessToken);


        // 0. 구독하기
        SseEmitter emitter = new SseEmitter();
        emitterMap.put(UUID, emitter);

        // 1. 레디스에 해당 기업의 뉴스 크롤링 정보가 있는지 확인하기
        if (UUID.equals("김의년")) {
            // 2-1. 있다면 해당 기업의 뉴스 크롤링 정보를 리턴
            // 있다고 가정하는 입력
            emitter.send(SseEmitter.event().name(UUID).data(enterpriseName));
        } else {
            // 2-2. 없다면 해당 기업을 크롤링 하기
            // 없는 경우
        }
    }
}
