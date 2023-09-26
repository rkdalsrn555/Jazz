package com.ssafy.jazz_backend.global.error.exception;

import com.ssafy.jazz_backend.global.error.info.MemberErrorInfo;
import lombok.Getter;

@Getter
public class MemberException extends RuntimeException {

    private final MemberErrorInfo info;


    public MemberException(MemberErrorInfo info) {

        this.info = info;
    }
}
