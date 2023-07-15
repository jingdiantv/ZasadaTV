package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import lombok.AllArgsConstructor;
import lombok.Data;


/**
 * Данный класс описывает вложенный массив Requests коллекции {@link TournamentDoc} базы данных MongoDB
 */

@Data
@AllArgsConstructor
public class Requests {
    private String request_id;
    private String teamName;
    private String status;
}
