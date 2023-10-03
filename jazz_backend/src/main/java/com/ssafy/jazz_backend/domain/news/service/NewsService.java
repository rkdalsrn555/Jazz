package com.ssafy.jazz_backend.domain.news.service;

import com.ssafy.jazz_backend.domain.news.dto.NewsCrawlingRequestDto;
import java.io.IOException;

public interface NewsService {
    void newsCrawling(NewsCrawlingRequestDto newsCrawlingRequestDto) throws IOException;

}
