package com.example.zasada_tv.controllers.tabs;


import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.Matches;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryPlayers;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryTeams;
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
public class MatchTabController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TournamentRepository tournamentRepository;


    @RequestMapping(value = "/getPlayerMatches/{id}/{status}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, Object>>> getPlayerMatches(@PathVariable("id") String id, @PathVariable("status") String status){
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        ArrayList<TournamentHistoryPlayers> tournamentHistory = playerRepository.findByNick(id).get(0).getTournamentHistory();

        if (tournamentHistory.isEmpty())
            return ResponseEntity.ok(new ArrayList<>());

        ArrayList<HashMap<String, Object>> idMatches = new ArrayList<>();

        for (TournamentHistoryPlayers tournament : tournamentHistory){
            TournamentDoc event = tournamentRepository.findByName(tournament.getTournamentName()).get(0);


            HashMap<String, Object> foundedMatch = new HashMap<>();
            foundedMatch.put("event", tournament.getTournamentName());
            foundedMatch.put("type", event.getStatus());
            HashMap<String, String> participants = event.getParticipants();
            String place;
            if (participants.containsKey(id))
                place = participants.get(id);
            else
                place = participants.get(tournament.getTeamName());

            foundedMatch.put("place", place);

            if (place.isEmpty())
                foundedMatch.put("type", "upcoming");
            else
                foundedMatch.put("type", "ended");

            ArrayList<Matches> matches = tournament.getMatches();
            ArrayList<HashMap<String, Object>> evMatches = new ArrayList<>();

            for (Matches match : matches){
                if (match.getStatus().equals(status)){
                    HashMap<String, Object> evMatch = new HashMap<>();

                    evMatch.put("matchId", match.getMatchId());
                    evMatch.put("date", parseMatchDate(match.getMatchDate()));
                    evMatch.put("leftTeam", match.getNameFirst());
                    evMatch.put("leftTag", match.getTagFirst());
                    evMatch.put("rightTag", match.getTagSecond());
                    evMatch.put("rightTeam", match.getNameSecond());

                    if (status.equals("upcoming")){
                        evMatch.put("leftScore", "-");
                        evMatch.put("rightScore", "-");
                    } else {
                        evMatch.put("leftScore", Integer.toString(match.getScoreFirst()));
                        evMatch.put("rightScore", Integer.toString(match.getScoreSecond()));
                    }

                    evMatches.add(evMatch);
                }
            }
            foundedMatch.put("matches", evMatches);

            idMatches.add(foundedMatch);
        }

        return ResponseEntity.ok(idMatches);

    }


    @RequestMapping(value = "/getPlayerResults/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, Object>>> getPlayerResults(@PathVariable String id){
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<TournamentHistoryPlayers> tournamentHistory = playerDoc.getTournamentHistory();

        ArrayList<HashMap<String, Object>> idMatches = new ArrayList<>();

        ArrayList<HashMap<String, Object>> evMatches = new ArrayList<>();

        for (TournamentHistoryPlayers tournament : tournamentHistory) {

            ArrayList<Matches> matches = tournament.getMatches();

            for (Matches match : matches) {
                if (match.getStatus().equals("ended")) {
                    HashMap<String, Object> evMatch = new HashMap<>();

                    evMatch.put("matchId", match.getMatchId());
                    evMatch.put("event", tournament.getTournamentName());
                    evMatch.put("leftTeam", match.getNameFirst());
                    evMatch.put("leftTag", match.getTagFirst());
                    evMatch.put("rightTag", match.getTagSecond());
                    evMatch.put("rightTeam", match.getNameSecond());
                    evMatch.put("leftScore", Integer.toString(match.getScoreFirst()));
                    evMatch.put("rightScore", Integer.toString(match.getScoreSecond()));
                    evMatch.put("maps", match.getMaps());
                    evMatch.put("tier", Integer.toString(match.getTier()));
                    evMatch.put("date", parseMatchDate(match.getMatchDate()));
                    evMatch.put("tierSrc", "../img/Top_star.svg");

                    evMatches.add(evMatch);
                }
            }
        }

        for (HashMap<String, Object> match : evMatches){
            Object date = match.get("date");
            int idx = isInDict(idMatches, date);
            if (idx != -1){
                ArrayList<HashMap<String, Object>> eventMatches = (ArrayList<HashMap<String, Object>>) idMatches.get(idx).get("matches");
                eventMatches.add(match);
                idMatches.get(idx).put("matches", eventMatches);
            } else {
                HashMap<String, Object> temp = new HashMap<>();
                temp.put("date", date.toString());

                ArrayList<HashMap<String, Object>> eventMatches = new ArrayList<>();
                eventMatches.add(match);
                temp.put("matches", eventMatches);
                idMatches.add(temp);
            }
        }


        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getTeamMatches/{id}/{status}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, Object>>> getTeamMatches(@PathVariable("id") String id, @PathVariable("status") String status){
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        List<TournamentDoc> tournamentDocList = tournamentRepository.findAll();

        ArrayList<HashMap<String, Object>> idMatches = new ArrayList<>();

        for (TournamentDoc tournamentDoc : tournamentDocList){
            HashMap<String, String> participants = tournamentDoc.getParticipants();

            if (participants.containsKey(idName)){
                HashMap<String, Object> foundedMatch = new HashMap<>();
                foundedMatch.put("event", tournamentDoc.getName());
                foundedMatch.put("type", tournamentDoc.getStatus());

                String place = participants.get(idName);

                foundedMatch.put("place", place);

                if (place.isEmpty())
                    foundedMatch.put("type", "upcoming");
                else
                    foundedMatch.put("type", "ended");

                ArrayList<Matches> matches = tournamentDoc.getMatches();
                ArrayList<HashMap<String, Object>> evMatches = new ArrayList<>();

                for (Matches match : matches){
                    if (match.getStatus().equals(status)){
                        HashMap<String, Object> evMatch = new HashMap<>();

                        evMatch.put("matchId", match.getMatchId());
                        evMatch.put("date", parseMatchDate(match.getMatchDate()));
                        evMatch.put("leftTeam", match.getNameFirst());
                        evMatch.put("leftTag", match.getTagFirst());
                        evMatch.put("rightTag", match.getTagSecond());
                        evMatch.put("rightTeam", match.getNameSecond());

                        if (status.equals("upcoming")){
                            evMatch.put("leftScore", "-");
                            evMatch.put("rightScore", "-");
                        } else {
                            evMatch.put("leftScore", Integer.toString(match.getScoreFirst()));
                            evMatch.put("rightScore", Integer.toString(match.getScoreSecond()));
                        }

                        evMatches.add(evMatch);
                    }
                }
                foundedMatch.put("matches", evMatches);

                idMatches.add(foundedMatch);
            }
        }

        return ResponseEntity.ok(idMatches);

    }


    @RequestMapping(value = "/getTeamResults/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, Object>>> getTeamResults(@PathVariable String id){
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        List<TournamentDoc> tournamentDocList = tournamentRepository.findAll();

        ArrayList<HashMap<String, Object>> idMatches = new ArrayList<>();

        for (TournamentDoc tournamentDoc : tournamentDocList) {
            HashMap<String, String> participants = tournamentDoc.getParticipants();

            if (participants.containsKey(idName)){

                ArrayList<HashMap<String, Object>> evMatches = new ArrayList<>();

                ArrayList<Matches> matches = tournamentDoc.getMatches();

                for (Matches match : matches) {
                    if (match.getStatus().equals("ended")) {
                        HashMap<String, Object> evMatch = new HashMap<>();

                        evMatch.put("matchId", match.getMatchId());
                        evMatch.put("event", tournamentDoc.getName());
                        evMatch.put("leftTeam", match.getNameFirst());
                        evMatch.put("leftTag", match.getTagFirst());
                        evMatch.put("rightTag", match.getTagSecond());
                        evMatch.put("rightTeam", match.getNameSecond());
                        evMatch.put("leftScore", Integer.toString(match.getScoreFirst()));
                        evMatch.put("rightScore", Integer.toString(match.getScoreSecond()));
                        evMatch.put("maps", match.getMaps());
                        evMatch.put("tier", Integer.toString(match.getTier()));
                        evMatch.put("date", parseMatchDate(match.getMatchDate()));
                        evMatch.put("tierSrc", "../img/Top_star.svg");

                        evMatches.add(evMatch);
                    }
                }

                for (HashMap<String, Object> match : evMatches){
                    Object date = match.get("date");
                    int idx = isInDict(idMatches, date);
                    if (idx != -1){
                        ArrayList<HashMap<String, Object>> eventMatches = (ArrayList<HashMap<String, Object>>) idMatches.get(idx).get("matches");
                        eventMatches.add(match);
                        idMatches.get(idx).put("matches", eventMatches);
                    } else {
                        HashMap<String, Object> temp = new HashMap<>();
                        temp.put("date", date.toString());

                        ArrayList<HashMap<String, Object>> eventMatches = new ArrayList<>();
                        eventMatches.add(match);
                        temp.put("matches", eventMatches);
                        idMatches.add(temp);
                    }
                }
            }
        }

        return ResponseEntity.ok(idMatches);
    }


    private int isInDict(ArrayList<HashMap<String, Object>> idMatches, Object date){
        for (HashMap<String, Object> idMatch : idMatches) {
            if (idMatch.get("date").equals(date))
                return idMatches.indexOf(idMatch);
        }
        return -1;
    }
}
