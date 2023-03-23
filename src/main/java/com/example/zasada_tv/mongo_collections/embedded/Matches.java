package com.example.zasada_tv.mongo_collections.embedded;


import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;

import java.time.LocalDateTime;


/**
 * Данный класс описывает вложенный массив Matches коллекции {@link TournamentDoc}
 * базы данных MongoDB
 * */

public class Matches {
    private String matchId;
    private int scoreFirst;
    private int scoreSecond;
    private LocalDateTime matchDate;
    private String status;
    private String nameFirst;
    private String nameSecond;


    public Matches(String matchId, int scoreFirst, int scoreSecond, LocalDateTime matchDate,
                   String status, String nameFirst, String nameSecond){
        this.matchId = matchId;
        this.scoreFirst = scoreFirst;
        this.scoreSecond = scoreSecond;
        this.matchDate = matchDate;
        this.status = status;
        this.nameFirst = nameFirst;
        this.nameSecond = nameSecond;
    }


    @Override
    public String toString() {
        String day = fix_number(matchDate.getDayOfMonth());
        String month = fix_number(matchDate.getMonthValue());
        String hour = fix_number(matchDate.getHour());
        String minutes = fix_number(matchDate.getMinute());

        return String.format("Matches{matchId=%s, scoreFirst=%d, scoreSecond=%d, " +
                        "matchDate=%s-%s-%d %s:%s, status=%s, nameFirst=%s, nameSecond=%s}",
                matchId, scoreFirst, scoreSecond, day, month,
                matchDate.getYear(), hour, minutes, status, nameFirst,
                nameSecond);
    }


    private String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }
}
