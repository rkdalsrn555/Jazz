package com.ssafy.jazz_backend.domain.member.dto;

import com.ssafy.jazz_backend.domain.item.entity.ItemManagement;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModifyCharacterResponseDto {
    private int characterId;
    private List<ItemManagement> ableCharacterList;
}
