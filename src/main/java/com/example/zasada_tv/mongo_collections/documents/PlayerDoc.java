package com.example.zasada_tv.mongo_collections.documents;


import com.example.zasada_tv.dto.StatsDTO;
import com.example.zasada_tv.mongo_collections.embedded.PlayerMatchStats;
import com.example.zasada_tv.mongo_collections.embedded.Rosters;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryPlayers;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;

import static com.example.zasada_tv.utils.Utils.fix_number;


/**
 * Данный класс описывает коллекцию Player из базы данных MongoDB
 */

@Document("Player")
@Getter
@Setter
public class PlayerDoc {

    @Id
    private int userID;

    private String nick;
    private String password;
    private String firstName;
    private String secondName;
    private LocalDate bdate;
    private String country;
    private String city;
    private String steam;
    private String faceit;
    private String discord;
    private String vk;
    private String photoLink;
    private String email;
    private ArrayList<TournamentHistoryPlayers> tournamentHistory;
    private ArrayList<PlayerMatchStats> playerMatchStats;
    private ArrayList<String> trophies;
    private StatsDTO stats;
    private ArrayList<Rosters> rosters;


    public PlayerDoc(int userID, String nick, String firstName, String secondName, String country, String email) {
        this.userID = userID;
        this.password = "";
        this.nick = nick;
        this.firstName = firstName;
        this.secondName = secondName;
        this.bdate = LocalDate.of(100, Month.JANUARY, 5);
        this.country = country;
        this.city = "";
        this.steam = "";
        this.faceit = "";
        this.discord = "";
        this.vk = "";
        this.email = email;
        this.photoLink = "/players/NonPhoto.png";
        this.tournamentHistory = new ArrayList<>();
        this.playerMatchStats = new ArrayList<>();
        this.trophies = new ArrayList<>();
        this.stats = new StatsDTO();
        this.rosters = new ArrayList<>();
    }


    @Override
    public String toString() {
        String day = "";
        String month = "";
        String year = "";
        if (bdate != null) {
            day = fix_number(bdate.getDayOfMonth());
            month = fix_number(bdate.getMonthValue());
            year = String.valueOf(bdate.getYear());
        }

        return String.format("Player{userID=%d, password=%s, nick=%s, firstName=%s, secondName=%s, bdate=%s-%s-%s, country=%s, " +
                        "city=%s, steam=%s, faceit=%s, discord=%s, vk=%s, " +
                        "photoLink=%s, email=%s, tournamentHistory=%s, playerMatchStats=%s, trophies=%s, stats=%s, rosters=%s}",
                userID, password, nick, firstName, secondName, day, month, year, country, city, steam, faceit, discord,
                vk, photoLink, email, tournamentHistory.toString(), playerMatchStats.toString(),
                trophies.toString(), stats.toString(), rosters.toString());
    }
}
