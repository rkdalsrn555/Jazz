package com.ssafy.jazz_backend.domain.quiz.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkRandomQuizResponseDto {

    int quizId;
    String question;
    List<String> content;
    int caseNum;
    boolean isMulti;
    boolean isBookmark;
    int financialType;
    int kind;
}
