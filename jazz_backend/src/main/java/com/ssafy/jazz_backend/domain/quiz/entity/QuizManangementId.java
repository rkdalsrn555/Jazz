package com.ssafy.jazz_backend.domain.quiz.entity;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.io.Serializable;

@Embeddable
public class QuizManangementId implements Serializable {

    @OneToOne
    @JoinColumn(name = "memberId", insertable = false, updatable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "quizId", insertable = false, updatable = false)
    private Quiz quiz;

}
