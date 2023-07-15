package com.example.zasada_tv.controllers;


import com.example.zasada_tv.controllers.dto.FlagNameDTO;
import com.example.zasada_tv.controllers.dto.TeamInfoDTO;
import com.example.zasada_tv.controllers.dto.TrophiesDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class TeamController {

    private final TeamService teamService;


    public TeamController(TeamService teamService){
        this.teamService = teamService;
    }


    @RequestMapping(value = "/getTeamTrophies/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArrayList<TrophiesDTO>> getTeamTrophies(@PathVariable String id) throws IOException {
        ArrayList<TrophiesDTO> list = teamService.getTeamTrophies(id);
        return ResponseEntity.ok(list);
    }


    @RequestMapping(value = "/getTeamInfo/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TeamInfoDTO> getTeamInfo(@PathVariable String id) throws IOException {
        TeamInfoDTO teamInfo = teamService.getTeamInfo(id);
        return ResponseEntity.ok(teamInfo);
    }

    @RequestMapping(value = "/isParticipant/{id}/{player}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> isParticipant(@PathVariable("id") String id, @PathVariable("player") String player) throws IOException {
        boolean isParticipant = teamService.isParticipant(id, player);
        return ResponseEntity.ok(isParticipant);
    }


    @RequestMapping(value = "/isCaptain/{id}/{player}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> isCaptain(@PathVariable("id") String id, @PathVariable("player") String player) throws IOException {
        boolean isCaptain = teamService.isCaptain(id, player);
        return ResponseEntity.ok(isCaptain);
    }
}
