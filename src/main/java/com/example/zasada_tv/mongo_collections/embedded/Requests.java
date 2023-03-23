package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;


/**
 * Данный класс описывает вложенный массив Requests коллекции {@link TournamentDoc} базы данных MongoDB
 * */

public class Requests {
    private String request_id;
    private String teamName;
    private String status;


    public Requests(String request_id, String teamName, String status){
        this.request_id = request_id;
        this.teamName = teamName;
        this.status = status;
    }


    @Override
    public String toString() {
        return String.format("Requests{request_id=%s, teamName=%s, status=%s}",
                request_id, teamName, status);
    }
}
