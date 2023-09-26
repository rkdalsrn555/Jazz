package com.ssafy.jazz_backend.domain.quiz.controller;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.quiz.dto.InsertChoiceRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.InsertExplanationRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.InsertQuizRequestDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Explanation;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.service.InsertServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/insert")
public class InsertController {

    @Autowired
    private InsertServiceImpl insertServiceImpl;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/quiz")
    public ResponseEntity<?> insertQuiz(@RequestHeader("accessToken") String accessToken,
        @RequestBody InsertQuizRequestDto requestDto) {
        Quiz savedQuiz = insertServiceImpl.insertQuiz(requestDto);
        return ResponseEntity.ok(savedQuiz);
    }

    @PostMapping("/choice")
    public ResponseEntity<?> insertChoice(@RequestHeader("accessToken") String accessToken,
        @RequestBody InsertChoiceRequestDto requestDto) {
        Choice savedChoice = insertServiceImpl.insertChoice(requestDto);
        return ResponseEntity.ok(savedChoice);
    }

    @PostMapping("/explanation")
    public ResponseEntity<?> insertExplanation(
        @RequestHeader("accessToken") String accessToken,
        @RequestBody InsertExplanationRequestDto requestDto) {
        Explanation savedExplanation = insertServiceImpl.insertExplanation(requestDto);
        return ResponseEntity.ok(savedExplanation);
    }
}
