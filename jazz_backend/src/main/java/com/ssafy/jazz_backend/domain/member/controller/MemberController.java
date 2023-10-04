package com.ssafy.jazz_backend.domain.member.controller;

import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedNicknameRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.ModifyNicknameRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.MyProfileInfoResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.TokenReIssueRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.TokenReIssueResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLogoutRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLogoutResponseDto;
import com.ssafy.jazz_backend.domain.member.service.MemberService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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

    @PostMapping("/token")
    public ResponseEntity<?> reIssueToken(@RequestHeader("refreshToken") String refreshToken) {
        // 토큰 재 발급 요청
        try {
            TokenReIssueResponseDto reIssueResponseDto = memberService.reIssue(
                TokenReIssueRequestDto
                    .builder()
                    .refreshToken(refreshToken)
                    .build()
            );
            return new ResponseEntity<>(reIssueResponseDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("accessToken") String accessToken) {
        UserLogoutRequestDto userLogoutRequestDto = UserLogoutRequestDto
            .builder()
            .accessToken(accessToken)
            .build();
        try {
            UserLogoutResponseDto userLogoutResponseDto = memberService.logout(
                userLogoutRequestDto);
            return new ResponseEntity<>(userLogoutResponseDto, HttpStatus.OK);
        } catch (NullPointerException npe) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/duplicate/{userId}")
    public ResponseEntity<?> duplicateCheckId(@PathVariable(name = "userId") String userId) {
        DuplicatedCheckIdRequestDto duplicatedCheckIdRequestDto = new DuplicatedCheckIdRequestDto(
            userId);
        DuplicatedCheckIdResponseDto duplicatedCheckIdResponseDto =
            memberService.duplicatedCheckId(duplicatedCheckIdRequestDto);

        return new ResponseEntity<>(duplicatedCheckIdResponseDto, HttpStatus.OK);
    }

    @PatchMapping("/nickname")
    public ResponseEntity<?> modifyNickname(@RequestHeader("accessToken") String accessToken,
        @RequestBody ModifyNicknameRequestDto modifyNicknameRequestDto) {
        System.out.println(accessToken);
        try {
            return new ResponseEntity<>(
                memberService.modifyNickname(modifyNicknameRequestDto, accessToken), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> duplicatedNicknameCheck(@PathVariable("nickname") String nickname) {
        // 리턴이 false가 중복을 안한다는 것
        // 리턴이 true면 중복한다는 것임
        return new ResponseEntity<>(
            memberService.duplicatedNicknameCheck(DuplicatedNicknameRequestDto
                .builder()
                .nickname(nickname)
                .build()
            ), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> viewMyProfile(@RequestHeader("accessToken") String accessToken) {
        MyProfileInfoResponseDto myProfileInfoResponseDto = memberService.getProfile(accessToken);
        return new ResponseEntity<>(myProfileInfoResponseDto, HttpStatus.OK);
    }

}
