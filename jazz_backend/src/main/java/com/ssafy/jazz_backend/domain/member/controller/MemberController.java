package com.ssafy.jazz_backend.domain.member.controller;

import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginResponseDto;
import com.ssafy.jazz_backend.domain.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class MemberController {

    @Autowired
    MemberService memberService;

    @PostMapping
    public ResponseEntity<?> joinMember(@RequestBody JoinMemberRequestDto joinMemberRequestDto) {
        return new ResponseEntity<>(memberService.joinMember(joinMemberRequestDto), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        try {
            UserLoginResponseDto userLoginResponseDto = memberService.login(userLoginRequestDto);
            return new ResponseEntity<>(userLoginResponseDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
