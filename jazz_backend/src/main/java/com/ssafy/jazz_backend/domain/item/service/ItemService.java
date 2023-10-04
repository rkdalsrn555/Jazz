package com.ssafy.jazz_backend.domain.item.service;

import com.ssafy.jazz_backend.domain.item.dto.CharacterListResponseDto;
import com.ssafy.jazz_backend.domain.item.dto.CharacterPaymentResponseDto;
import com.ssafy.jazz_backend.global.error.exception.NotEnoughDiamondException;

public interface ItemService {
    CharacterListResponseDto getAllCharacter(String accessToken);
    CharacterListResponseDto takeCharacter(String accessToken, int itemId) throws NotEnoughDiamondException;
}
