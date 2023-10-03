package com.ssafy.jazz_backend.domain.news.service;

import com.ssafy.jazz_backend.domain.news.dto.NewsCrawlingRequestDto;
import java.io.IOException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NewsService {
    SseEmitter newsCrawling(NewsCrawlingRequestDto newsCrawlingRequestDto)
        throws IOException, InterruptedException;

}
