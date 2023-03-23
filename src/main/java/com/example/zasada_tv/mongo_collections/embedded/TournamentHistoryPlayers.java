package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;


/**
 * Данный класс описывает вложенный массив TournamentHistoryPlayers коллекции
 * {@link PlayerDoc} базы данных MongoDB
 * */

public class TournamentHistoryPlayers {
    private String tournamentName;
    private String teamName;


    public TournamentHistoryPlayers(String tournamentName, String teamName){
        this.tournamentName = tournamentName;
        this.teamName = teamName;
    }


    @Override
    public String toString() {
        return String.format("TournamentHistoryPlayers{tournamentName=%s, teamName=%s}",
                tournamentName, teamName);
    }
}
