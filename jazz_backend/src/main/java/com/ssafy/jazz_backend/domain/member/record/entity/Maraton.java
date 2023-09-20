package com.ssafy.jazz_backend.domain.member.record.entity;


import com.ssafy.jazz_backend.global.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Maraton {

    @Id
    private MaratonId id;

    private Integer quizRecord;

}

