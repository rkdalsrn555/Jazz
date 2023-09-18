package com.ssafy.jazz_backend.domain.quiz.entity;

import java.io.Serializable;

public class CaseId implements Serializable {

    private Long case_num;
    private Long quiz_id;

    public Long getCaseNum() {
        return case_num;
    }
}
