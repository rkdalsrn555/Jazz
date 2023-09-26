package com.ssafy.jazz_backend.global.error.info;


import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter

public enum MemberErrorInfo {

    NOT_FOUNT_MEMBER(HttpStatus.NOT_FOUND, "uuid에 해당하는 profile이 없습니다.");

    private final HttpStatus status;
    private final String message;

    MemberErrorInfo(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
