package com.ssafy.jazz_backend.domain.enterprise.controller;
// 고유번호, 연도를 params로 받아 해당 재무제표를 각 db에 넣는 controller 입니다.

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

    @GetMapping("/fs/{corp_code}/{bsns_year}/{name}")
    ResponseEntity<?> insertFinancialStatement(@RequestHeader("accessToken") String accessToken,
        @PathVariable String name,
        @PathVariable String corp_code,
        @PathVariable String bsns_year) {
        String userUUID = jwtService.getInfo("account", accessToken);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
