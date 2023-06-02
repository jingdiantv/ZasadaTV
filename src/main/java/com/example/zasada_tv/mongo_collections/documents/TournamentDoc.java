package com.example.zasada_tv.mongo_collections.documents;


import com.example.zasada_tv.mongo_collections.embedded.Matches;
import com.example.zasada_tv.mongo_collections.embedded.Requests;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryTeams;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;


/**
 * Данный класс описывает коллекцию Tournament из базы данных MongoDB
 * */

@Document("Tournament")
@Getter
@Setter
public class TournamentDoc {

    @Id
    private int id;

    private String name;

    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;
    private String type; // lan или online
    private String status;
    private String country;
    private String city;
    private String logoLink;
    private String trophyLink;
    private String prize;
    private ArrayList<Requests> requests;
    private ArrayList<TournamentHistoryTeams> historyTeams;
    private ArrayList<Matches> matches;
    private HashMap<String, String> participants;


    public TournamentDoc(int id, String name, LocalDateTime dateStart, LocalDateTime dateEnd, String type,
                         String status, String country, String city, String logoLink, String trophyLink, String prize,
                         ArrayList<Requests> requests, ArrayList<TournamentHistoryTeams> historyTeams,
                         ArrayList<Matches> matches, HashMap<String, String> participants){
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.status = status;
        this.country = country;
        this.city = city;
        this.logoLink = logoLink;
        this.trophyLink = trophyLink;
        this.prize = prize;
        this.requests = requests;
        this.historyTeams = historyTeams;
        this.matches = matches;
        this.participants = participants;
    }


    @Override
    public String toString() {
        String dayStart = fix_number(dateStart.getDayOfMonth());
        String monthStart = fix_number(dateStart.getMonthValue());
        String dayEnd = fix_number(dateEnd.getDayOfMonth());
        String monthEnd = fix_number(dateEnd.getMonthValue());

        return String.format("Tournament{id=%s, name=%s, dateStart=%s-%s, dateEnd=%s-%s-%d, type=%s, status=%s, " +
                        "country=%s, city=%s, logoLink=%s, trophyLink=%s, prize=%s, requests=%s, " +
                        "historyTeams=%s, matches=%s, participants=%s}",
                id, name, dayStart, monthStart, dayEnd, monthEnd, dateEnd.getYear(), type, status, country,
                city, logoLink, trophyLink, prize, requests.toString(), historyTeams.toString(),
                matches.toString(), participants.toString());
    }


    private String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }
}
