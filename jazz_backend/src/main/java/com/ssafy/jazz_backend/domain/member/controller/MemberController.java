package com.ssafy.jazz_backend.domain.member.controller;

import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class MemberController {
    @Autowired
    MemberService memberService;

    @PostMapping
    public ResponseEntity<?> joinMember(@RequestBody JoinMemberRequestDto joinMemberRequestDto) {
        memberService.joinMember(joinMemberRequestDto);
        return null;

    }

    @GetMapping("/duplicate/")
    public ResponseEntity<?> duplicateCheckId(@RequestParam(name = "userId") String userId) {
        DuplicatedCheckIdRequestDto duplicatedCheckIdRequestDto = new DuplicatedCheckIdRequestDto(userId);
        DuplicatedCheckIdResponseDto duplicatedCheckIdResponseDto =
                memberService.duplicatedCheckId(duplicatedCheckIdRequestDto);

        if (duplicatedCheckIdResponseDto.isDuplicated()) {
            // 중복이 없는 것
            return new ResponseEntity<>(duplicatedCheckIdResponseDto, HttpStatus.OK);
        } else {
            // 중복이 있는 것
            // 근데 중복이 있는게 BAD_REQUEST 인가
            return new ResponseEntity<>(duplicatedCheckIdResponseDto, HttpStatus.BAD_REQUEST);
        }
    }
}
