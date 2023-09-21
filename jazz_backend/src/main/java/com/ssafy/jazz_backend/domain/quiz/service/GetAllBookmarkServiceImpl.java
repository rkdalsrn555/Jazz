package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.GetAllBookmarkResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllBookmarkServiceImpl implements GetAllBookmarkService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public List<GetAllBookmarkResponseDto> getAllBookmark(String userUUID) {
        Member member = memberRepository.findById(userUUID).orElse(null);
        if (member == null) {
            throw new RuntimeException("Member not found for the given UUID");
        }

        List<QuizManagement> bookmarkedQuizzes = quizManagementRepository.findAllByMemberAndIsBookmark(
            member, true);

        return bookmarkedQuizzes.stream().map(quizManagement -> {
            return GetAllBookmarkResponseDto.builder()
                .quizId(quizManagement.getQuiz().getId())
                .content(quizManagement.getQuiz().getContent())
                .kind(quizManagement.getQuiz().getKind())
                .build();
        }).collect(Collectors.toList());
    }
}

// 문제 종류 상관없이 보기1번만 content로 가져오면됨. gpt한테 최근에 물어본거 참조해서 고치자.