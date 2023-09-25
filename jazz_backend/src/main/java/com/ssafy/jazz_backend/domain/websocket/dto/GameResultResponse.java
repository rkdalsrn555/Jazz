package com.ssafy.jazz_backend.domain.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameResultResponse {
    private int gainRankPoint;
    private int result; // 1 : 승, 2 : 무, 3 : 패
}
