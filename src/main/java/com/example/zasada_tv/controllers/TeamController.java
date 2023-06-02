package com.example.zasada_tv.controllers;


import com.example.zasada_tv.dtos.FlagNameDTO;
import com.example.zasada_tv.dtos.TrophiesDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @RequestMapping(value = "/getTeamTrophies/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArrayList<TrophiesDTO>> getTeamTrophies(@PathVariable String id) throws IOException {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);
        ArrayList<String> trophies = teamDoc.getTrophies();

        ArrayList<TrophiesDTO> list = new ArrayList<>();
        for (String trophy : trophies){
            list.add(new TrophiesDTO(trophy));
        }

        return ResponseEntity.ok(list);
    }


    @RequestMapping(value = "/getTeamInfo/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HashMap<String, Object>> getTeamInfo(@PathVariable String id) throws IOException {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        HashMap<String, Object> teamInfo = new HashMap<>();
        teamInfo.put("city", teamDoc.getCity());
        teamInfo.put("country", teamDoc.getCountry());
        teamInfo.put("description", teamDoc.getDescription());
        teamInfo.put("topPosition", teamDoc.getTop());
        teamInfo.put("name", teamName);
        //teamInfo.put("trophies", teamDoc.getTrophies());

        ArrayList<FlagNameDTO> players = new ArrayList<>();

        List<String> teamPlayers = teamDoc.getPlayers();

        for (String player : teamPlayers){
            PlayerDoc flagPlayer = playerRepository.findByNick(player).get(0);
            players.add(new FlagNameDTO(flagPlayer.getCountry(), player));
        }

        teamInfo.put("players", players);

        return ResponseEntity.ok(teamInfo);
    }

    @RequestMapping(value = "/isParticipant/{id}/{player}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> isParticipant(@PathVariable("id") String id, @PathVariable("player") String player) throws IOException {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        return ResponseEntity.ok(teamDoc.getPlayers().contains(player));
    }


    @RequestMapping(value = "/isCaptain/{id}/{player}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> isCaptain(@PathVariable("id") String id, @PathVariable("player") String player) throws IOException {
        String teamName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        PlayerDoc playerDoc = playerRepository.findByNick(player).get(0);

        boolean isParticipant = teamDoc.getPlayers().contains(player);

        boolean isCap = playerDoc.getTeamRole().equals("Капитан");

        return ResponseEntity.ok(isParticipant && isCap);
    }
}
