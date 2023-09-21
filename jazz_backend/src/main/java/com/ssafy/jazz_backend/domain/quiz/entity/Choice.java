package com.ssafy.jazz_backend.domain.quiz.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Choice {

    @EmbeddedId
    private ChoiceId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizId", insertable = false, updatable = false)
    private Quiz quiz;

    private String content;

    @Builder.Default
    private Boolean isMulti = false;
}
