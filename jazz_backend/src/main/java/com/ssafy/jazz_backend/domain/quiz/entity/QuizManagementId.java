package com.ssafy.jazz_backend.domain.quiz.entity;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class QuizManagementId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "quizId")
    private Quiz quiz;

}
