package com.example.zasada_tv.controllers.tabs.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class MatchTabInfoDTO {
    private String event;

    private String place;

    private String type;

    private ArrayList<EventMatchDTO>  matches;
}
