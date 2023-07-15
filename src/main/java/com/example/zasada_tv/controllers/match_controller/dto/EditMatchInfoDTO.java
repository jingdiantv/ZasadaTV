package com.example.zasada_tv.controllers.match_controller.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class EditMatchInfoDTO {

    private String date;

    private String time;

    private String event;

    private String nameFirst;

    private String nameSecond;
}
