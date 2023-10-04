package com.ssafy.jazz_backend.domain.member.record.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tier {

    @Id
    private TierId id;

    private Integer rankPoint;
    private Integer win;
    private Integer draw;
    private Integer lose;

    public static Tier create(TierId id, Integer rankPoint, Integer win, Integer draw, Integer lose){
        return new Tier(id, rankPoint, win, draw, lose);
    }

}
