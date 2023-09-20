package com.ssafy.jazz_backend.domain.member.service.serviceImpl;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.UserLoginResponseDto;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.entity.Token;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.domain.member.repository.TokenRepository;
import com.ssafy.jazz_backend.domain.member.service.MemberService;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ProfileRepository profileRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    TokenRepository tokenRepository;

    @Override
    public JoinMemberResponseDto joinMember(JoinMemberRequestDto joinMemberRequestDto) {
        String userId = joinMemberRequestDto.getUserId();
        String nickname = joinMemberRequestDto.getNickname();
        String pw = joinMemberRequestDto.getPw();

        // 비밀번호 hashing 및 salt하기
        String[] pwSalt = hashingPw(pw);

        // UUID 생성
        String id = makeUUID();

        // member 객체 생성
        Member member = Member.builder()
            .userId(userId)
            .salt(pwSalt[1])
            .pw(pwSalt[0])
            .id(id)
            .build();

        // profile 객체 생성
        Profile profile = Profile.builder()
            .member(member)
            .memberId(member.getId())
            .nickname(nickname)
            .diamond(0)
            .build();

        // member table에 저장해줌
        memberRepository.save(member);

        // profile table에 저장
        profileRepository.save(profile);

        return JoinMemberResponseDto
            .builder()
            .message("회원가입 성공")
            .build();
    }

    @Override
    public UserLoginResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        /*
                절차
            1. 아이디가 있는지 확인
            => 없다면 예외 발생 후 종료
            2. 비번이 맞는지 확인
            => 틀리다면 예외 발생 후 종료
            3. accessToken과 refreshToken 발급
         */
        String userId = userLoginRequestDto.getUserId();
        String userPw = userLoginRequestDto.getPw();
        Member member = memberRepository.findByUserId(userId).orElse(null);

        if (member == null) {
            // 아이디가 없는 경우
            throw new NullPointerException();
        }
        if (!hashingPw(userPw, member.getSalt()).equals(member.getPw())) {
            // 비번 틀림
            throw new NullPointerException();
        }

        // Token 발급
        String accessToken = jwtService.createAccessToken("account", member.getId());
        String refreshToken = jwtService.createRefreshToken("account", member.getId());

        // member랑 memberId를 둘 다 저장해줘야함
        // 안 그러면 아래의 에러가 뜸
        // A different object with the same identifier value was already associated with the session
        Token token = Token.builder()
            .refreshToken(refreshToken)
            .member(member)
            .memberId(member.getId())
            .build();

        tokenRepository.save(token);

        return UserLoginResponseDto.builder()
            .userId(userId)
            .pw(userPw)
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    String[] hashingPw(String pw) {
        String salt = getSalt();
        String newPw = getEncrypt(pw, salt);

        return new String[]{newPw, salt};
    }

    /*
        입력으로 들어오는 비밀번호 해싱해서 DB에 있는 것과 같은지 확인하기
     */
    String hashingPw(String pw, String salt) {
        return getEncrypt(pw, salt);
    }

    String getSalt() {
        // 랜덤 객체 생성
        SecureRandom r = new SecureRandom();
        byte[] salt = new byte[20];

        // 난수 생성
        r.nextBytes(salt);

        // 바이트를 문자열로 변경
        StringBuffer sb = new StringBuffer();
        for (byte b : salt) {
            sb.append(String.format("%02x", b));
        }

        return sb.toString();
    }

    // 해싱 해주는 메소드
    String getEncrypt(String pw, String salt) {
        String result = "";

        try {
            // SHA256 알고리즘 객체 생성
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // pw + salt 한 문자 SHA256 적용
            md.update((pw + salt).getBytes());
            byte[] pwSalt = md.digest();

            // 바이트를 문자열로
            StringBuffer sb = new StringBuffer();
            for (byte b : pwSalt) {
                sb.append(String.format("%02x", b));
            }

            result = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return result;
    }

    String makeUUID() {
        return UUID.randomUUID().toString();
    }

}
