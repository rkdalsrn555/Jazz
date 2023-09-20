package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Override
    public BookmarkResponseDto registerBookmark(String userUUID, BookmarkRequestDto request) {
        QuizManagement quizManagement = bookmarkRepository.findByMemberIdAndQuizId(
            userUUID,
            request.getQuizId());
        quizManagement.setIsBookmark(true);
        bookmarkRepository.save(quizManagement);

        BookmarkResponseDto response = new BookmarkResponseDto();
        response.setQuizId(request.getQuizId());
        response.setIsBookmark(true);
        return response;
    }

    @Override
    public BookmarkResponseDto releaseBookmark(String userUUID, BookmarkRequestDto request) {
        QuizManagement quizManagement = bookmarkRepository.findByMemberIdAndQuizId(
            userUUID,
            request.getQuizId());
        quizManagement.setIsBookmark(false);
        bookmarkRepository.save(quizManagement);

        BookmarkResponseDto response = new BookmarkResponseDto();
        response.setQuizId(request.getQuizId());
        response.setIsBookmark(false);
        return response;
    }
}
