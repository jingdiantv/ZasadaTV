package com.example.zasada_tv.controllers.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;


@AllArgsConstructor
@Data
public class TeamInfoDTO {
    private String city;

    private String country;

    private String description;

    private int topPosition;

    private String name;

    private ArrayList<FlagNameDTO> players;
}
