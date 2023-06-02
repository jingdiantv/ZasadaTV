package com.example.zasada_tv.controllers.tabs.player_tabs;


import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.embedded.Rosters;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;

import static java.time.temporal.ChronoUnit.DAYS;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class RostersController {

    @Autowired
    private PlayerRepository playerRepository;


    @RequestMapping(value = "/getPlayerRosters/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, Object>>> getPlayerResults(@PathVariable String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);


        ArrayList<Rosters> rosters = playerDoc.getRosters();

        ArrayList<HashMap<String, Object>> playerRosters = new ArrayList<>();

        for (Rosters roster : rosters){
            HashMap<String, Object> rosterInfo = new HashMap<>();

            rosterInfo.put("team", roster.getTeamName());

            LocalDate enterDate = roster.getEnterDate();
            LocalDate exitDate = roster.getExitDate();

            String period = getPeriod(enterDate);
            period += " - " + getPeriod(exitDate);

            rosterInfo.put("period", period);
            rosterInfo.put("trophies", roster.getTrophies());

            long dayDiff = getDayDiff(enterDate, exitDate);
            rosterInfo.put("dayDiff", dayDiff);

            playerRosters.add(rosterInfo);
        }

        return ResponseEntity.ok(playerRosters);
    }


    private long getDayDiff(LocalDate enterDate, LocalDate exitDate){
        if (exitDate == null){
            return DAYS.between(enterDate, LocalDate.now());
        }

        return DAYS.between(enterDate, exitDate);
    }


    private String getPeriod(LocalDate date){
        if (date == null)
            return "Настоящее время";

        return getMonth(date.getMonthValue()) + " " + date.getYear();
    }


    private String getMonth(int month){
        return switch (month) {
            case 1 -> "Январь";
            case 2 -> "Февраль";
            case 3 -> "Март";
            case 4 -> "Апрель";
            case 5 -> "Май";
            case 6 -> "Июнь";
            case 7 -> "Июль";
            case 8 -> "Август";
            case 9 -> "Сентябрь";
            case 10 -> "Октябрь";
            case 11 -> "Ноябрь";
            case 12 -> "Декабрь";
            default -> "";
        };
    }
}
