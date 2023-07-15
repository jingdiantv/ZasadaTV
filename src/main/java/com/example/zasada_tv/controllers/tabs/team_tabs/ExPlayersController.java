package com.example.zasada_tv.controllers.tabs.team_tabs;


import com.example.zasada_tv.controllers.dto.FlagNameDTO;
import com.example.zasada_tv.services.ExPlayersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class ExPlayersController {

    private final ExPlayersService exPlayersService;


    public ExPlayersController(ExPlayersService exPlayersService) {
        this.exPlayersService = exPlayersService;
    }


    @RequestMapping(value = "/getExPlayers/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<FlagNameDTO>> getExPlayers(@PathVariable String id) {
        ArrayList<FlagNameDTO> exPlayers = exPlayersService.getExPlayers(id);
        return ResponseEntity.ok(exPlayers);
    }
}
