package com.ssafy.jazz_backend.domain.item.service;

import com.ssafy.jazz_backend.domain.item.dto.CharacterListResponseDto;
import com.ssafy.jazz_backend.domain.item.dto.CharacterPaymentResponseDto;
import com.ssafy.jazz_backend.domain.item.entity.Item;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagement;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagementId;
import com.ssafy.jazz_backend.domain.item.entity.Kind;
import com.ssafy.jazz_backend.domain.item.repository.ItemJpaRepository;
import com.ssafy.jazz_backend.domain.item.repository.ItemManagementJpaRepository;
import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ItemServiceImpl implements ItemService{

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    private final ItemJpaRepository itemJpaRepository;
    private final ItemManagementJpaRepository itemManagementJpaRepository;

    @Override
    public CharacterListResponseDto getAllCharacter(String accessToken) {
        String memberUUID = jwtService.getInfo("account", accessToken);
        List<Item> list = itemJpaRepository.findAllByKind(Kind.CHARACTER).orElseThrow(() -> new NullPointerException());
        int diamond = profileRepository.findById(memberUUID).orElseThrow(() -> new NullPointerException()).getDiamond();
        return new CharacterListResponseDto(list, diamond);
    }

    @Override
    public CharacterPaymentResponseDto takeCharacter(String accessToken, int itemId) {
        String memberUUID = jwtService.getInfo("account", accessToken);
        Member member = memberRepository.findById(memberUUID).orElseThrow(() -> new NullPointerException());
        Item item = itemJpaRepository.findById(itemId).orElseThrow(() -> new NullPointerException());
        ItemManagementId itemManagementId = new ItemManagementId(member, item);
        ItemManagement itemManagement = itemManagementJpaRepository.findById(itemManagementId).orElseThrow(() -> new NullPointerException());
        itemManagement.setOwn(true);
        itemManagementJpaRepository.save(itemManagement);
        Profile profile = profileRepository.findById(memberUUID).orElseThrow(() -> new NullPointerException());
        int diamond = profile.getDiamond();
        profile.setDiamond(diamond - item.getPrice());
        profileRepository.save(profile);
        CharacterPaymentResponseDto characterPaymentResponseDto = new CharacterPaymentResponseDto(itemId, item.getPrice());
        return null;
    }
}
