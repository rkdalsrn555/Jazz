package com.ssafy.jazz_backend.domain.dictionary.service;

import com.ssafy.jazz_backend.domain.dictionary.dto.DictionaryResponseDto;

public interface DictionaryService {
    DictionaryResponseDto findWord(String word);
}
