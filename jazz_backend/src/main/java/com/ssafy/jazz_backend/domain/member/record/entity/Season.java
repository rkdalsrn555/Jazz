package com.ssafy.jazz_backend.domain.member.record.entity;

import jakarta.persistence.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor
public class Season {

    @Builder.Default
    private Integer maratonSeason = 0;
    @Builder.Default
    private Integer tierSeason = 0;

}
