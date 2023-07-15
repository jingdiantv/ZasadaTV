package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.dto.FlagNameDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.embedded.Rosters;
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
public class ExPlayersService {
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;


    public ArrayList<FlagNameDTO> getExPlayers(String id){
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        List<PlayerDoc> playerDocList = playerRepository.findAll();

        ArrayList<FlagNameDTO> exPlayers = new ArrayList<>();

        for (PlayerDoc playerDoc : playerDocList){
            ArrayList<Rosters> playerRosters = playerDoc.getRosters();

            for (Rosters roster : playerRosters){
                if (roster.getTeamName().equals(idName) && roster.getExitDate() != null){
                    exPlayers.add(new FlagNameDTO(playerDoc.getCountry(), playerDoc.getNick()));
                }
            }
        }

        return exPlayers;
    }
}
