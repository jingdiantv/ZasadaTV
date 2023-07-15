package com.example.zasada_tv.controllers.tabs.player_tabs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class RosterDTO {
    private String team;

    private String period;

    private ArrayList<String> trophies;

    private long dayDiff;
}
