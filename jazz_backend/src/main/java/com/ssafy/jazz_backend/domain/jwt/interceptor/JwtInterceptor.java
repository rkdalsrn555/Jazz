package com.ssafy.jazz_backend.domain.jwt.interceptor;

import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
        Object handler) throws IOException {
        if (request.getMethod().equals("OPTIONS")) {
            return true; // preflight 요청이 인터셉터에 가로채지지 않도록 설정
        }
        String accessToken = request.getHeader("accessToken");

        // accessToken이 있고, 정상적이면 return true
        if (accessToken != null && jwtService.checkToken(accessToken)) {
            return true;
        } else {
            // accessToken이 문제가 있으면 예외 발생
            throw new NullPointerException();
        }
    }
}

