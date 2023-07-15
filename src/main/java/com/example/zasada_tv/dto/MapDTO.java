package com.example.zasada_tv.dto;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class MapDTO {
    private String mapName;

    private String scoreFirst;

    private String scoreSecond;

    private String status;
}
