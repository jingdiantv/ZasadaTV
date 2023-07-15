package com.example.zasada_tv.controllers.tabs.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
public class MatchesByDateDTO {
    private String date;

    private List<MatchInfoDTO> matches;
}
