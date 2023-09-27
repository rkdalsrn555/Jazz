package com.ssafy.jazz_backend.domain.item.title.service;

import com.ssafy.jazz_backend.domain.item.title.entity.PreTitle;
import com.ssafy.jazz_backend.domain.item.title.entity.PreTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.PreTitleManagementId;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitle;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagementId;
import com.ssafy.jazz_backend.domain.item.title.repository.PreTitleJpaRepository;
import com.ssafy.jazz_backend.domain.item.title.repository.PreTitleManagementJpaRepostiory;
import com.ssafy.jazz_backend.domain.item.title.repository.SuffixTitleJpaRepository;
import com.ssafy.jazz_backend.domain.item.title.repository.SuffixTitleManagementJpaRepostiory;
import com.ssafy.jazz_backend.domain.jwt.service.JwtService;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TitleServiceImpl implements TitleService{

    private final PreTitleJpaRepository preTitleJpaRepository;

    private final PreTitleManagementJpaRepostiory preTitleManagementJpaRepository;

    private final SuffixTitleJpaRepository suffixTitleJpaRepository;

    private final SuffixTitleManagementJpaRepostiory suffixTitleManagementJpaRepository;

    private final MemberRepository memberRepository;

    private final JwtService jwtService;

    @Override
    public String randomTitleServ(String accessToken) {
        String memberUUID = jwtService.getInfo("account", accessToken);
        Member member = memberRepository.findById(memberUUID).orElseThrow(() -> new NullPointerException());
        List<PreTitle> preTitles = preTitleJpaRepository.findAll();
        List<SuffixTitle> suffixTitles = suffixTitleJpaRepository.findAll();
        int preSize = preTitles.size();
        int suffixSize = suffixTitles.size();
        int totalSize = preSize + suffixSize;
        Random random = new Random();
        int randomValue = random.nextInt(totalSize)+1;
        if(randomValue <= preSize){
            PreTitle preTitle = preTitleJpaRepository.findById(randomValue).orElseThrow(() -> new NullPointerException());
            System.out.println(preTitle.toString());
            PreTitleManagementId preTitleManagementId = new PreTitleManagementId(member, preTitle);
            PreTitleManagement preTitleManagement = preTitleManagementJpaRepository.findById(preTitleManagementId).orElseThrow(() -> new NullPointerException());
            preTitleManagement.setOwn(true);
            preTitleManagementJpaRepository.save(preTitleManagement);
            return preTitle.getContent();
        }
        else {
            SuffixTitle suffixTitle = suffixTitleJpaRepository.findById(randomValue-preSize).orElseThrow(() -> new NullPointerException());
            System.out.println(suffixTitle.toString());
            SuffixTitleManagementId suffixTitleManagementId = new SuffixTitleManagementId(member, suffixTitle);
            SuffixTitleManagement suffixTitleManagement = suffixTitleManagementJpaRepository.findById(suffixTitleManagementId).orElseThrow(() -> new NullPointerException());
            suffixTitleManagement.setOwn(true);
            suffixTitleManagementJpaRepository.save(suffixTitleManagement);
            return suffixTitle.getContent();
        }
    }
}
