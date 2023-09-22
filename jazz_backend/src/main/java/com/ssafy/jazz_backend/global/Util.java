package com.ssafy.jazz_backend.global;

import com.ssafy.jazz_backend.domain.member.record.entity.Tier;
import java.util.List;
import lombok.NoArgsConstructor;

import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class Util {

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

    public String getMarathonRankKeyName() {
        return "marathon-ranking";
    }
}
