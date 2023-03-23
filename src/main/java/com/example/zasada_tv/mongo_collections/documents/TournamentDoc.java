package com.example.zasada_tv.mongo_collections.documents;


import com.example.zasada_tv.mongo_collections.embedded.Matches;
import com.example.zasada_tv.mongo_collections.embedded.Requests;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryTeams;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;


/**
 * Данный класс описывает коллекцию Tournament из базы данных MongoDB
 * */

@Document("Tournament")
public class TournamentDoc {

    @Id
    private String name;

    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;
    private String type; // lan или online
    private String status;
    private String country;
    private String city;
    private String logoLink;
    private String prize;
    private ArrayList<Requests> requests;
    private ArrayList<TournamentHistoryTeams> historyTeams;
    private ArrayList<Matches> matches;


    public TournamentDoc(String name, LocalDateTime dateStart, LocalDateTime dateEnd, String type,
                         String status, String country, String city, String logoLink, String prize,
                         ArrayList<Requests> requests, ArrayList<TournamentHistoryTeams> historyTeams,
                         ArrayList<Matches> matches){
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.status = status;
        this.country = country;
        this.city = city;
        this.logoLink = logoLink;
        this.prize = prize;
        this.requests = requests;
        this.historyTeams = historyTeams;
        this.matches = matches;
    }


    @Override
    public String toString() {
        String dayStart = fix_number(dateStart.getDayOfMonth());
        String monthStart = fix_number(dateStart.getMonthValue());
        String dayEnd = fix_number(dateEnd.getDayOfMonth());
        String monthEnd = fix_number(dateEnd.getMonthValue());

        return String.format("Tournament{name=%s, dateStart=%s-%s, dateEnd=%s-%s-%d, type=%s, status=%s, " +
                        "country=%s, city=%s, logoLink=%s, prize=%s, requests=%s, historyTeams=%s, matches=%s}",
                name, dayStart, monthStart, dayEnd, monthEnd, dateEnd.getYear(), type, status, country,
                city, logoLink, prize, requests.toString(), historyTeams.toString(), matches.toString());
    }


    private String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }
}
