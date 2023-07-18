package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.tabs.dto.EventInfoDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryPlayers;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryTeams;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static com.example.zasada_tv.utils.Utils.*;


@Service
@RequiredArgsConstructor
public class AchievementsTabService {
    private final PlayerRepository playerRepository;
    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;


    public ArrayList<EventInfoDTO> getPlayerAchievements(String id, String type) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<EventInfoDTO> idMatches = new ArrayList<>();

        ArrayList<TournamentHistoryPlayers> tournamentHistory = playerDoc.getTournamentHistory();

        for (TournamentHistoryPlayers tournament : tournamentHistory) {
            String evName = tournament.getTournamentName();
            TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
            if (fullEv.getType().equals(type)) {

                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());

                idMatches.add(new EventInfoDTO(evName, getPlace(fullEv, tournament.getTeamName(), ""), dateStart + " - " + dateEnd));
            }
        }

        return idMatches;
    }


    public ArrayList<EventInfoDTO> getTeamAchievements(String id, String type) {
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        ArrayList<EventInfoDTO> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        for (TournamentDoc tournament : tournaments) {
            String evName = tournament.getName();
            TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
            if (fullEv.getType().equals(type)) {

                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());

                idMatches.add(new EventInfoDTO(evName, getPlace(fullEv, idName, ""), dateStart + " - " + dateEnd));
            }
        }

        return idMatches;
    }
}
