package com.ssafy.jazz_backend.domain.quiz.controller;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quiz/bookmark")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;

    @Autowired
    private JwtService jwtService;

    @PatchMapping("/registration")
    public BookmarkResponseDto registerBookmark(@RequestHeader("accessToken") String accessToken,
        @RequestBody BookmarkRequestDto request) {
        String userUUID = jwtService.getInfo("account", accessToken);
        return bookmarkService.registerBookmark(userUUID, request);
    }

    @PatchMapping("/release")
    public BookmarkResponseDto releaseBookmark(@RequestHeader("accessToken") String accessToken,
        @RequestBody BookmarkRequestDto request) {
        String userUUID = jwtService.getInfo("account", accessToken);
        return bookmarkService.releaseBookmark(userUUID, request);
    }

}