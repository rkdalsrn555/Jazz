package com.ssafy.jazz_backend.domain.quiz.controller;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.GetAllBookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.service.BookmarkService;
import com.ssafy.jazz_backend.domain.quiz.service.GetAllBookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

    @Autowired
    private GetAllBookmarkService getAllBookmarkService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public GetAllBookmarkResponseDto getAllBookmark(
        @RequestHeader("accessToken") String accessToken) {
        String userUUID = jwtService.getInfo("account", accessToken);
        return (GetAllBookmarkResponseDto) getAllBookmarkService.getAllBookmark(userUUID);
    }


}