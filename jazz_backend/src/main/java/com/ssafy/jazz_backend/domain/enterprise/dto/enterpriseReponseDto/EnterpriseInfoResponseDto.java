package com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class EnterpriseInfoResponseDto {

    private Integer id;
    private String name;
    private Long totalAssets;
    private Long totalDebt;
    private Long totalCapital;

    public static EnterpriseInfoResponseDto create(Integer id, String name, Long totalAssets,
        Long totalDebt, Long totalCapital) {
        return new EnterpriseInfoResponseDto(id, name, totalAssets, totalDebt, totalCapital);
    }
}
