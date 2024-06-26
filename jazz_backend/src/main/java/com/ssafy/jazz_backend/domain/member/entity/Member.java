package com.ssafy.jazz_backend.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.PreTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagement;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.global.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "members")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member extends BaseEntity {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "pw")
    private String pw;

    @Column(name = "salt")
    private String salt;

    @OneToOne(mappedBy = "member")
    private Token token;

    @OneToOne(mappedBy = "member")
    private Profile profile;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ItemManagement> itemManagements;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PreTitleManagement> preTitleManagements;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<SuffixTitleManagement> suffixTitleManagements;

}