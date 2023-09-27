package com.ssafy.jazz_backend.domain.item.title.controller;

import com.ssafy.jazz_backend.domain.item.title.service.TitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store")
public class TitleController {

    private final TitleService titleService;

    @PatchMapping("/title")
    public ResponseEntity<String> getRandomTitle(@RequestHeader("accessToken") String accessToken) {
        String title = titleService.randomTitleServ(accessToken);
        return new ResponseEntity<>(title, HttpStatus.OK);
    }

}
