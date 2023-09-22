package com.ssafy.jazz_backend.domain.member.record.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor
public class Marathon {

    @Id
    private MarathonId id;

    private Integer quizRecord;

}

