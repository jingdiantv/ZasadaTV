package com.example.zasada_tv.utils;


import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryTeams;

import java.time.LocalDateTime;
import java.util.ArrayList;


public class Utils {

    public static String parseMatchDate(LocalDateTime date){
        String day = fix_number(date.getDayOfMonth());
        String month = fix_number(date.getMonthValue());

        return day + "." + month + "." + date.getYear();
    }


    public static String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }


    public static String unFillSpaces(String id) {
        if (id.contains("-"))
            return id.replaceAll("-", " ");
        return id;
    }


    public static String fillSpaces(String string) {
        return string.replaceAll(" ", "-");
    }


    public static String getPlace(TournamentDoc fullEv, String teamName, String playerName) {

        ArrayList<TournamentHistoryTeams> tournamentHistoryTeams = fullEv.getHistoryTeams();

        for (TournamentHistoryTeams teamTournament : tournamentHistoryTeams) {
            if (teamTournament.getTeamName().equals(teamName) || teamTournament.getTeamName().equals(playerName)) {
                return teamTournament.getPlace();
            }
        }

        return "";
    }
}
