package com.ssafy.jazz_backend.domain.news.service.serviceImpl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.news.dto.NewsCrawlingRequestDto;
import com.ssafy.jazz_backend.domain.news.service.NewsService;
import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class NewServiceImpl implements NewsService {

    @Autowired
    JwtService jwtService;

    private final ConcurrentHashMap<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    @Override
    public SseEmitter newsCrawling(NewsCrawlingRequestDto newsCrawlingRequestDto)
        throws IOException, InterruptedException {
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

        // 동작이 완료하거나, 시간이 초과하면 맵에서 해당 emitter 제거
        emitter.onCompletion(() -> emitterMap.remove(UUID));
        emitter.onTimeout(() -> emitterMap.remove(UUID));

        // sse는 일단은 무조건 값을 넘겨줘야 하기 때문에 초기에 아무 값이나 넣어줘야함
        emitter.send(SseEmitter.event().name(UUID).data(enterpriseName));
        // name이 식별자, json으로 보내줘?
        // 1. 레디스에 해당 기업의 뉴스 크롤링 정보가 있는지 확인하기
        if (enterpriseName.equals("김의년")) {
            // 2-1. 있다면 해당 기업의 뉴스 크롤링 정보를 리턴
            // 있다고 가정하는 입력
            // 레디스에 있는 값 sse에 담아서 보내주기
            // 여기서 send하면 됨
            System.out.println("확인");
        } else {
            // 2-2. 없다면 해당 기업을 크롤링 하기
            // 없는 경우
            postTopic(UUID, enterpriseName);
        }
        SseEmitter sseEmitter1 = emitterMap.get(UUID);
        return sseEmitter1;
    }

    void postTopic(String UUID, String name) throws IOException, InterruptedException {
        // 3. 기업명 토픽에 입력으로 들어온 기업명 게시하기(사용자의 아이디도 같이)
        // 토픽이름은 정해야함
        Properties prop = new Properties();
        prop.put("bootstrap.servers", "j9a708.p.ssafy.io:9092"); // server, kafka host
        prop.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        prop.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        prop.put("acks", "all");
        prop.put("block.on.buffer.full", "true");

        // UUID가 16진수로 이루어져 있어서 절대로 .이 들어갈 수 없음
        String message = UUID + "." + name;

        // producer 생성 => 성공
        KafkaProducer<String, String> producer = new KafkaProducer<String, String>(prop);
        producer.send(new ProducerRecord<String, String>("test_topic_3", message));
    }

    @KafkaListener(topics = "test_topic2", groupId = "test_kafka1")
    void getTopic(@Payload String message) {
        // 6. 자바에서 크롤링 토픽에 올라온 데이터를 받기
        ObjectMapper objectMapper = new ObjectMapper();
        SseEmitter emitter = null;
        String UUID = "";

        try {
            // JSON 문자열을 JsonNode로 파싱
            JsonNode jsonNode = objectMapper.readTree(message);

            // JsonNode에서 배열을 가져오기
            for (JsonNode node : jsonNode) {
                // 각 객체의 key와 value 가져오기
                String key = node.get("key").asText();
                String value = node.get("value").asText();

                if (key.equals("사용자")) {
                    UUID = value;
                    emitter = emitterMap.get(UUID);
                }
            }
            emitter.send(SseEmitter.event().name(UUID).data(jsonNode));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}