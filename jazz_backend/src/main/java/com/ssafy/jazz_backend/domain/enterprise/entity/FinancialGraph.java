package com.ssafy.jazz_backend.domain.enterprise.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "FinancialGraph")
public class FinancialGraph {
    @EmbeddedId
    private FinancialGraphId id;

    @MapsId("enterpriseId") // FinancialGraphId의 enterpriseId와 매핑
    @ManyToOne
    @JoinColumn(name = "enterprise_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Enterprise enterprise;

    private Long totalAssets;
    private Long totalDebt;
    private Long totalCapital;
    private Long income;
    private Long totalComprehensiveIncome;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp updatedAt;

}
