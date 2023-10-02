package com.ssafy.jazz_backend.domain.enterprise.service;

import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseInfoResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseGraphResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseNameResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.FinancialTableResponseDto;
import java.util.List;

public interface EnterpriseService {

    List<EnterpriseNameResponseDto> searchEnterpriseName(String accessToken, String enterpriseName);

    EnterpriseInfoResponseDto getEnterpriseInfo(String accessToken, Integer enterpriseId);

    List<EnterpriseGraphResponseDto> getFinancialGraph(String accessToken, Integer enterpriseId);

    List<FinancialTableResponseDto> getIncomeStatement(String accessToken,
        Integer enterpriseId);

    List<FinancialTableResponseDto> getFinancialPosition(String accessToken,
        Integer enterpriseId);

    List<FinancialTableResponseDto> getComprehensiveIncome(String accessToken,
        Integer enterpriseId);

    List<FinancialTableResponseDto> getCashFlow(String accessToken,
        Integer enterpriseId);


}
