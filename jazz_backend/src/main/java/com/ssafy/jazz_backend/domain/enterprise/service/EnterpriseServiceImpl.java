package com.ssafy.jazz_backend.domain.enterprise.service;

import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseInfoResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseGraphResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseNameResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.FinancialTableResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.entity.CashFlow;
import com.ssafy.jazz_backend.domain.enterprise.entity.ComprehensiveIncome;
import com.ssafy.jazz_backend.domain.enterprise.entity.Enterprise;
import com.ssafy.jazz_backend.domain.enterprise.entity.FinancialGraph;
import com.ssafy.jazz_backend.domain.enterprise.entity.FinancialPosition;
import com.ssafy.jazz_backend.domain.enterprise.entity.IncomeStatement;
import com.ssafy.jazz_backend.domain.enterprise.repository.CashFlowJpaRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.ComprehensiveIncomeJpaRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.EnterpriseJpaRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.FinancialGraphJpaRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.FinancialPositionJpaRepository;
import com.ssafy.jazz_backend.domain.enterprise.repository.IncomeStatementJpaRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnterpriseServiceImpl implements EnterpriseService {

    private final EnterpriseJpaRepository enterpriseJpaRepository;
    private final FinancialGraphJpaRepository financialGraphJpaRepository;
    private final FinancialPositionJpaRepository financialPositionJpaRepository;
    private final IncomeStatementJpaRepository incomeStatementJpaRepository;
    private final ComprehensiveIncomeJpaRepository comprehensiveIncomeJpaRepository;
    private final CashFlowJpaRepository cashFlowJpaRepository;

    //표 명 상수 등록
    private static final String FP = "재무상태표";
    private static final String CI = "포괄손익계산서";
    private static final String CF = "현금흐름표";
    private static final String CE = "자본변동표";
    private static final String IS = "손익계산서";

    //기업명 검색 (유사한 사명 찾기)
    @Override
    public List<EnterpriseNameResponseDto> searchEnterpriseName(String accessToken,
        String enterpriseName) {
        //공백제거
        enterpriseName = enterpriseName.replace(" ", "");
        //이름으로 검색
        List<Enterprise> enterpriseList = enterpriseJpaRepository.findByNameContains(
            enterpriseName);
        //responseDtoList 생성
        List<EnterpriseNameResponseDto> responseDtoList = createEnterpriseNameResponseDtoList(
            enterpriseList);
        return responseDtoList;
    }

    //기업정보 검색(기업명 클릭)
    @Override
    public EnterpriseInfoResponseDto getEnterpriseInfo(String accessToken, Integer enterpriseId) {

        //enterpriseId에 맞는 enterprise 가져오기 없으면 에러
        Enterprise enterprise = findByEnterpriseId(enterpriseId);
        //enterpriseId를 기준으로 financialGraphList를 다 가져옴
        List<FinancialGraph> financialGraphList = financialGraphJpaRepository.findByEnterpriseId(
            enterpriseId);
        //responseDtoList 생성
        //가장 최근 totalAssets totalDebt totalCapital 를 알기위해 graphDtoList 를 채움
        List<EnterpriseGraphResponseDto> graphDtoList = createEnterpriseGraphResponseDtoList(
            financialGraphList, enterprise);
        //오름차순으로 sorting
        Collections.sort(graphDtoList);
        //가장 마지막 값 가져옴(이게 가장 최근임)
        EnterpriseGraphResponseDto graph = graphDtoList.get(graphDtoList.size()-1);

        //EnterpriseInfoResponseDto responseDto 구성
        EnterpriseInfoResponseDto responseDto = EnterpriseInfoResponseDto.create(
            enterprise.getId(), enterprise.getName(), graph.getTotalAssets(), graph.getTotalDebt(),
            graph.getTotalCapital());

        return responseDto;
    }

    //재무제표 그래프 검색(기업명 클릭)
    @Override
    public List<EnterpriseGraphResponseDto> getFinancialGraph(String accessToken,
        Integer enterpriseId) {

        //enterpriseId에 맞는 enterprise 가져오기 없으면 에러
        Enterprise enterprise = findByEnterpriseId(enterpriseId);

        //enterpriseId를 기준으로 financialGraphList를 다 가져옴
        List<FinancialGraph> financialGraphList = financialGraphJpaRepository.findByEnterpriseId(
            enterpriseId);

        //responseDtoList 생성
        List<EnterpriseGraphResponseDto> responseDtoList = createEnterpriseGraphResponseDtoList(
            financialGraphList, enterprise);

        // responseDtoList를 정렬
        Collections.sort(responseDtoList);

        return responseDtoList;
    }

    //손익계산서
    @Override
    public List<FinancialTableResponseDto> getIncomeStatement(String accessToken,
        Integer enterpriseId) {

        //enterpriseId에 맞는 enterprise 가져오기 없으면 에러
        Enterprise enterprise = enterpriseJpaRepository.findById(enterpriseId)
            .orElseThrow(() -> new NullPointerException(
                enterpriseId + " 해당 enterpriseId에 맞는 기업이 없습니다."));

        //enterpriseId에 맞는 손익계산서 가져오기
        List<IncomeStatement> incomeStatementList = incomeStatementJpaRepository.findByEnterpriseId(
            enterprise.getId());

        //responseDtoList 만들기
        List<FinancialTableResponseDto> responseDtoList = createFinancialTableResponseDtoListForIS(
            incomeStatementList, IS);

        //responseDtoList ord 기준으로 오름차순 정렬
        Collections.sort(responseDtoList);
        return responseDtoList;
    }
    
    //자본변동표 -> 일단 보류


    //재무상태표
    @Override
    public List<FinancialTableResponseDto> getFinancialPosition(String accessToken,
        Integer enterpriseId) {

        //enterpriseId에 맞는 enterprise 가져오기 없으면 에러
        Enterprise enterprise = enterpriseJpaRepository.findById(enterpriseId)
            .orElseThrow(() -> new NullPointerException(
                enterpriseId + " 해당 enterpriseId에 맞는 기업이 없습니다."));

        //enterpriseId에 맞는 재무상태표 가져오기
        List<FinancialPosition> financialPositionList =
            financialPositionJpaRepository.findByEnterpriseId(enterprise.getId());

        //responseDtoList 만들기
        List<FinancialTableResponseDto> responseDtoList = createFinancialTableResponseDtoListForFP(
            financialPositionList, FP);

        //responseDtoList ord 기준으로 오름차순 정렬
        Collections.sort(responseDtoList);
        return responseDtoList;
    }

    //포괄손익계산서
    @Override
    public List<FinancialTableResponseDto> getComprehensiveIncome(String accessToken,
        Integer enterpriseId) {

        //enterpriseId에 맞는 enterprise 가져오기 없으면 에러
        Enterprise enterprise = enterpriseJpaRepository.findById(enterpriseId)
            .orElseThrow(() -> new NullPointerException(
                enterpriseId + " 해당 enterpriseId에 맞는 기업이 없습니다."));

        //enterpriseId에 맞는 포괄손익계산서 가져오기
        List<ComprehensiveIncome> comprehensiveIncomeList =
            comprehensiveIncomeJpaRepository.findByEnterpriseId(enterprise.getId());

        //responseDtoList 만들기
        List<FinancialTableResponseDto> responseDtoList = createFinancialTableResponseDtoListForCI(
            comprehensiveIncomeList, CI);

        //responseDtoList ord 기준으로 오름차순 정렬
        Collections.sort(responseDtoList);
        return responseDtoList;
    }

    //현금흐름표
    @Override
    public List<FinancialTableResponseDto> getCashFlow(String accessToken, Integer enterpriseId) {

        //enterpriseId에 맞는 enterprise 가져오기 없으면 에러
        Enterprise enterprise = enterpriseJpaRepository.findById(enterpriseId)
            .orElseThrow(() -> new NullPointerException(
                enterpriseId + " 해당 enterpriseId에 맞는 기업이 없습니다."));

        //enterpriseId에 맞는 현금흐름표 가져오기
        List<CashFlow> cashFlowList = cashFlowJpaRepository.findByEnterpriseId(enterprise.getId());

        //responseDtoList 만들기
        List<FinancialTableResponseDto> responseDtoList = createFinancialTableResponseDtoListForCF(
            cashFlowList, CF);

        //responseDtoList ord 기준으로 오름차순 정렬
        Collections.sort(responseDtoList);
        return responseDtoList;
    }

    // =====================================================================================================
    // =====================================================================================================

    // 재무제표 그래프 검색(기업명 클릭) List<EnterpriseGraphResponseDto> responseDtoList 를 구성하는 메서드
    private List<EnterpriseGraphResponseDto> createEnterpriseGraphResponseDtoList(
        List<FinancialGraph> financialGraphList, Enterprise enterprise) {
        //responseDtoList 생성
        List<EnterpriseGraphResponseDto> responseDtoList = new ArrayList<>();

        //responseDtoList 구성
        for (FinancialGraph financialGraph : financialGraphList) {
            String pointTimeName = financialGraph.getId().getPointTimeName();
            //숫자 빼고 다 제거
            String cleandPointTimeName = pointTimeName.replaceAll("[^0-9]", "");
            //숫자 빼고 다 제거된거 Interger로 형변환
            Integer numberPointTime = Integer.parseInt(cleandPointTimeName);
            //responseDto 구성
            EnterpriseGraphResponseDto responseDto = EnterpriseGraphResponseDto.create(
                enterprise.getId(), enterprise.getName(), pointTimeName,
                numberPointTime, financialGraph.getTotalAssets(), financialGraph.getTotalDebt(),
                financialGraph.getTotalCapital(), financialGraph.getIncome(),
                financialGraph.getTotalComprehensiveIncome());
            //responseDtoList 에 add
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }

    // 기업명 검색 (유사한 사명 찾기) List<EnterpriseNameResponseDto> responseDtoList 를 구성하는 메서드
    private List<EnterpriseNameResponseDto> createEnterpriseNameResponseDtoList(
        List<Enterprise> enterpriseList) {
        List<EnterpriseNameResponseDto> responseDtoList = new ArrayList<>();
        //respneseDtoList add
        for (Enterprise enterprise : enterpriseList) {
            EnterpriseNameResponseDto responseDto = EnterpriseNameResponseDto.create(
                enterprise.getId(), enterprise.getName());
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }

    // enterpriseId 로 Enterprise 찾기
    private Enterprise findByEnterpriseId(Integer enterpriseId) {

        return enterpriseJpaRepository.findById(enterpriseId)
            .orElseThrow(() -> new IllegalArgumentException(
                enterpriseId + " 해당 enterpriseId에 맞는 기업이 없습니다."));
    }

    //재무제표 responseDtoList 만들기
    private List<FinancialTableResponseDto> createFinancialTableResponseDtoListForFP(
        List<FinancialPosition> financialPositionList, String tableName) {

        List<FinancialTableResponseDto> responseDtoList = new ArrayList<>();
        for (FinancialPosition financialPosition : financialPositionList) {
            FinancialTableResponseDto responseDto = FinancialTableResponseDto.create(
                financialPosition.getOrd(), tableName, financialPosition.getAccountName(),
                financialPosition.getThstrmName(), financialPosition.getThAmount(),
                financialPosition.getFrmtrmName(), financialPosition.getFrmAmount());
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }

    //손익계산서 responseDtoList 만들기
    private List<FinancialTableResponseDto> createFinancialTableResponseDtoListForIS(
        List<IncomeStatement> incomeStatementList, String tableName) {

        List<FinancialTableResponseDto> responseDtoList = new ArrayList<>();
        for (IncomeStatement incomeStatement : incomeStatementList) {
            FinancialTableResponseDto responseDto = FinancialTableResponseDto.create(
                incomeStatement.getOrd(), tableName, incomeStatement.getAccountName(),
                incomeStatement.getThstrmName(), incomeStatement.getThAmount(),
                incomeStatement.getFrmtrmName(), incomeStatement.getFrmAmount());
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }


    //포괄손익계산서 responseDtoList 만들기
    private List<FinancialTableResponseDto> createFinancialTableResponseDtoListForCI(
        List<ComprehensiveIncome> comprehensiveIncomeList, String tableName) {

        List<FinancialTableResponseDto> responseDtoList = new ArrayList<>();
        for (ComprehensiveIncome comprehensiveIncome : comprehensiveIncomeList) {
            FinancialTableResponseDto responseDto = FinancialTableResponseDto.create(
                comprehensiveIncome.getOrd(), tableName,
                comprehensiveIncome.getAccountName(),
                comprehensiveIncome.getThstrmName(), comprehensiveIncome.getThAmount(),
                comprehensiveIncome.getFrmtrmName(), comprehensiveIncome.getFrmAmount());
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }

    //현금흐름표 responseDtoList 만들기
    private List<FinancialTableResponseDto> createFinancialTableResponseDtoListForCF(
        List<CashFlow> cashFlowList, String tableName) {

        List<FinancialTableResponseDto> responseDtoList = new ArrayList<>();
        for (CashFlow cashFlow : cashFlowList) {
            FinancialTableResponseDto responseDto = FinancialTableResponseDto.create(
                cashFlow.getOrd(), tableName,
                cashFlow.getAccountName(),
                cashFlow.getThstrmName(), cashFlow.getThAmount(),
                cashFlow.getFrmtrmName(), cashFlow.getFrmAmount());
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }

}
