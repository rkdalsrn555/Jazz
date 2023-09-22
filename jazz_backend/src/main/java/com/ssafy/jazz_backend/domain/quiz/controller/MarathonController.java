package com.ssafy.jazz_backend.domain.quiz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController("quiz/marathon")
public class MarathonController {

    @GetMapping
    private ResponseEntity<?> getMarathonQuiz(@RequestHeader("accessToken") String accessToken) {
        
        return null;
    }
}
