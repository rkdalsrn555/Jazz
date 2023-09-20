package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.AddToQuizManagementResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManangementId;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.quiz.service.AddToQuizManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddToQuizManagementServiceImpl implements AddToQuizManagementService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Override
    public AddToQuizManagementResponseDto addToQuizManagement(String userUUID, int quizId) {
        QuizManangementId quizManangementId = new QuizManangementId();
        // Set member and quiz for the embedded id based on userUUID and quizId

        QuizManagement quizManagement = QuizManagement.builder()
            .id(quizManangementId)
            .build(); // other fields can be set if required

        quizManagementRepository.save(quizManagement); // Save the QuizManagement entity

        return AddToQuizManagementResponseDto.builder()
            .quizID(quizId)
            .build();
    }
}
