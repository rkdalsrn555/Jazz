package com.ssafy.jazz_backend.domain.dictionary.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DictionaryResponseDto {
    private int dictionarySize;
    private List<DictionaryItem> dictionaryItems;
}
