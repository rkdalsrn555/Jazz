package com.ssafy.jazz_backend.domain.member.record.entity;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
public class MarathonId {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Integer daily_season;
    private Integer monthly_season;

    public static MarathonId create(Member member, Integer daily_season, Integer monthly_season) {
        return new MarathonId(member, daily_season, monthly_season);
    }


}
