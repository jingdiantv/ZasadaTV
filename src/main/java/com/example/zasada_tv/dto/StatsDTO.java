package com.example.zasada_tv.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatsDTO {
    private int kills;

    private double hsp; //hs %

    private int maps;

    private double dpr; //damage per round

    private double kd;

    private double kpm; //kills per map

    private double kdd; //kd diff

    private int deaths;
}
