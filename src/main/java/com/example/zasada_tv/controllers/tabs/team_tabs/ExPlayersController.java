package com.example.zasada_tv.controllers.tabs.team_tabs;


import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.embedded.Rosters;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class ExPlayersController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PlayerRepository playerRepository;


    @RequestMapping(value = "/getRosters/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, String>>> getRosters(@PathVariable String id){
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        List<PlayerDoc> playerDocList = playerRepository.findAll();

        ArrayList<HashMap<String, String>> exPlayers = new ArrayList<>();

        for (PlayerDoc playerDoc : playerDocList){
            ArrayList<Rosters> playerRosters = playerDoc.getRosters();

            for (Rosters roster : playerRosters){
                if (roster.getTeamName().equals(idName) && roster.getExitDate() != null){
                    HashMap<String, String> exPlayer = new HashMap<>();

                    exPlayer.put("nick", playerDoc.getNick());
                    exPlayer.put("country", playerDoc.getCountry());

                    exPlayers.add(exPlayer);
                }
            }
        }

        return ResponseEntity.ok(exPlayers);
    }
}
