package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Override
    @Transactional
    public BookmarkResponseDto registerBookmark(String userUUID, BookmarkRequestDto request) {
        QuizManagement quizManagement = quizManagementRepository.findByMemberIdAndQuizId(
            userUUID,
            request.getQuizId());
        quizManagement.setIsBookmark(true);
        quizManagementRepository.save(quizManagement);

        BookmarkResponseDto response = new BookmarkResponseDto();
        response.setQuizId(request.getQuizId());
        response.setIsBookmark(true);
        return response;
    }

    @Override
    @Transactional
    public BookmarkResponseDto releaseBookmark(String userUUID, BookmarkRequestDto request) {
        QuizManagement quizManagement = quizManagementRepository.findByMemberIdAndQuizId(
            userUUID,
            request.getQuizId());
        quizManagement.setIsBookmark(false);
        quizManagementRepository.save(quizManagement);

        BookmarkResponseDto response = new BookmarkResponseDto();
        response.setQuizId(request.getQuizId());
        response.setIsBookmark(false);
        return response;
    }
}
