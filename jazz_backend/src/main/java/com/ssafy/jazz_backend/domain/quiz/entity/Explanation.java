package com.ssafy.jazz_backend.domain.quiz.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Explanation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String word;
    private String description;
}
