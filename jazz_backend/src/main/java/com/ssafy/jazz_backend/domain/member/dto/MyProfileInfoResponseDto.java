package com.ssafy.jazz_backend.domain.member.dto;

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
    private List<String> ablePrefixTitleList;
    private List<String> ableSuffixTitleList;
    private int takeCharacterId;
    private List<Integer> ableCharacterList;
    private int mailCnt;
}
