package com.ssafy.jazz_backend.domain.member.dto;

import com.ssafy.jazz_backend.domain.item.entity.Item;
import com.ssafy.jazz_backend.domain.item.entity.ItemManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.PreTitle;
import com.ssafy.jazz_backend.domain.item.title.entity.PreTitleManagement;
import com.ssafy.jazz_backend.domain.item.title.entity.SuffixTitleManagement;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyProfileInfoResponseDto {
    private String userUUID;
    private String nickname;
    private int diamond;
    private int expPoint;
    private int level;
    private int rankPoint;
    private String rank;
    private int collectQuizRecord;
    private int winningPercentage;
    private int marathonOneDay;
    private int bookmarkCnt;
    private int takePrefixTitleId;
    private String takePrefixContent;
    private int takeSuffixTitleId;
    private String takeSuffixContent;
    private List<PreTitleManagement> ablePrefixTitleList;
    private List<SuffixTitleManagement> ableSuffixTitleList;
    private int takeCharacterId;
    private List<ItemManagement> ableCharacterList;
}
