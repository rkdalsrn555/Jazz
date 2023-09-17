package com.ssafy.jazz_backend.domain.quiz.controller;

import com.ssafy.jazz_backend.domain.quiz.dto.QuizDto;
import com.ssafy.jazz_backend.domain.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("/{kind}")
    public ResponseEntity<?> getQuizByKind(@PathVariable int kind, @RequestHeader("accessToken") String accessToken) {
        // accessToken 검증 어케함

        List<?> quizzes = quizService.getQuizByKind(kind);
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }
}

