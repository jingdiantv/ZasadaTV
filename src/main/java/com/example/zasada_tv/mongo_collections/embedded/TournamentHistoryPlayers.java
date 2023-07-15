package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;


/**
 * Данный класс описывает вложенный массив TournamentHistoryPlayers коллекции
 * {@link PlayerDoc} базы данных MongoDB
 */


@Data
@AllArgsConstructor
public class TournamentHistoryPlayers {
    private String tournamentName;
    private String teamName;
    private ArrayList<Matches> matches;
}
