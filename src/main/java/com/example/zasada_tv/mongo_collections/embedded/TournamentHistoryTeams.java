package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import lombok.AllArgsConstructor;
import lombok.Data;


/**
 * Данный класс описывает вложенный массив TournamentHistoryTeams коллекции
 * {@link TournamentDoc} базы данных MongoDB
 */

@Data
@AllArgsConstructor
public class TournamentHistoryTeams {
    private String teamName;
    private String place;
    private String reward;
}
