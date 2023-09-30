package com.ssafy.jazz_backend.domain.item.dto;

import com.ssafy.jazz_backend.domain.item.entity.Item;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CharacterListResponseDto {
    private List<Item> data;
    private int diamond;
}
