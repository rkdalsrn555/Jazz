package com.ssafy.jazz_backend.domain.news.controller;

import com.ssafy.jazz_backend.domain.news.dto.NewsCrawlingRequestDto;
import com.ssafy.jazz_backend.domain.news.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/news")
@RestController
public class NewsController {

    @Autowired
    NewsService newsService;

    @GetMapping("/{enterpriseName}")
    public ResponseEntity<?> newsSummary(
        @PathVariable(name = "enterpriseName") String enterpriseName,
        @RequestHeader(name = "accessToken") String accessToken) {
        try {
            newsService.newsCrawling(
                NewsCrawlingRequestDto.builder()
                    .enterpriseName(enterpriseName)
                    .accessToken(accessToken)
                    .build());
            return null;
        } catch(Exception e) {
            return null;
        }
    }
}
