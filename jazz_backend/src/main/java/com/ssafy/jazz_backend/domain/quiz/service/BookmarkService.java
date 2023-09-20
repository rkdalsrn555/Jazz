package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkResponseDto;

public interface BookmarkService {

    BookmarkResponseDto registerBookmark(String userUUID, BookmarkRequestDto request);

    BookmarkResponseDto releaseBookmark(String userUUID, BookmarkRequestDto request);
}
