package com.ssafy.jazz_backend.domain.member.service;

import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdRequestDto;
import com.ssafy.jazz_backend.domain.member.dto.DuplicatedCheckIdResponseDto;
import com.ssafy.jazz_backend.domain.member.dto.JoinMemberRequestDto;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.UUID;

@Service
public class MemberService {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ProfileRepository profileRepository;

    public DuplicatedCheckIdResponseDto duplicatedCheckId(DuplicatedCheckIdRequestDto duplicatedCheckIdRequestDto) {
        String userId = duplicatedCheckIdRequestDto.getUserId();
        Member member = memberRepository.findByUserId(userId).orElse(null);

        if (member == null) {
            // 중복인 사람이 없다는 것!
            return new DuplicatedCheckIdResponseDto(true);
        } else {
            // 중복인 사람이 있다는 것
            return new DuplicatedCheckIdResponseDto(false);
        }
    }

    public void joinMember(JoinMemberRequestDto joinMemberRequestDto) {
        String userId = joinMemberRequestDto.getUserId();
        String nickname = joinMemberRequestDto.getNickname();
        String pw = joinMemberRequestDto.getPw();
        String confirmPw = joinMemberRequestDto.getConfirmPw();

        /*
            두 비밀 번호가 같은지 확인
            => 다르면 바로 리턴해서 회원가입 실패
            => 같으면 그 다음 스텝으로 넘어감
         */
        checkPw(pw, confirmPw);

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
                .memberId(member)
                .nickname(nickname)
                .diamond(0)
                .build();

        // member table에 저장해줌
        memberRepository.save(member);

        // profile table에 저장
        profileRepository.save(profile);
    }

    boolean checkPw(String pw, String confirmPw) {
        return pw.equals(confirmPw);
    }

    String[] hashingPw(String pw) {
        String salt = getSalt();
        String newPw = getEncrypt(pw, salt);

        return new String[] {newPw, salt};
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
