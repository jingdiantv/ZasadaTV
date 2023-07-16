package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.dto.FlagNameDTO;
import com.example.zasada_tv.controllers.dto.TeamInfoDTO;
import com.example.zasada_tv.controllers.dto.TrophiesDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;


    public ArrayList<TrophiesDTO> getTeamTrophies(String id) {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);
        ArrayList<String> trophies = teamDoc.getTrophies();

        ArrayList<TrophiesDTO> list = new ArrayList<>();
        for (String trophy : trophies) {
            list.add(new TrophiesDTO(trophy));
        }

        return list;
    }


    public TeamInfoDTO getTeamInfo(String id) {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        //teamInfo.put("trophies", teamDoc.getTrophies());

        ArrayList<FlagNameDTO> players = new ArrayList<>();

        List<String> teamPlayers = teamDoc.getPlayers();

        for (String player : teamPlayers) {
            PlayerDoc flagPlayer = playerRepository.findByNick(player).get(0);
            players.add(new FlagNameDTO(flagPlayer.getCountry(), player));
        }

        return new TeamInfoDTO(teamDoc.getCity(), teamDoc.getCountry(), teamDoc.getDescription(), teamDoc.getTop(), teamName, players);
    }


    public Boolean isParticipant(String id, String player) {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        return teamDoc.getPlayers().contains(player);
    }


    public Boolean isCaptain(String id, String player) {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        boolean isParticipant = teamDoc.getPlayers().contains(player);

        boolean isCap = teamDoc.getCaptain().equals(player);

        return isParticipant && isCap;
    }
}
