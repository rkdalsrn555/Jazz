package com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FinancialTableResponseDto implements Comparable<FinancialTableResponseDto> {

    private Integer ord;
    private String sjNm;
    private String accountNm;
    private String thstrmNm;
    private Long thstrmAmount;
    private String frmtrmNm;
    private Long frmtrmAmount;

    public static FinancialTableResponseDto create(Integer ord, String sjNm, String accountNm,
        String thstrmNm, Long thstrmAmount, String frmtrmNm, Long frmtrmAmount) {

        return new FinancialTableResponseDto(ord, sjNm, accountNm, thstrmNm, thstrmAmount,
            frmtrmNm, frmtrmAmount);
    }

    //오름차순
    @Override
    public int compareTo(FinancialTableResponseDto o) {
        return this.ord - o.ord;
    }
}
