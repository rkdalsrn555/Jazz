package com.ssafy.jazz_backend.domain.member.record.controller;


import com.ssafy.jazz_backend.domain.member.record.dto.responseDto.RankingTopTenResponseDto;
import com.ssafy.jazz_backend.domain.member.record.service.RankingService;

import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
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
        @RequestHeader String accessTocken) {
        try {
            List<RankingTopTenResponseDto> levelRankingTopTen = rankingService.getLevelRankingTopTen(
                accessTocken);
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
        @RequestHeader String accessTocken) {
        try {
            List<RankingTopTenResponseDto> tierRankingTopTen = rankingService.getTierRankingTopTen(
                accessTocken);
            return new ResponseEntity<>(tierRankingTopTen,
                HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("/marathon")
    private ResponseEntity<?> getMarathonRankingTopTen(
        @RequestHeader String accessTocken) {
        try {
            List<RankingTopTenResponseDto> marathonRankingTopTen = rankingService.getMarathonRankingTopTen(
                accessTocken);
            return new ResponseEntity<>(marathonRankingTopTen,
                HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(Collections.singletonList(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


}
