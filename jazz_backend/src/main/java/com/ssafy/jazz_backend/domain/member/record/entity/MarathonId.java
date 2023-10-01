package com.ssafy.jazz_backend.domain.member.record.entity;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.record.repository.SeasonJpaRepository;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MarathonId {


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Integer dailySeason;
    private Integer monthlySeason;

    public static MarathonId create(Member member, Integer daily_season, Integer monthly_season) {

        return new MarathonId(member, daily_season, monthly_season);
    }


}
