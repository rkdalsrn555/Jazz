package com.ssafy.jazz_backend.domain.enterprise.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FinancialStatementsResponseDto {

    private String rceptNo;
    private String reprtCode;
    private String bsnsYear;
    private String corpCode;
    private String sjDiv;
    private String sjNm;
    private String accountId;
    private String accountNm;
    private String accountDetail;
    private String thstrmNm;
    private String thstrmAmount;
    private String frmtrmNm;
    private String frmtrmAmount;
    private String bfefrmtrmNm;
    private String bfefrmtrmAmount;
    private String ord;
    private String currency;
}
