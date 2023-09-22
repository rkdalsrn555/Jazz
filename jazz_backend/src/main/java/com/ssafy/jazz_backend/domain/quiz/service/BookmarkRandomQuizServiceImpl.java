package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.domain.quiz.dto.BookmarkRandomQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.repository.ChoiceRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.quiz.service.BookmarkRandomQuizService;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookmarkRandomQuizServiceImpl implements BookmarkRandomQuizService {

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ChoiceRepository choiceRepository;

    @Override
    public List<BookmarkRandomQuizResponseDto> bookmarkRandomQuiz(String UUID) {
        Member member = memberRepository.findById(UUID).orElse(null);

        if (member == null) {
            // 해당 UUID에 해당하는 회원이 없을 경우 처리
            return Collections.emptyList();
        }

        List<QuizManagement> bookmarkedQuizzes = quizManagementRepository.findAllByIdMemberAndIsBookmark(
            member, true);

        List<BookmarkRandomQuizResponseDto> responseList = new ArrayList<>();

        for (QuizManagement qm : bookmarkedQuizzes) {
            Quiz quiz = qm.getQuiz();
            List<Choice> choices = choiceRepository.findAllByQuiz(quiz);

            List<String> contents = new ArrayList<>();
            for (Choice choice : choices) {
                contents.add(choice.getContent());
            }

            boolean isMulti = choices.get(0).getIsMulti();

            int caseNumIndex = 0;

            if (isMulti) {
                String correctAnswer = contents.get(0);
                Collections.shuffle(contents);
                caseNumIndex = contents.indexOf(correctAnswer);
            }

            BookmarkRandomQuizResponseDto dto = BookmarkRandomQuizResponseDto.builder()
                .quizId(quiz.getId())
                .question(quiz.getQuestion())
                .content(contents)
                .caseNum(caseNumIndex + 1)
                .isMulti(isMulti)
                .isBookmark(qm.getIsBookmark())
                .financialType(quiz.getFinancialType())
                .kind(quiz.getKind())
                .build();

            responseList.add(dto);
        }

        Collections.shuffle(responseList);

        return responseList;
    }
}
