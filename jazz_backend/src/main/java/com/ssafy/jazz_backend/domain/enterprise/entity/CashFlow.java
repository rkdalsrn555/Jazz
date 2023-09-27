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
@Table(name = "CashFlow")
public class CashFlow {
    @EmbeddedId
    private CashFlowId id;

    @MapsId("enterpriseId") // CashFlowId의 enterpriseId와 매핑
    @ManyToOne
    @JoinColumn(name = "enterprise_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Enterprise enterprise;

    @Column(name = "account_name", length = 100)
    private String accountName;

    @Column(name = "thstrm_name", length = 100)
    private String thstrmName;

    @Column(name = "th_amount")
    private Long thAmount;

    @Column(name = "frmtrm_name", length = 100)
    private String frmtrmName;

    @Column(name = "frm_amount")
    private Long frmAmount;
}
