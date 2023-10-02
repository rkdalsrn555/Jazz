package com.ssafy.jazz_backend.domain.enterprise.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class CashFlowId implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "enterprise_id", nullable = false)
    private int enterpriseId;

    public CashFlowId(int id, int enterpriseId) {
        this.id = id;
        this.enterpriseId = enterpriseId;
    }
}
