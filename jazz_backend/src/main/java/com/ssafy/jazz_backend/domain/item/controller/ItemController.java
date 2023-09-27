package com.ssafy.jazz_backend.domain.item.controller;

import com.ssafy.jazz_backend.domain.item.dto.CharacterListResponseDto;
import com.ssafy.jazz_backend.domain.item.dto.CharacterPaymentResponseDto;
import com.ssafy.jazz_backend.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/store")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<CharacterListResponseDto> getCharacterList(@RequestHeader("accessToken") String accessToken) {
        CharacterListResponseDto characterListResponseDto = itemService.getAllCharacter(accessToken);
        return new ResponseEntity<>(characterListResponseDto, HttpStatus.OK);
    }

    @PatchMapping("/character/{itemId}")
    public ResponseEntity<CharacterPaymentResponseDto> characterPayment(@RequestHeader("accessToken") String accessToken, @PathVariable int itemId) {
        CharacterPaymentResponseDto characterPaymentResponseDto = itemService.takeCharacter(accessToken, itemId);
        return new ResponseEntity<>(characterPaymentResponseDto, HttpStatus.OK);
    }

}
