package com.ssafy.jazz_backend.domain.item.title.entity;

import com.ssafy.jazz_backend.domain.item.entity.Item;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagementId;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
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
@Table(name = "pretitlemanagement")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PreTitleManagement {

    @EmbeddedId
    private PreTitleManagementId id;

    @Builder.Default
    private boolean isOwn = false;

    @Builder.Default
    private boolean isUsed = false;

    @MapsId("member")
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public PreTitleManagement(Member member, PreTitle preTitle, boolean isOwn, boolean isUsed) {
        this.id = new PreTitleManagementId(member, preTitle);
        this.isOwn = isOwn;
        this.isUsed = isUsed;
    }

}
