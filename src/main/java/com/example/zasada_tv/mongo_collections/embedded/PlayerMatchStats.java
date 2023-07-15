package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import lombok.Getter;
import lombok.ToString;

/**
 * Данный класс описывает вложенный массив PlayerStats коллекции {@link PlayerDoc}
 * базы данных MongoDB
 */


@Getter
@ToString
public class PlayerMatchStats {
    private String match_id;
    private int kills;
    private int assists;
    private int deaths;
    private double kd;


    public PlayerMatchStats(String match_id, int kills, int assists, int deaths) {
        this.match_id = match_id;
        this.kills = kills;
        this.assists = assists;
        this.deaths = deaths;
        setKd();
    }


    private void setKd() {
        if (deaths != 0)
            this.kd = (float) kills / deaths;
        else
            this.kd = (float) kills;
    }


    public void setKills(int kills) {
        this.kills = kills;
        setKd();
    }


    public void setDeaths(int deaths) {
        this.deaths = deaths;
        setKd();
    }


    public void setAssists(int assists) {
        this.assists = assists;
    }
}
