package com.ssafy.jazz_backend.domain.item.entity;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ItemManagement {

    @EmbeddedId
    private ItemManagementId id;

    @Builder.Default
    private boolean isOwn = false;

    @Builder.Default
    private boolean isUsed = false;

    @MapsId("member")
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public ItemManagement(Member member, Item item, boolean isOwn, boolean isUsed) {
        this.id = new ItemManagementId(member, item);
        this.isOwn = isOwn;
        this.isUsed = isUsed;
    }

}
