package com.ssafy.jazz_backend.domain.quiz.entity;


import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizManagement {

    @EmbeddedId
    private QuizManagementId id;

    @ManyToOne
    @JoinColumn(name = "quizId", insertable = false, updatable = false)
    private Quiz quiz;

    @Builder.Default
    private Boolean isCorrect = false;
    @Builder.Default
    private Boolean isBookmark = false;
}