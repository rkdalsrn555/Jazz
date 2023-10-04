package com.ssafy.jazz_backend.domain.jwt.interceptor;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtService jwtService;
    @Autowired MemberRepository memberRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
        Object handler) throws IOException {
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
        String accessToken = request.getHeader("accessToken");

        String uuid = jwtService.getInfo("account", accessToken);
        Member member = memberRepository.findById(uuid).orElse(null);
        if(member == null ){
            response.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE);
            return false;
        }

        // accessToken이 있고, 정상적이면 return true
        if (accessToken == null) {
            // 403
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            return false;
        } else {
            if (jwtService.checkToken(accessToken)) {
                return true;
            }
            // 401
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return false;


        }
    }
}

