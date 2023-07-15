package com.example.zasada_tv.controllers.tabs;


import com.example.zasada_tv.controllers.tabs.dto.MatchTabInfoDTO;
import com.example.zasada_tv.controllers.tabs.dto.MatchesByDateDTO;
import com.example.zasada_tv.services.MatchTabService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class MatchTabController {

    private final MatchTabService matchTabService;

    public MatchTabController(MatchTabService matchTabService) {
        this.matchTabService = matchTabService;
    }


    @RequestMapping(value = "/getPlayerMatches/{id}/{status}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<MatchTabInfoDTO>> getPlayerMatches(@PathVariable("id") String id, @PathVariable("status") String status) {
        ArrayList<MatchTabInfoDTO> idMatches = matchTabService.getPlayerMatches(id, status);
        return ResponseEntity.ok(idMatches);

    }


    @RequestMapping(value = "/getPlayerResults/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<MatchesByDateDTO>> getPlayerResults(@PathVariable String id) {
        ArrayList<MatchesByDateDTO> idMatches = matchTabService.getPlayerResults(id);
        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getTeamMatches/{id}/{status}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<MatchTabInfoDTO>> getTeamMatches(@PathVariable("id") String id, @PathVariable("status") String status) {
        ArrayList<MatchTabInfoDTO> idMatches = matchTabService.getTeamMatches(id, status);
        return ResponseEntity.ok(idMatches);

    }


    @RequestMapping(value = "/getTeamResults/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<MatchesByDateDTO>> getTeamResults(@PathVariable String id) {
        ArrayList<MatchesByDateDTO> idMatches = matchTabService.getTeamResults(id);
        return ResponseEntity.ok(idMatches);
    }


}
