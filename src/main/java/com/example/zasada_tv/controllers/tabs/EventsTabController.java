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
import java.util.Map;

import static com.example.zasada_tv.controllers.helpers.Helper.parseMatchDate;
import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class EventsTabController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TeamRepository teamRepository;


    @RequestMapping(value = "/getPlayerEventsByType/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, Object>>> getPlayerEventsByType(@PathVariable("id") String id, @PathVariable("type") String type){
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<HashMap<String, Object>> idMatches = new ArrayList<>();

        if (!type.equals("ended")){
            List<TournamentDoc> tournaments = tournamentRepository.findAll();

            String team = playerDoc.getTeamName();

            for (TournamentDoc tournament : tournaments) {
                if (!tournament.getStatus().equals("ended")) {
                    HashMap<String, String> participants = tournament.getParticipants();

                    if (participants.containsKey(team) || participants.containsKey(id)) {
                        HashMap<String, Object> event = new HashMap<>();
                        event.put("name", tournament.getName());

                        String dateStart = parseMatchDate(tournament.getDateStart());
                        String dateEnd = parseMatchDate(tournament.getDateEnd());
                        event.put("date", dateStart + " - " + dateEnd);

                        ArrayList<HashMap<String, String>> participantsName = new ArrayList<>();

                        for (Map.Entry<String, String> set : participants.entrySet()) {
                            HashMap<String, String> part = new HashMap<>();
                            part.put("name", set.getKey());
                            participantsName.add(part);
                        }

                        event.put("participants", participantsName);

                        idMatches.add(event);
                    }
                }
            }
        } else {
            ArrayList<TournamentHistoryPlayers> ended = playerDoc.getTournamentHistory();

            for (TournamentHistoryPlayers ev : ended) {
                String evName = ev.getTournamentName();

                TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
                if (fullEv.getStatus().equals("ended")) {
                    HashMap<String, Object> event = new HashMap<>();

                    event.put("name", evName);

                    String dateStart = parseMatchDate(fullEv.getDateStart());
                    String dateEnd = parseMatchDate(fullEv.getDateEnd());
                    event.put("date", dateStart + " - " + dateEnd);

                    HashMap<String, String> participants = fullEv.getParticipants();

                    String place;
                    if (participants.containsKey(ev.getTeamName()))
                        place = participants.get(ev.getTeamName());
                    else
                        place = participants.get(id);

                    if (place.endsWith("1") || place.endsWith("2") || place.endsWith("4"))
                        place += "ое";
                    else if (place.endsWith("3"))
                        place += "е";

                    event.put("place", place);
                    idMatches.add(event);
                }
            }
        }

        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getPlayerAttendedEvents/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, String>>> getPlayerAttendedEvents(@PathVariable String id){
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<HashMap<String, String>> idMatches = new ArrayList<>();

        ArrayList<TournamentHistoryPlayers> playerEvents = playerDoc.getTournamentHistory();

        for (TournamentHistoryPlayers event : playerEvents){
            String eventName = event.getTournamentName();
            TournamentDoc fullEv = tournamentRepository.findByName(eventName).get(0);

            if (fullEv.getStatus().equals("ended")){
                HashMap<String, String> ev = new HashMap<>();
                ev.put("event", eventName);
                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());
                ev.put("date", dateStart + " - " + dateEnd);

                String teamName = event.getTeamName();

                String place = fullEv.getParticipants().get(teamName);
                ev.put("place", place);

                ev.put("team", teamName);

                idMatches.add(ev);
            }
        }

        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getTeamEventsByType/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, Object>>> getTeamEventsByType(@PathVariable("id") String id, @PathVariable("type") String type){
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        ArrayList<HashMap<String, Object>> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        if (!type.equals("ended")){
            for (TournamentDoc tournament : tournaments) {
                if (!tournament.getStatus().equals("ended")) {
                    HashMap<String, String> participants = tournament.getParticipants();

                    if (participants.containsKey(idName)) {
                        HashMap<String, Object> event = new HashMap<>();
                        event.put("name", tournament.getName());

                        String dateStart = parseMatchDate(tournament.getDateStart());
                        String dateEnd = parseMatchDate(tournament.getDateEnd());
                        event.put("date", dateStart + " - " + dateEnd);

                        ArrayList<HashMap<String, String>> participantsName = new ArrayList<>();

                        for (Map.Entry<String, String> set : participants.entrySet()) {
                            HashMap<String, String> part = new HashMap<>();
                            part.put("name", set.getKey());
                            participantsName.add(part);
                        }

                        event.put("participants", participantsName);

                        idMatches.add(event);
                    }
                }
            }
        } else {

            for (TournamentDoc tournament : tournaments) {
                String evName = tournament.getName();

                TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
                if (fullEv.getStatus().equals("ended")) {
                    HashMap<String, Object> event = new HashMap<>();

                    event.put("name", evName);

                    String dateStart = parseMatchDate(fullEv.getDateStart());
                    String dateEnd = parseMatchDate(fullEv.getDateEnd());
                    event.put("date", dateStart + " - " + dateEnd);

                    HashMap<String, String> participants = fullEv.getParticipants();

                    String place = participants.get(idName);

                    if (place.endsWith("1") || place.endsWith("2") || place.endsWith("4"))
                        place += "ое";
                    else if (place.endsWith("3"))
                        place += "е";

                    event.put("place", place);
                    idMatches.add(event);
                }
            }
        }

        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/geTeamAttendedEvents/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<HashMap<String, String>>> geTeamAttendedEvents(@PathVariable String id){
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);


        ArrayList<HashMap<String, String>> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        for (TournamentDoc tournament : tournaments){
            String eventName = tournament.getName();
            TournamentDoc fullEv = tournamentRepository.findByName(eventName).get(0);

            if (fullEv.getStatus().equals("ended")){
                HashMap<String, String> ev = new HashMap<>();
                ev.put("event", eventName);
                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());
                ev.put("date", dateStart + " - " + dateEnd);

                String place = fullEv.getParticipants().get(idName);
                ev.put("place", place);

                ev.put("team", idName);

                idMatches.add(ev);
            }
        }

        return ResponseEntity.ok(idMatches);
    }
}
