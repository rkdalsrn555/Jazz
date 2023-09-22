package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.dto.GetAllBookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.ChoiceRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Service
public class GetAllBookmarkServiceImpl implements GetAllBookmarkService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Autowired
    private ChoiceRepository choiceRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public List<GetAllBookmarkResponseDto> getAllBookmark(String userUUID) {
        List<GetAllBookmarkResponseDto> responseList = new ArrayList<>();

        Member member = memberRepository.findById(userUUID)
            .orElseThrow(() -> new RuntimeException("Member not found"));

        // Fetching all bookmarked quizzes for the member
        List<QuizManagement> bookmarkedQuizzes = quizManagementRepository.findAllByIdMemberAndIsBookmark(
            member, true);

        for (QuizManagement quizManagement : bookmarkedQuizzes) {
            Quiz quiz = quizManagement.getQuiz();
            Choice choice = choiceRepository.findByQuizAndIdCaseNum(quiz, 1);

            GetAllBookmarkResponseDto responseDto = GetAllBookmarkResponseDto.builder()
                .quizId(quiz.getId())
                .content(choice.getContent())
                .kind(quiz.getKind())
                .build();
            responseList.add(responseDto);
        }

        return responseList;
    }
}
