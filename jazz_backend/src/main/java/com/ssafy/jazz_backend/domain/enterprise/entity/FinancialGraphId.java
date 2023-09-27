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
public class FinancialGraphId implements Serializable {
    @Column(name = "point_time_name", length = 20, nullable = false)
    private String pointTimeName;

    @Column(name = "enterprise_id", nullable = false)
    private int enterpriseId;

    public FinancialGraphId(String pointTimeName, int enterpriseId) {
        this.pointTimeName = pointTimeName;
        this.enterpriseId = enterpriseId;
    }
}
