package com.ssafy.jazz_backend.domain.enterprise.controller;

import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseGraphResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseInfoResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.EnterpriseNameResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto.FinancialTableResponseDto;
import com.ssafy.jazz_backend.domain.enterprise.service.EnterpriseService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enterprise")
@RequiredArgsConstructor
@Slf4j
public class EnterpriseController {

    private final EnterpriseService enterpriseService;

    //기업명 검색 (유사한 사명 찾기)
    @GetMapping
    private ResponseEntity<?> searchEnterpriseName(
        @RequestHeader("accessToken") String accessToken,
        @RequestParam("enterpiseName") String enterpiseName) {

        List<EnterpriseNameResponseDto> responseDtoList = enterpriseService.searchEnterpriseName(
            accessToken,
            enterpiseName);

        if (responseDtoList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }

    //기업정보 검색(기업명 클릭)
    @GetMapping("/info")
    private ResponseEntity<?> getEnterpriseInfo(
        @RequestHeader("accessToken") String accessToken,
        @RequestParam("enterpriseId") Integer enterpiseId) {
        try {
            EnterpriseInfoResponseDto responseDto = enterpriseService.getEnterpriseInfo(accessToken,
                enterpiseId);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    //재무제표 그래프 검색(기업명 클릭)
    @GetMapping("/graph")
    private ResponseEntity<?> getFinancialGraph(String accessToken,
        @RequestParam("enterpriseId") Integer enterpriseId) {
        try {
            List<EnterpriseGraphResponseDto> responseDtoList = enterpriseService.getFinancialGraph(
                accessToken, enterpriseId);
            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    //뉴스 요약 정보

    //손익계산서
    @GetMapping("/income-statement/{enterpriseId}")
    private ResponseEntity<?> getIncomeStatement(@RequestHeader("accessToken") String accessToken,
        @PathVariable Integer enterpriseId) {
        System.out.println(enterpriseId);
        try {
            List<FinancialTableResponseDto> responseDtoList = enterpriseService.getIncomeStatement(
                accessToken, enterpriseId);
            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    //자본변동표 -> 보류

    //재무상태표
    @GetMapping("/financial-position/{enterpriseId}")
    private ResponseEntity<?> getFinancialPosition(@RequestHeader("accessToken") String accessToken,
        @PathVariable Integer enterpriseId) {
        try {
            List<FinancialTableResponseDto> responseDtoList = enterpriseService.getFinancialPosition(
                accessToken, enterpriseId);

            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    //포괄손익계산서
    @GetMapping("/comprehensive-income/{enterpriseId}")
    private ResponseEntity<?> getComprehensiveIncome(
        @RequestHeader("accessToken") String accessToken,
        @PathVariable Integer enterpriseId) {
        try {
            List<FinancialTableResponseDto> responseDtoList = enterpriseService.getComprehensiveIncome(
                accessToken, enterpriseId);
            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    //현금흐름표
    @GetMapping("/cash-flow/{enterpriseId}")
    private ResponseEntity<?> getCashFlow(@RequestHeader("accessToken") String accessToken,
        @PathVariable Integer enterpriseId) {
        try {
            List<FinancialTableResponseDto> responseDtoList = enterpriseService.getCashFlow(
                accessToken, enterpriseId);
            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        } catch (Exception e) {
            log.info(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

}
