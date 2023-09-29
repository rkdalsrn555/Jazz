package com.ssafy.jazz_backend.domain.enterprise.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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
public class FinancialPositionId implements Serializable {
    private int ord;

    @Column(name = "enterprise_id", nullable = false)
    private int enterpriseId;

    public FinancialPositionId(int ord, int enterpriseId) {
        this.ord = ord;
        this.enterpriseId = enterpriseId;
    }
}
