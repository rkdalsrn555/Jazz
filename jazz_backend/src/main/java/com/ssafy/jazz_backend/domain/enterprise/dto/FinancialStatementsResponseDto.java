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

    private String rcept_no;
    private String reprt_code;
    private String bsns_year;
    private String corp_code;
    private String sj_div;
    private String sj_nm;
    private String account_id;
    private String account_nm;
    private String account_detail;
    private String thstrm_nm;
    private String thstrm_amount;
    private String frmtrm_nm;
    private String frmtrm_amount;
    private String bfefrmtrm_nm;
    private String bfefrmtrm_amount;
    private String ord;
    private String currency;
}
