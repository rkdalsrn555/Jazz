package com.ssafy.jazz_backend.domain.quiz.controller;


import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.quiz.dto.AddToQuizManagementResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationCorrectAnswerRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationCorrectAnswerResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationWrongAnswerRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.ExplanationWrongAnswerResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizCorrectionRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizResultResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.QuizStatsResponseDto;
import com.ssafy.jazz_backend.domain.quiz.service.AddToQuizManagementService;
import com.ssafy.jazz_backend.domain.quiz.service.BookmarkService;
import com.ssafy.jazz_backend.domain.quiz.service.ExplanationService;
import com.ssafy.jazz_backend.domain.quiz.service.QuizCorrectionService;
import com.ssafy.jazz_backend.domain.quiz.service.QuizResultService;
import com.ssafy.jazz_backend.domain.quiz.service.QuizService;
import com.ssafy.jazz_backend.domain.quiz.service.QuizStatsService;
import java.util.Collections;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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

    @Autowired
    private BookmarkService bookmarkService;

    @Autowired
    private QuizResultService quizResultService;

    @Autowired
    private ExplanationService explanationService;

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


    @PatchMapping("/bookmark/registration")
    public BookmarkResponseDto registerBookmark(@RequestHeader("accessToken") String accessToken,
        @RequestBody BookmarkRequestDto request) {
        String userUUID = jwtService.getInfo("account", accessToken);
        return bookmarkService.registerBookmark(userUUID, request);
    }

    @PatchMapping("/bookmark/release")
    public BookmarkResponseDto releaseBookmark(@RequestHeader("accessToken") String accessToken,
        @RequestBody BookmarkRequestDto request) {
        String userUUID = jwtService.getInfo("account", accessToken);
        return bookmarkService.releaseBookmark(userUUID, request);
    }

    @PatchMapping("/result")
    private ResponseEntity<?> getQuizResult(@RequestHeader("accessToken") String accessToken,
        @RequestBody QuizResultRequestDto request) {
        try {
            QuizResultResponseDto quizResult = quizResultService.getQuizResult(accessToken,
                request);
            return new ResponseEntity<QuizResultResponseDto>(quizResult, HttpStatus.OK);
        } catch (Exception e) {
            log.info("에러 발생 : " + e.getMessage());
            return new ResponseEntity<>(
                Collections.singletonList(e.getMessage()), HttpStatus.BAD_REQUEST);
        }


    }

    @GetMapping("/explanation/correct-answer/{quizId}")
    private ExplanationCorrectAnswerResponseDto getCorrectExplanation(
        @RequestHeader("accessToken") String accessToken,
        @PathVariable int quizId) {
        String userUUID = jwtService.getInfo("account", accessToken);
        ExplanationCorrectAnswerRequestDto request = new ExplanationCorrectAnswerRequestDto(quizId);
        return explanationService.getCorrectExplanation(userUUID, request);
    }

    @GetMapping("/explanation/wrong-answer/{quizId}")
    private ExplanationWrongAnswerResponseDto getWrongExplanation(
        @RequestHeader("accessToken") String accessToken,
        @PathVariable int quizId,
        @RequestParam("wrongContent") String wrongContent) {

        String userUUID = jwtService.getInfo("account", accessToken);

        ExplanationWrongAnswerRequestDto request = new ExplanationWrongAnswerRequestDto(quizId,
            wrongContent);
        return explanationService.getWrongExplanation(userUUID, request);
    }

}

