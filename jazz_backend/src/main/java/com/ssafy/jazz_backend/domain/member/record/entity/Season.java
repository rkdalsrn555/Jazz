package com.ssafy.jazz_backend.domain.member.record.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;


@Entity
@Getter
public class Season {

    @Id
    @Builder.Default
    private Integer id = 1;

    @Builder.Default
    private Integer marathonDailySeason = 0;
    @Builder.Default
    private Integer marathonMonthlySeason = 0;

    @Builder.Default
    private Integer tierSeason = 0;

}
