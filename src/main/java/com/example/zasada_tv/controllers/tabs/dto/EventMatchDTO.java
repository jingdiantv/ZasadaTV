package com.example.zasada_tv.controllers.tabs.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventMatchDTO {
    private int matchId;

    private String date;

    private String leftTeam;

    private String leftTag;

    private String rightTeam;

    private String rightTag;

    private String leftScore;

    private String rightScore;
}
