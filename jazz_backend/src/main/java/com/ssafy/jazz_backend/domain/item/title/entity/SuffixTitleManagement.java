package com.ssafy.jazz_backend.domain.item.title.entity;

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
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuffixTitleManagement {

    @EmbeddedId
    private SuffixTitleManagementId id;

    @Builder.Default
    private boolean isOwn = false;

    @Builder.Default
    private boolean isUsed = false;

    @MapsId("member")
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public SuffixTitleManagement(Member member, SuffixTitle suffixTitle, boolean isOwn, boolean isUsed) {
        this.id = new SuffixTitleManagementId(member, suffixTitle);
        this.isOwn = isOwn;
        this.isUsed = isUsed;
    }

}
