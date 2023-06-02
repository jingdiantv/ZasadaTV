package com.example.zasada_tv.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NewTeamDTO {

    private String name;

    private String tag;

    private String country;

    private String city;

    private String cap;
}
