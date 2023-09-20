package com.ssafy.jazz_backend.config;

import com.ssafy.jazz_backend.domain.jwt.interceptor.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfiguration implements WebMvcConfigurer {

    @Autowired
    private JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor) // 사용할 인터셉터 추가
            .addPathPatterns("/**") // 인터셉트 적용 URL 명시
            .excludePathPatterns("/user") // 적용 URL 중 제외할 URL 명시
            .excludePathPatterns("/user/login")
            .excludePathPatterns("/user/duplicate/*")
            .excludePathPatterns("/user/nickname/*");
    }
}

