package com.example.zasada_tv.controllers.tabs.dto;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AttendedEventDTO {
    String event;

    String date;

    String place;

    String team;
}
