package com.ssafy.jazz_backend.domain.member.record.controller;


import com.ssafy.jazz_backend.domain.member.record.dto.responseDto.RankingTopTenResponseDto;
import com.ssafy.jazz_backend.domain.member.record.service.RankingService;

import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ranking")
@RequiredArgsConstructor
@Slf4j
public class RankingController {

    private final RankingService rankingService;


    //update가 일어나면 바로 redis에 값 넣고 db에도 바꿔줌
    @GetMapping("/level")
    private ResponseEntity<?> getLevelRankingTopTen(
        @RequestHeader String accessToken) {
        try {
            List<RankingTopTenResponseDto> levelRankingTopTen = rankingService.getLevelRankingTopTen(
                accessToken);
            return new ResponseEntity<>(levelRankingTopTen,
                HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("/tier")
    private ResponseEntity<?> getTierRankingTopTen(
        @RequestHeader String accessToken) {
        try {
            List<RankingTopTenResponseDto> tierRankingTopTen = rankingService.getTierRankingTopTen(
                accessToken);
            return new ResponseEntity<>(tierRankingTopTen,
                HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("/daily/marathon")
    private ResponseEntity<?> getDailyMarathonRankingTopTen(
        @RequestHeader String accessToken) {
        try {
            List<RankingTopTenResponseDto> dailyMarathonRankingTopTen = rankingService.getDailyMarathonRankingTopTen(
                accessToken);
            return new ResponseEntity<>(dailyMarathonRankingTopTen,
                HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("/monthly/marathon")
    private ResponseEntity<?> getMonthlyMarathonRankingTopTen(
        @RequestHeader String accessToken) {
        try {
            List<RankingTopTenResponseDto> monthlyMarathonRankingTopTen = rankingService.getMonthlyMarathonRankingTopTen(
                accessToken);
            return new ResponseEntity<>(monthlyMarathonRankingTopTen,
                HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping
    private ResponseEntity<?> insertRedis(
        @RequestHeader String accessToken) {
        try {
              rankingService.insertRedis(accessToken);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }



}
