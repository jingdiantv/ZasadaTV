package com.example.zasada_tv.controllers.tabs;


import com.example.zasada_tv.controllers.tabs.dto.EventInfoDTO;
import com.example.zasada_tv.services.AchievementsTabService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class AchievementsTabController {

    private final AchievementsTabService achievementsTabService;


    public AchievementsTabController(AchievementsTabService achievementsTabService) {
        this.achievementsTabService = achievementsTabService;
    }


    @RequestMapping(value = "/getPlayerAchievements/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<EventInfoDTO>> getPlayerAchievements(@PathVariable("id") String id, @PathVariable("type") String type) {
        ArrayList<EventInfoDTO> idMatches = achievementsTabService.getPlayerAchievements(id, type);
        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getTeamAchievements/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<EventInfoDTO>> getTeamAchievements(@PathVariable("id") String id, @PathVariable("type") String type) {
        ArrayList<EventInfoDTO> idMatches = achievementsTabService.getTeamAchievements(id, type);
        return ResponseEntity.ok(idMatches);
    }
}
