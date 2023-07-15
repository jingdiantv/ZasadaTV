package com.example.zasada_tv.controllers;


import com.example.zasada_tv.controllers.dto.LeftTeamDTO;
import com.example.zasada_tv.controllers.dto.NewDateDTO;
import com.example.zasada_tv.controllers.dto.NewNickDTO;
import com.example.zasada_tv.controllers.dto.NewTeamDTO;
import com.example.zasada_tv.controllers.dto.ChangeSocialDTO;
import com.example.zasada_tv.controllers.dto.SocialDTO;
import com.example.zasada_tv.controllers.dto.TrophiesDTO;
import com.example.zasada_tv.controllers.dto.FlagNameDTO;
import com.example.zasada_tv.controllers.dto.NameDTO;
import com.example.zasada_tv.services.PlayerService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static com.example.zasada_tv.utils.Utils.fillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class PlayerController {

    private final PlayerService playerService;


    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }


    @RequestMapping(value = "/createTeam", method = RequestMethod.POST)
    public ResponseEntity<NewTeamDTO> createTeam(@RequestBody NewTeamDTO newTeam) {
        NewTeamDTO createdTeam = playerService.createTeam(newTeam);
        return ResponseEntity.created(URI.create("/" + fillSpaces(createdTeam.getName()))).body(createdTeam);
    }


    @RequestMapping(value = "/leftTeam", method = RequestMethod.POST)
    public ResponseEntity<LeftTeamDTO> leftTeam(@RequestBody LeftTeamDTO leftTeamDTO) {
        LeftTeamDTO leftTeam = playerService.leftTeam(leftTeamDTO);
        return ResponseEntity.ok(leftTeam);
    }


    @RequestMapping(value = "/changeBDate", method = RequestMethod.POST)
    public ResponseEntity<NewDateDTO> changeBDate(@RequestBody NewDateDTO date) {
        NewDateDTO newDate = playerService.changeBDate(date);
        return ResponseEntity.ok(newDate);
    }


    @RequestMapping(value = "/changeNick", method = RequestMethod.POST)
    public ResponseEntity<NewNickDTO> changeNick(@RequestBody NewNickDTO nick) {
        NewNickDTO newNick = playerService.changeNick(nick);
        return ResponseEntity.ok(newNick);
    }


    @RequestMapping(value = "/changeSocial", method = RequestMethod.POST)
    public ResponseEntity<ChangeSocialDTO> changeSocial(@RequestBody ChangeSocialDTO social) {
        ChangeSocialDTO newSocial = playerService.changeSocial(social);
        return ResponseEntity.ok(newSocial);
    }


    @RequestMapping(value = "/getSocial/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<SocialDTO>> getSocial(@PathVariable String id) {
        ArrayList<SocialDTO> social = playerService.getSocial(id);
        return ResponseEntity.ok(social);
    }


    @RequestMapping(value = "/getPlayerTrophies/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArrayList<TrophiesDTO>> getPlayerTrophies(@PathVariable String id) {
        ArrayList<TrophiesDTO> list = playerService.getPlayerTrophies(id);
        return ResponseEntity.ok(list);
    }


    @RequestMapping(value = "/getNameFlag/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FlagNameDTO>> getNameFlag(@PathVariable String id) {
        List<FlagNameDTO> flagName = playerService.getNameFlag(id);
        return ResponseEntity.ok(flagName);
    }


    @RequestMapping(value = "/getTeam/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<NameDTO>> getTeam(@PathVariable String id) {
        List<NameDTO> teamName = playerService.getTeam(id);
        return ResponseEntity.ok(teamName);
    }


    @RequestMapping(value = "/getAge/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAge(@PathVariable String id) {
        String age = playerService.getAge(id);
        return ResponseEntity.ok(age);
    }
}
