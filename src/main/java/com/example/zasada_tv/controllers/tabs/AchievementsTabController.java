package com.example.zasada_tv.controllers.tabs;


import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryPlayers;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.example.zasada_tv.controllers.helpers.Helper.parseMatchDate;
import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class AchievementsTabController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TeamRepository teamRepository;


    @RequestMapping(value = "/getPlayerAchievements/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, String>>> getPlayerAchievements(@PathVariable("id") String id, @PathVariable("type") String type){
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<HashMap<String, String>> idMatches = new ArrayList<>();

        ArrayList<TournamentHistoryPlayers> tournamentHistory = playerDoc.getTournamentHistory();

        for (TournamentHistoryPlayers tournament : tournamentHistory){
            String evName = tournament.getTournamentName();
            TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
            if (fullEv.getType().equals(type)) {
                HashMap<String, String> evInfo = new HashMap<>();

                evInfo.put("name", evName);
                evInfo.put("place", fullEv.getParticipants().get(tournament.getTeamName()));

                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());
                evInfo.put("date", dateStart + " - " + dateEnd);

                idMatches.add(evInfo);
            }
        }

        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getTeamAchievements/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, String>>> getTeamAchievements(@PathVariable("id") String id, @PathVariable("type") String type){
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        ArrayList<HashMap<String, String>> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        for (TournamentDoc tournament : tournaments){
            String evName = tournament.getName();
            TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
            if (fullEv.getType().equals(type)) {
                HashMap<String, String> evInfo = new HashMap<>();

                evInfo.put("name", evName);
                evInfo.put("place", fullEv.getParticipants().get(idName));

                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());
                evInfo.put("date", dateStart + " - " + dateEnd);

                idMatches.add(evInfo);
            }
        }

        return ResponseEntity.ok(idMatches);
    }
}
