package com.ssafy.jazz_backend.domain.member.record.controller;


import com.ssafy.jazz_backend.domain.member.record.dto.LevelRankingResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ranking")
public class RankingController {

    //update가 일어나면 바로 redis에 값 넣고 db에도 바꿔줌
    @GetMapping("/level")
    private ResponseEntity<LevelRankingResponseDto> getLevelRankingTopTen() {

        return null;
    }

}