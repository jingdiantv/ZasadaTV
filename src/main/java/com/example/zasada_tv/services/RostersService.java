package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.tabs.player_tabs.dto.RosterDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.embedded.Rosters;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Objects;

import static java.time.temporal.ChronoUnit.DAYS;


@Service
@RequiredArgsConstructor
public class RostersService {
    private final PlayerRepository playerRepository;

    public ArrayList<RosterDTO> getPlayerRosters(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);


        ArrayList<Rosters> rosters = playerDoc.getRosters();

        ArrayList<RosterDTO> playerRosters = new ArrayList<>();

        for (Rosters roster : rosters) {
            LocalDate enterDate = roster.getEnterDate();
            LocalDate exitDate = roster.getExitDate();

            String period = getPeriod(enterDate) + " - " + getPeriod(exitDate);

            long dayDiff = getDayDiff(enterDate, exitDate);

            playerRosters.add(new RosterDTO(roster.getTeamName(), period, roster.getTrophies(), dayDiff));
        }

        return playerRosters;
    }


    private long getDayDiff(LocalDate enterDate, LocalDate exitDate) {
        return DAYS.between(enterDate, Objects.requireNonNullElseGet(exitDate, LocalDate::now));
    }


    private String getPeriod(LocalDate date) {
        if (date == null)
            return "Настоящее время";

        return getMonth(date.getMonthValue()) + " " + date.getYear();
    }


    private String getMonth(int month) {
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
