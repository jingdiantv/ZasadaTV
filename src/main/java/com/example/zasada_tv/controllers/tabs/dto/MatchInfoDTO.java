package com.example.zasada_tv.controllers.tabs.dto;

import com.example.zasada_tv.dto.MapDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;


@AllArgsConstructor
@Getter
@Setter
@ToString
public class MatchInfoDTO extends EventMatchDTO {
    private String event;

    private String tier;

    private ArrayList<MapDTO> maps;

    private String tierSrc;
}
