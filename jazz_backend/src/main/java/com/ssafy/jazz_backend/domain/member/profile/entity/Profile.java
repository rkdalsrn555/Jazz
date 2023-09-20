package com.ssafy.jazz_backend.domain.member.profile.entity;

import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "member_profile")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Profile extends BaseEntity {

    @Id
    @Column(name = "member_id")
    private String memberId;

    @MapsId
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "diamond")
    /*
        기본 값이 0임
        0을 제어하는 방법에는 내가 생각을 했을 때, 크게 2가지가 있음
        1. DB단에서 제어를 하는 방법
        2. 백엔드 단에서 제어를 하는 방법

        1번 먼저 적어보면 옵션을 주면 됨
        그럼 해당 테이블의 행이 생성될때 sql단에서 default가 적용되어서 들어감

        2번 방법은 백엔드 단에서 객체를 만들때, 기본값을 직접 적어서 객체를 만드는 방법임

        위 2가지 방법중에서 뭐가 더 빠른지 몰라서 이번에는 2번 방법을 사용할 예정
     */
    private int diamond;
}

