package com.ssafy.jazz_backend.domain.websocket.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuizMessage {
    private MessageType messageType;
    private int quizId;
    private String question;
    private List<String> content;
    private int caseNum;
    private boolean isMulti;
    private int kind;
}
