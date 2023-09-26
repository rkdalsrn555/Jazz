package com.ssafy.jazz_backend.domain.quiz.entity;

import java.io.Serializable;
import lombok.Setter;

@Setter
public class ChoiceId implements Serializable {

    private int caseNum;
    private int quizId;

    public int getCaseNum() {
        return caseNum;
    }
}
