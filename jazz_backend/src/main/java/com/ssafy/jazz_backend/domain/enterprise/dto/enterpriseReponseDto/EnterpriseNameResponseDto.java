package com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EnterpriseNameResponseDto {

    //기업명 검색 (유사한 사명 찾기)
    private Integer id;
    private String name;

    public static EnterpriseNameResponseDto create(Integer id, String name) {
        return new EnterpriseNameResponseDto(id, name);
    }
}
