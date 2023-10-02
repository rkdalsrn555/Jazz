package com.ssafy.jazz_backend.domain.enterprise.controller;
// 고유번호, 연도를 params로 받아 해당 재무제표를 각 db에 넣는 controller 입니다.

import com.ssafy.jazz_backend.domain.enterprise.service.FinancialStatementsService;
import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FinancialStatementsController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private FinancialStatementsService financialStatementsService;

    @GetMapping("/fs/{corpCode}/{bsnsYear}/{enterpriseName}")
    ResponseEntity<?> insertFinancialStatement(@RequestHeader("accessToken") String accessToken,
        @PathVariable String enterpriseName,
        @PathVariable String corpCode,
        @PathVariable String bsnsYear) {
        String userUUID = jwtService.getInfo("account", accessToken);
        financialStatementsService.fetchFinancialData(corpCode, bsnsYear, enterpriseName);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
