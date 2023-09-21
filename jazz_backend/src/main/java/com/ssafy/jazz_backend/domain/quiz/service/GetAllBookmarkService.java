package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.GetAllBookmarkResponseDto;
import java.util.List;

public interface GetAllBookmarkService {

    List<GetAllBookmarkResponseDto> getAllBookmark(String userUUID);
}
