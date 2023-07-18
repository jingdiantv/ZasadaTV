package com.example.zasada_tv.controllers.tabs.dto;


import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryTeams;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;


@Data
@AllArgsConstructor
public class EventParticipantsDTO {
    private String name;

    private String date;

    ArrayList<TournamentHistoryTeams> participants;
}
