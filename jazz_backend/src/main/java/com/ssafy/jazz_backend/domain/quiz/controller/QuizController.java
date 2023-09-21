package com.ssafy.jazz_backend.domain.quiz.controller;


import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.quiz.dto.AddToQuizManagementResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizCorrectionRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizStatsResponseDto;
import com.ssafy.jazz_backend.domain.quiz.service.AddToQuizManagementService;
import com.ssafy.jazz_backend.domain.quiz.service.QuizCorrectionService;
import com.ssafy.jazz_backend.domain.quiz.service.QuizService;
import com.ssafy.jazz_backend.domain.quiz.service.QuizStatsService;
import org.checkerframework.checker.units.qual.A;
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

    @Autowired
    private JwtService jwtService;

    @Autowired
    private QuizCorrectionService quizCorrectionService;

    @Autowired
    private QuizStatsService quizStatsService;

    @GetMapping("/{kind}")
    private ResponseEntity<?> getQuizByKind(@RequestHeader("accessToken") String accessToken,
        @PathVariable int kind) {
        String userUUID = jwtService.getInfo("account", accessToken);

        List<?> quizzes = quizService.getQuizByKind(userUUID, kind);
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @Autowired
    private AddToQuizManagementService addToQuizManagementService;

    @PutMapping("/management/{quizId}")
    public ResponseEntity<?> addToQuizManagement(@RequestHeader("accessToken") String accessToken,
        @PathVariable int quizId) {
        String userUUID = jwtService.getInfo("account", accessToken);

        // 여기에서 'result' 변수를 선언하고 초기화합니다.
        AddToQuizManagementResponseDto result = addToQuizManagementService.addToQuizManagement(
            userUUID, quizId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/management/stats")
    public ResponseEntity<?> quizStats(@RequestHeader("accessToken") String accessToken) {
        String userUUID = jwtService.getInfo("account", accessToken);

        QuizStatsResponseDto result = quizStatsService.quizStats(userUUID);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping("/correction")
    public ResponseEntity<?> updateCorrection(
        @RequestHeader("accessToken") String accessToken,
        @RequestBody QuizCorrectionRequestDto requestDto) {
        String userUUID = jwtService.getInfo("account", accessToken);
        quizCorrectionService.updateIsCorrect(userUUID, requestDto.getQuizId(),
            requestDto.getIsCorrect());

        return ResponseEntity.ok().build();
    }
}

