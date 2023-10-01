package com.ssafy.jazz_backend.domain.member.record.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Marathon {

    @Id
    private MarathonId id;

    @Builder.Default
    private Integer quizRecord = 0;

    public Integer getQuizRecord() {
        return this.quizRecord;
    }


    public static Marathon create(MarathonId marathonId, Integer quizRecord) {
        return new Marathon(marathonId, quizRecord);
    }

}

