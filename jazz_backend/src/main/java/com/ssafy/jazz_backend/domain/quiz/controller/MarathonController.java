package com.ssafy.jazz_backend.domain.quiz.controller;

import com.ssafy.jazz_backend.domain.quiz.dto.MarathonQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.service.MarathonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("quiz/marathon")
@RequiredArgsConstructor
@Slf4j
public class MarathonController {
    private final MarathonService marathonService;


    //마라톤 퀴즈 하나 뽑아서 주기
    @GetMapping
    private ResponseEntity<?> getMarathonQuiz(@RequestHeader("accessToken") String accessToken) {

        try {
            MarathonQuizResponseDto responseDto = marathonService.getMarathonQuiz(accessToken);
            return new ResponseEntity<MarathonQuizResponseDto>(responseDto, HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //마라톤 결과 DB에 적용
    @PatchMapping("/result")
    private ResponseEntity<?> applyMarathonQuizResult(@RequestHeader("accessToken") String accessToken, @RequestBody List<MarathonResultRequestDto> requestDtoList){
        return null;
    }
}


