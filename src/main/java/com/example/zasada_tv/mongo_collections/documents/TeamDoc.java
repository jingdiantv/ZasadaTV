package com.example.zasada_tv.mongo_collections.documents;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


/**
 * Данный класс описывает коллекцию Team из базы данных MongoDB
 * */

@Document("Team")
@Getter
@Setter
public class TeamDoc {

    @Id
    private String teamName;

    private String tag;
    String captain;
    private String description;
    private String country;
    private String city;
    private String logoLink;
    private int top;
    private int topDiff;
    private List<String> players;
    private ArrayList<String> trophies;


    public TeamDoc(String teamName, String tag, String captain, String description, String country, String city,
                   String logoLink, int top, int topDiff, List<String> players, ArrayList<String> trophies){
        this.teamName = teamName;
        this.tag = tag;
        this.captain = captain;
        this.description = description;
        this.country = country;
        this.city = city;
        this.logoLink = logoLink;
        this.top = top;
        this.topDiff = topDiff;
        this.players = players;
        this.trophies = trophies;
    }


    @Override
    public String toString() {
        return String.format("Team{teamName=%s, tag=%s, captain=%s, description=%s, country=%s, city=%s, " +
                        "logoLink=%s, top=%d, topDiff=%d, players=%s, trophies=%s}",
                teamName, tag, captain, description, country, city, logoLink, top, topDiff,
                players.toString(), trophies.toString());
    }
}
