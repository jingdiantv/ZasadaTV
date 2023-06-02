package com.example.zasada_tv.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangeSocialDTO {

    private String player;

    private String link;

    private String social;
}
