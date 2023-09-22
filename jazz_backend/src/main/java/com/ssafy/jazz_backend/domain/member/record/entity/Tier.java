package com.ssafy.jazz_backend.domain.member.record.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor
public class Tier {

    @Id
    private TierId id;

    private Integer rankPoint;
    private Integer win;
    private Integer draw;
    private Integer lose;

}
