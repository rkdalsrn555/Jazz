package com.ssafy.jazz_backend.domain.enterprise.service;

import com.ssafy.jazz_backend.domain.enterprise.dto.DartApiResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.FinancialStatementsResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.entity.ComprehensiveIncome;
import com.ssafy.jazz_backend.domain.enterprise.entity.ComprehensiveIncomeId;
import com.ssafy.jazz_backend.domain.enterprise.entity.Enterprise;
import com.ssafy.jazz_backend.domain.enterprise.repository.CashFlowRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.ComprehensiveIncomeRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.EnterpriseRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.FinancialPositionRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.IncomeStatementRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FinancialStatementsServiceImpl implements FinancialStatementsService {


    @Autowired
    private EnterpriseRepository enterpriseRepository; // 기업 repository

    @Autowired
    private FinancialPositionRepository financialPositionRepository;

    @Autowired
    private IncomeStatementRepository incomeStatementRepository;

    @Autowired
    private CashFlowRepository cashFlowRepository;

    @Autowired
    private ComprehensiveIncomeRepository comprehensiveIncomeRepository;

    @Override
    public DartApiResponseDto fetchFinancialData(String corpCode, String bsnsYear,
        String enterpriseName) {

        final String API_URL =
            "https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json?crtfc_key=3667c2b5c230812adf01b162f26db7e0fa2e4af8&corp_code="
                + corpCode + "&bsns_year=" + bsnsYear + "&reprt_code=11011&fs_div=OFS";

        DartApiResponseDto response = new RestTemplate().getForObject(API_URL,
            DartApiResponseDto.class);

        // Validation of the response
        if (response == null || !"000".equals(response.getStatus())) {
            return null;
        }

        // Enterprise 엔터티에 저장
        Enterprise enterprise = new Enterprise();
        enterprise.setCode(corpCode);
        enterprise.setName(enterpriseName);
        enterprise.setRceptNo(response.getList().get(0).getRcept_no());
        enterpriseRepository.save(enterprise);

        // ComprehensiveIncome 엔터티에 저장
        for (FinancialStatementsResponseDto dto : response.getList()) {
            ComprehensiveIncome comprehensiveIncome = ComprehensiveIncome.builder()
                .id(new ComprehensiveIncomeId())
                .ord(Integer.parseInt(dto.getOrd()))
                .enterprise(enterprise)
                .accountName(dto.getAccount_nm())
                .thstrmName(dto.getThstrm_nm())
                .thAmount(
                    dto.getThstrm_amount() != null ? Long.parseLong(dto.getThstrm_amount()) : null)
                .frmtrmName(dto.getFrmtrm_nm())
                .frmAmount(
                    dto.getFrmtrm_amount() != null ? Long.parseLong(dto.getFrmtrm_amount()) : null)
                .build();

            comprehensiveIncomeRepository.save(comprehensiveIncome);
        }

        return response;
    }
}
