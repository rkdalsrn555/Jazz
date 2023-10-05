package com.ssafy.jazz_backend.domain.dictionary.controller;

import com.ssafy.jazz_backend.domain.dictionary.dto.DictionaryResponseDto;
import com.ssafy.jazz_backend.domain.dictionary.service.DictionaryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/dictionary")
public class DictionaryController {

    private final DictionaryServiceImpl dictionaryService;

    @GetMapping
    public ResponseEntity<DictionaryResponseDto> getWord(@RequestHeader("accessToken") String accessToken, @RequestParam String word) {
        DictionaryResponseDto dictionaryResponseDto = dictionaryService.findWord(word);
        return new ResponseEntity<>(dictionaryResponseDto, HttpStatus.OK);
    }
}
