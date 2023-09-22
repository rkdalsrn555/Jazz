package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRandomQuizResponseDto;
import java.util.List;

public interface BookmarkRandomQuizService {

    List<BookmarkRandomQuizResponseDto> bookmarkRandomQuiz(String UUID);
    
}
