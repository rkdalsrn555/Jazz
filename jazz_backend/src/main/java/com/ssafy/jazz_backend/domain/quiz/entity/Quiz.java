package com.ssafy.jazz_backend.domain.quiz.entity;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "quiz")
    private List<Choice> cases;

    @OneToMany(mappedBy = "quiz")
    private List<QuizManagement> quizManagements;

    private int financialType;
    private String question;
    private int kind;
}
