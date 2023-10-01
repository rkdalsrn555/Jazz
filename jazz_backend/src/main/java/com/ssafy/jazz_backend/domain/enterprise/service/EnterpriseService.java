package com.ssafy.jazz_backend.domain.enterprise.service;

import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseInfoResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseGraphResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseNameResponseDto;
import java.util.List;

public interface EnterpriseService {

    List<EnterpriseNameResponseDto> searchEnterpriseName(String accessToken, String enterpriseName);

    EnterpriseInfoResponseDto getEnterpriseInfo(String accessToken, Integer enterpriseId);

    List<EnterpriseGraphResponseDto> getFinancialGraph(String accessToken, Integer enterpriseId);

}
