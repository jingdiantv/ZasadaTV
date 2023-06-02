package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;


/**
 * Данный класс описывает вложенный массив TournamentHistoryPlayers коллекции
 * {@link PlayerDoc} базы данных MongoDB
 * */


@Getter
@Setter
public class TournamentHistoryPlayers {
    private String tournamentName;
    private String teamName;
    private ArrayList<Matches> matches;


    public TournamentHistoryPlayers(String tournamentName, String teamName, ArrayList<Matches> matches){
        this.tournamentName = tournamentName;
        this.teamName = teamName;
        this.matches = matches;
    }


    @Override
    public String toString() {
        return String.format("TournamentHistoryPlayers{tournamentName=%s, teamName=%s, matches=%s}",
                tournamentName, teamName, matches.toString());
    }
}
