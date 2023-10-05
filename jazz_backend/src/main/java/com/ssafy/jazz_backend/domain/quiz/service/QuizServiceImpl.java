package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.quiz.dto.SubjectiveQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.entity.QuizManagement;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizManagementRepository;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizManagementRepository quizManagementRepository;

    public List<?> getQuizByKind(String userUUID, int kind) {
        List<?> quizzes = switch (kind) {
            case 1 -> getRandomObjectiveQuizzes();
            case 2 -> getRandomSubjectiveQuizzes();
            case 3 -> getRandomCaseObjectiveQuizzes();
            default -> throw new IllegalArgumentException("Invalid kind value");
        };
        for (Object quizObj : quizzes) {
            if (quizObj instanceof Map) {
                Map<String, Object> quizMap = (Map<String, Object>) quizObj;
                int quizId = (int) quizMap.get("quizId");
                boolean isBookmarked = checkBookmarkStatus(userUUID, quizId);
                quizMap.put("isBookmark", isBookmarked);
            } else if (quizObj instanceof SubjectiveQuizResponseDto) {
                SubjectiveQuizResponseDto dto = (SubjectiveQuizResponseDto) quizObj;
                boolean isBookmarked = checkBookmarkStatus(userUUID, dto.getQuizId());
                dto.setIsBookmark(isBookmarked);
            }
        }

        return quizzes;
    }

    private Map<String, Object> generateQuizMap(Quiz quiz) {
        Map<String, Object> quizMap = new HashMap<>();

        // 퀴즈의 기본 정보를 추가
        quizMap.put("quizId", quiz.getId());
        quizMap.put("question", quiz.getQuestion());
        quizMap.put("kind", quiz.getKind());
        if (quiz.getKind() == 1) {
            quizMap.put("financialType", quiz.getFinancialType());
        }

        // 퀴즈의 선택사항 내용 추가
        List<String> contentList = new ArrayList<>();
        for (Choice c : quiz.getCases()) {
            contentList.add(c.getContent());
        }

        // 정답 선택사항의 내용을 저장
        String answer = quiz.getCases().stream()
            .filter(c -> c.getId().getCaseNum() == 1)
            .findFirst()
            .map(Choice::getContent)
            .orElse(null);

        // 선택사항을 셔플
        Collections.shuffle(contentList);

        // 셔플된 선택사항 목록에서 정답 선택사항의 위치 찾기
        int answerIndex = contentList.indexOf(answer);
        quizMap.put("caseNum", answerIndex + 1);

        // 셔플된 선택사항 목록과 추가 정보를 맵에 추가
        quizMap.put("content", contentList);
        quizMap.put("isMulti", true);

        return quizMap;
    }

    public List<Map<String, Object>> getRandomObjectiveQuizzes() {
        List<Quiz> quizzes = quizRepository.findRandomQuizzesByKind(1);
        List<Map<String, Object>> responseList = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            responseList.add(generateQuizMap(quiz));
        }

        return responseList;
    }

    public List<SubjectiveQuizResponseDto> getRandomSubjectiveQuizzes() {
        List<Quiz> quizzes = quizRepository.findRandomQuizzesByKind(2);  // kind=2인 문제를 가져옴
        List<SubjectiveQuizResponseDto> responseList = new ArrayList<>();



        for (Quiz quiz : quizzes) {
            // 주관식 문제의 경우 보기는 1개만 있으므로, 첫 번째 보기의 content를 가져옴
            String content = quiz.getCases().stream()
                .filter(c -> c.getId().getCaseNum() == 1)
                .findFirst()
                .map(Choice::getContent)
                .orElse(null);  // 혹시나 해당하는 case가 없을 때를 위한 fallback

            String hint = quiz.getCases().stream()
                .filter(c -> c.getId().getCaseNum() == 5)
                .findFirst()
                .map(Choice::getContent)
                .orElse(null);

            SubjectiveQuizResponseDto dto = new SubjectiveQuizResponseDto();
                dto.setQuizId(quiz.getId());
                dto.setQuestion(quiz.getQuestion());
                dto.setContent(Collections.singletonList(content));
                dto.setCaseNum(1);
                dto.setIsMulti(false);  // 항상 false로 설정
                dto.setKind(quiz.getKind());
                dto.setFinancialType((quiz.getFinancialType()));
                dto.setHint(hint);

                responseList.add(dto);
        }

        return responseList;
    }


    public List<Map<String, Object>> getRandomCaseObjectiveQuizzes() {
        List<Quiz> quizzes = quizRepository.findRandomQuizzesByKind(3);
        List<Map<String, Object>> responseList = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            responseList.add(generateQuizMap(quiz));
        }

        return responseList;
    }

    private boolean checkBookmarkStatus(String userUUID, int quizId) {
        QuizManagement quizManagement = quizManagementRepository.findByMemberIdAndQuizId(userUUID,
            quizId);
        return quizManagement != null && quizManagement.getIsBookmark();
    }


}
