package com.example.zasada_tv.controllers.tabs.player_tabs;


import com.example.zasada_tv.controllers.tabs.player_tabs.dto.RosterDTO;
import com.example.zasada_tv.services.RostersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class RostersController {

    private final RostersService rostersService;


    public RostersController(RostersService rostersService) {
        this.rostersService = rostersService;
    }


    @RequestMapping(value = "/getPlayerRosters/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<RosterDTO>> getPlayerRosters(@PathVariable String id) {
        ArrayList<RosterDTO> playerRosters = rostersService.getPlayerRosters(id);
        return ResponseEntity.ok(playerRosters);
    }


}
