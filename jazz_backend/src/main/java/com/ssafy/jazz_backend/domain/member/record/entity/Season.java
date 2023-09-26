package com.ssafy.jazz_backend.domain.member.record.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
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
