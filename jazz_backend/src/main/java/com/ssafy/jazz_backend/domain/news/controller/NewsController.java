package com.ssafy.jazz_backend.domain.news.controller;

import com.ssafy.jazz_backend.domain.news.dto.NewsCrawlingRequestDto;
import com.ssafy.jazz_backend.domain.news.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequestMapping("/news")
@RestController
public class NewsController {

    @Autowired
    NewsService newsService;

    @GetMapping(value = "/{enterpriseName}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> newsSummary(
        @PathVariable(name = "enterpriseName") String enterpriseName,
        @RequestHeader(name = "accessToken") String accessToken) {
        try {
            SseEmitter returnEmitter = newsService.newsCrawling(
                NewsCrawlingRequestDto.builder()
                    .enterpriseName(enterpriseName)
                    .accessToken(accessToken)
                    .build());
            return new ResponseEntity<SseEmitter>(returnEmitter, HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }
}
