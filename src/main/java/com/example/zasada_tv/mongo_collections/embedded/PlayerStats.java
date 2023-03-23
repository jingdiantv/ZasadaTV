package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;

/**
 * Данный класс описывает вложенный массив PlayerStats коллекции {@link PlayerDoc}
 * базы данных MongoDB
 * */

public class PlayerStats {
    private String match_id;
    private int kills;
    private int assists;
    private int deaths;
    private double kd;


    public PlayerStats(String match_id, int kills, int assists, int deaths, double kd){
        this.match_id = match_id;
        this.kills = kills;
        this.assists = assists;
        this.deaths = deaths;
        this.kd = kd;
    }


    @Override
    public String toString() {
        return String.format("PlayerStats{match_id=%s, kills=%d, assists=%d, deaths=%d, kd=%f}",
                match_id, kills, assists, deaths, kd);
    }


    public String getMatch_id() {
        return match_id;
    }


    public int getKills() {
        return kills;
    }


    public int getDeaths() {
        return deaths;
    }


    public int getAssists() {
        return assists;
    }


    public void setKills(int kills) {
        this.kills = kills;
    }


    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }


    public void setAssists(int assists) {
        this.assists = assists;
    }


    public void setKd(double kd) {
        this.kd = kd;
    }
}
