package com.ssafy.jazz_backend.domain.enterprise.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DartApiResponseDto {

    private String status;
    private String message;
    private List<FinancialStatementsResponseDto> list;
}
