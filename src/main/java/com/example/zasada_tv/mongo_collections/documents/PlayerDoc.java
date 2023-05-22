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

    private String password;

    private String nick;
    private String firstName;
    private String secondName;
    private LocalDateTime bdate;
    private String country;
    private String city;
    private String steam;
    private String faceit;
    private String discord;
    private String vk;
    private String teamName;
    private String teamRole; // капитан, игрок
    private String photoLink;
    private String email;
    private ArrayList<TournamentHistoryPlayers> tournamentHistory;
    private ArrayList<PlayerStats> playerStats;


    public PlayerDoc(String userId, String password, String nick, String firstName, String secondName, LocalDateTime bdate, String country,
                     String city, String steam, String faceit, String discord, String vk, String teamName,
                     String teamRole, String photoLink, String email, ArrayList<TournamentHistoryPlayers> tournamentHistory,
                     ArrayList<PlayerStats> playerStats){
        this.userId = userId;
        this.password = password;
        this.nick = nick;
        this.firstName = firstName;
        this.secondName = secondName;
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
        this.email = email;
        this.tournamentHistory = tournamentHistory;
        this.playerStats = playerStats;
    }


    @Override
    public String toString() {
        String day = fix_number(bdate.getDayOfMonth());
        String month = fix_number(bdate.getMonthValue());

        return String.format("Player{userId=%s, password=%s, nick=%s, firstName=%s, secondName=%s, bdate=%s-%s-%d, country=%s, " +
                        "city=%s, steam=%s, faceit=%s, discord=%s, vk=%s, teamName=%s, teamRole=%s, " +
                        "photoLink=%s, email=%s, tournamentHistory=%s, playerStats=%s}",
                userId, password, nick, firstName, secondName, day, month, bdate.getYear(), country, city, steam, faceit, discord,
                vk, teamName, teamRole, photoLink, email, tournamentHistory.toString(), playerStats.toString());
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


    public String getNick(){
        return nick;
    }


    public String getPassword(){
        return password;
    }


    public String getFirstName() {
        return firstName;
    }


    public String getSecondName() {
        return secondName;
    }


    public String getEmail() {
        return email;
    }


    public String getCountry() {
        return country;
    }


    public String getUserId() {
        return userId;
    }


    public void setPassword(String password){
        this.password = password;
    }
}
