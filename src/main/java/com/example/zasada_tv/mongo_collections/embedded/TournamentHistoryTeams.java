package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;


/**
 * Данный класс описывает вложенный массив TournamentHistoryTeams коллекции
 * {@link TournamentDoc} базы данных MongoDB
 * */

public class TournamentHistoryTeams {
    private String teamName;
    private String place;
    private String reward;


    public TournamentHistoryTeams(String teamName, String place, String reward){
        this.teamName = teamName;
        this.place = place;
        this.reward = reward;
    }


    @Override
    public String toString() {
        return String.format("TournamentHistoryTeams{teamName=%s, place=%s, reward=%s}",
                teamName, place, reward);
    }
}
