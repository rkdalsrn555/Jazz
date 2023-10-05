package com.ssafy.jazz_backend.global;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Util {

    private final QuizRepository quizRepository;


    public String makeRank(int rankPoint) {
        if (rankPoint < 100) {
            return "Bronze";
        } else if (rankPoint < 200) {
            return "Silver";
        } else if (rankPoint < 300) {
            return "Gold";
        } else if (rankPoint < 400) {
            return "Diamond";
        }
        return "Challenger";
    }

    //현재 레벨 
    public int makeLevel(int expPoint) {
        //일단 레벨 경험치 100 쌓으면 1업
        //1레벨 부터 시작
        return (expPoint / 100) + 1;
    }

    //현재 경험치
    public int makeExp(int expPoint) {
        //일단 현재 경험치 출력
        return expPoint % 100;
    }

    public int makeWinRate(int win, int draw, int lose) {
        int total = win + lose + draw;

        return (win / total) * 100;

    }

    public String getLevelRankKeyName() {
        return "level-ranking";
    }

    public String getTierRankKeyName() {
        return "tier-ranking";
    }

    public String getDailyMarathonRankKeyName() {
        return "daily-marathon-ranking";
    }

    public String getMonthlyMarathonRankKeyName() {
        return "monthly-marathon-ranking";
    }

    //chiceList를 통해 contentList(보기내용)을 랜덤 처리해서 retrun
    public List<String> getRandomContentList(List<Choice> choiceList) {
        List<String> contentList = new ArrayList<>();
        for (Choice choice : choiceList) {
            contentList.add(choice.getContent());
        }
        //랜덤으로 돌림
        Collections.shuffle(contentList);
        return contentList;
    }

    //해당 quiz의 정답 보기내용(content)이 뭔지 저장 -> caseNum 1번에 들어있는 content 가져옴
    public String getCorrectAnswer(Quiz quiz) {
        return quiz.getCases().stream()
            .filter(choice -> choice.getId().getCaseNum() == 1)
            .findFirst()
            .map(Choice::getContent)
            .orElseThrow(() -> new NullPointerException("해당 문제의 1번 보기가 없습니다. 즉, 정답이 없습니다."));
    }

}
