package com.ssafy.jazz_backend.domain.enterprise.service;

import com.ssafy.jazz_backend.domain.enterprise.dto.DartApiResponseDto;

public interface FinancialStatementsService {

    void fetchFinancialData(String bsnsYear);
}
