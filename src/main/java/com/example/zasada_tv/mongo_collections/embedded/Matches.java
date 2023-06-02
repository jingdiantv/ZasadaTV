package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.controllers.match_controller.Player;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;


/**
 * Данный класс описывает вложенный массив Matches коллекции {@link TournamentDoc}
 * базы данных MongoDB
 * */

@Getter
@Setter
public class Matches {
    private int matchId;
    private int scoreFirst;
    private int scoreSecond;
    private LocalDateTime matchDate;
    private String status;
    private String nameFirst;
    private String tagFirst;
    private String tagSecond;
    private String nameSecond;
    private String type;
    private int tier;
    private ArrayList<HashMap<String, Object>> maps;
    private ArrayList<HashMap<String, Object>> logs;
    private ArrayList<Player> activePlayers;
    private String ct;
    private String t;
    private String description;
    private ArrayList<String> veto;
    private String format;


    public Matches(int matchId, int scoreFirst, int scoreSecond, LocalDateTime matchDate, String status,
                   String nameFirst, String tagFirst, String tagSecond, String nameSecond, String type,
                   int tier, ArrayList<HashMap<String, Object>> maps, ArrayList<HashMap<String, Object>> logs,
                   ArrayList<Player> activePlayers, String ct, String t, String description, ArrayList<String> veto,
                   String format){
        this.matchId = matchId;
        this.scoreFirst = scoreFirst;
        this.scoreSecond = scoreSecond;
        this.matchDate = matchDate;
        this.status = status;
        this.nameFirst = nameFirst;
        this.tagFirst = tagFirst;
        this.tagSecond = tagSecond;
        this.nameSecond = nameSecond;
        this.type = type;
        this.tier = tier;
        this.maps = maps;
        this.logs = logs;
        this.activePlayers = activePlayers;
        this.ct = ct;
        this.t = t;
        this.description = description;
        this.veto = veto;
        this.format = format;
    }


    @Override
    public String toString() {
        String day = fix_number(matchDate.getDayOfMonth());
        String month = fix_number(matchDate.getMonthValue());
        String hour = fix_number(matchDate.getHour());
        String minutes = fix_number(matchDate.getMinute());

        return String.format("Matches{matchId=%s, scoreFirst=%d, scoreSecond=%d, " +
                        "matchDate=%s-%s-%d %s:%s, status=%s, nameFirst=%s, tagFirst=%s, tagSecond=%s, " +
                        "nameSecond=%s, type=%s, tier=%s, maps=%s, logs=%s, activePlayers=%s, ct=%s, t=%s, " +
                        "description=%s, veto=%s, format=%s}",
                matchId, scoreFirst, scoreSecond, day, month, matchDate.getYear(), hour, minutes,
                status, nameFirst, tagFirst, tagSecond, nameSecond, type, tier, maps.toString(),
                logs.toString(), activePlayers.toString(), ct, t, description, veto.toString(), format);
    }


    private String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }
}
