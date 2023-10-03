package com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EnterpriseNameResponseDto {

    //기업명 검색 (유사한 사명 찾기)
    private Integer id;
    private String name;

    public static EnterpriseNameResponseDto create(Integer id, String name) {
        return new EnterpriseNameResponseDto(id, name);
    }
}
