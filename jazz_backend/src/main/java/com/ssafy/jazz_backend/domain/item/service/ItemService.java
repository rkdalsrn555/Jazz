package com.ssafy.jazz_backend.domain.item.service;

import com.ssafy.jazz_backend.domain.item.dto.CharacterListResponseDto;
import com.ssafy.jazz_backend.domain.item.dto.CharacterPaymentResponseDto;

public interface ItemService {
    CharacterListResponseDto getAllCharacter(String accessToken);
    CharacterPaymentResponseDto takeCharacter(String accessToken, int itemId);
}
