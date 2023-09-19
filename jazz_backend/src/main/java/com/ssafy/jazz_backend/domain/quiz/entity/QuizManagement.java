package com.ssafy.jazz_backend.domain.quiz.entity;


import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizManagement {

    @EmbeddedId
    private QuizManangementId id;

    @ManyToOne
    @JoinColumn(name = "quizId", insertable = false, updatable = false)
    private Quiz quiz;

    @Builder.Default
    private Boolean isCorrect = false;
    @Builder.Default
    private Boolean isBookmark = false;
}