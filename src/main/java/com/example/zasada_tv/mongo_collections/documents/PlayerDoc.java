package com.example.zasada_tv.mongo_collections.documents;


import com.example.zasada_tv.mongo_collections.embedded.PlayerStats;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryPlayers;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;


/**
 * Данный класс описывает коллекцию Player из базы данных MongoDB
 * */

@Document("Player")
public class PlayerDoc {

    @Id
    private String userId;

    private String nick;
    private String fname;
    private LocalDateTime bdate;
    private String country;
    private String city;
    private String steam;
    private String faceit;
    private String discord;
    private String vk;
    private String teamName;
    private String teamRole; // капитан, офицер, игрок
    private String photoLink;
    private ArrayList<TournamentHistoryPlayers> tournamentHistory;
    private ArrayList<PlayerStats> playerStats;


    public PlayerDoc(String userId, String nick, String fname, LocalDateTime bdate, String country,
                     String city, String steam, String faceit, String discord, String vk, String teamName,
                     String teamRole, String photoLink, ArrayList<TournamentHistoryPlayers> tournamentHistory,
                     ArrayList<PlayerStats> playerStats){
        this.userId = userId;
        this.nick = nick;
        this.fname = fname;
        this.bdate = bdate;
        this.country = country;
        this.city = city;
        this.steam = steam;
        this.faceit = faceit;
        this.discord = discord;
        this.vk = vk;
        this.teamName = teamName;
        this.teamRole = teamRole;
        this.photoLink = photoLink;
        this.tournamentHistory = tournamentHistory;
        this.playerStats = playerStats;
    }


    @Override
    public String toString() {
        String day = fix_number(bdate.getDayOfMonth());
        String month = fix_number(bdate.getMonthValue());

        return String.format("Player{userId=%s, nick=%s, fname=%s, bdate=%s-%s-%d, country=%s, " +
                        "city=%s, steam=%s, faceit=%s, discord=%s, vk=%s, teamName=%s, teamRole=%s, " +
                        "photoLink=%s, tournamentHistory=%s, playerStats=%s}",
                userId, nick, fname, day, month, bdate.getYear(), country, city, steam, faceit, discord,
                vk, teamName, teamRole, photoLink, tournamentHistory.toString(), playerStats.toString());
    }


    private String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }


    public ArrayList<PlayerStats> getPlayerStats() {
        return playerStats;
    }
}
