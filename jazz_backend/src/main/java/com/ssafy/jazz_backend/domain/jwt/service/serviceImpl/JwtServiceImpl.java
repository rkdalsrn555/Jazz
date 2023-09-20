package com.ssafy.jazz_backend.domain.jwt.service.serviceImpl;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class JwtServiceImpl implements JwtService {

    private static final int MINUTES = 60;
    private static final int WEEKS = 2;
    // SECRET_KEY 바꾸기 => 좀 더 랜덤한 녀석으로
    // SECRET_KEY 숨기기 => 설정파일로 가기
    private static final String SECRET_KEY = "fenndqwkdwqfnnqd99823jjkfdwadafef2323224241321dbkwdwrgwefewf";


    @Override
    public <T> String create(String subject, String key, T data, long expire) {
        // 페이로드를 구성할 클레임들 설정.
        Claims claims = Jwts.claims()
            // 토큰 종류 설정
            .setSubject(subject)
            // 토큰 생성일 설정
            .setIssuedAt(new Date())
            // 토큰 만료기간 설정.
            .setExpiration(new Date(System.currentTimeMillis() + expire));
        // 클레임 삽입.
        claims.put(key, data);

        // JWT 만드는 로직.
        String jwt = Jwts.builder()
            // 헤더 구성 => 토큰 타입만 구성, 알고리즘은 구성 안함.
            .setHeaderParam("typ", "JWT")
            // 페이로드 구성.
            .setClaims(claims)
            // 시그니처 구성.
            .signWith(this.generateKey(), SignatureAlgorithm.HS256)
            .compact();

        return jwt;
    }

    private Key generateKey() {
        byte[] byteKey = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(byteKey);

    }

    @Override
    public <T> String createAccessToken(String key, T data) {
        return create("access-token", key, data, 1000 * 60 * MINUTES);
    }

    @Override
    public <T> String createRefreshToken(String key, T data) {
        return create("refresh-token", key, data, 1000 * 60 * 60 * 24 * 7 * WEEKS);
    }

    @Override
    public boolean checkToken(String jwt) {
        try {
            // 서명 확인. => 서명을 통해 위 변조 확인 , 유효기간 검사.
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(this.generateKey()).build()
                .parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Map<String, Object> getUserInfoFromToken(String token) {
        try {
            // 토큰에서 클레임을 꺼낸다.
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(this.generateKey()).build()
                .parseClaimsJws(token);
            Map<String, Object> body = claims.getBody();
            return body;
        } catch (Exception e) {
            // 여기 부분 에러 변경해주기
            throw new NullPointerException();
        }
    }

    @Override
    public String getInfo(String key, String token) {
        return (String) this.getUserInfoFromToken(token).get(key);
    }
}

