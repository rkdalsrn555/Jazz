package com.ssafy.jazz_backend.domain.member.record.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Season {

    @Id
    @Builder.Default
    private Integer id = 1;

    @Builder.Default
    private Integer dailySeason = 0; // 마라톤 일간 시즌
    @Builder.Default
    private Integer monthlySeason = 0; // 마라톤 월간 시즌

    @Builder.Default
    private Integer tierSeason = 0;

}
