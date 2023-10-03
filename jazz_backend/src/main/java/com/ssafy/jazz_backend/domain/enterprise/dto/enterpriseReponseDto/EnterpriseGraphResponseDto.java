package com.ssafy.jazz_backend.domain.enterprise.dto.enterpriseReponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EnterpriseGraphResponseDto implements Comparable<EnterpriseGraphResponseDto> {

    private Integer id;
    private String name;
    private String pointTimeName;
    private Integer numberPointTime;
    private Long totalAssets;
    private Long totalDebt;
    private Long totalCapital;
    private Long income;
    private Long totalComprehensiveIncome;

    public static EnterpriseGraphResponseDto create(Integer id, String name, String pointTimeName,
        Integer numberPointTime, Long totalAssets, Long totalDebt, Long totalCapital, Long income,
        Long totalComprehensiveIncome) {
        return new EnterpriseGraphResponseDto(id, name, pointTimeName, numberPointTime, totalAssets,
            totalDebt, totalCapital, income, totalComprehensiveIncome);
    }

    //오름차순
    @Override
    public int compareTo(EnterpriseGraphResponseDto o) {
        return this.numberPointTime - o.numberPointTime;
    }
}
