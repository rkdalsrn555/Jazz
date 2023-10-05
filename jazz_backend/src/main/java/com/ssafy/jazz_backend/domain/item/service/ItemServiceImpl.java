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
import com.ssafy.jazz_backend.global.error.exception.NotEnoughDiamondException;
import java.util.ArrayList;
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
        List<Item> itemList = new ArrayList<>();
        List<ItemManagement> itemManagementList = itemManagementJpaRepository.findAllByMemberIdAndIsOwn(memberUUID, false);
        for(int i = 0; i < itemManagementList.size(); i++){
            itemList.add(itemManagementList.get(i).getId().getItem());
        }
        int diamond = profileRepository.findById(memberUUID).orElseThrow(() -> new NullPointerException()).getDiamond();
        return new CharacterListResponseDto(itemList, diamond);
    }

    @Override
    public CharacterListResponseDto takeCharacter(String accessToken, int itemId)
        throws NotEnoughDiamondException {
        String memberUUID = jwtService.getInfo("account", accessToken);
        Profile profile = profileRepository.findById(memberUUID).orElseThrow(() -> new NullPointerException());
        int diamond = profile.getDiamond();

        if(diamond < 50) throw new NotEnoughDiamondException("구매에 실패하였습니다.");

        Member member = memberRepository.findById(memberUUID).orElseThrow(() -> new NullPointerException());
        Item item = itemJpaRepository.findById(itemId).orElseThrow(() -> new NullPointerException());
        ItemManagementId itemManagementId = new ItemManagementId(member, item);
        ItemManagement itemManagement = itemManagementJpaRepository.findById(itemManagementId).orElseThrow(() -> new NullPointerException());
        itemManagement.setOwn(true);
        itemManagementJpaRepository.save(itemManagement);

        profile.setDiamond(diamond - item.getPrice());
        profileRepository.save(profile);

        CharacterListResponseDto characterListResponseDto = getAllCharacter(accessToken);

        return characterListResponseDto;
    }
}
