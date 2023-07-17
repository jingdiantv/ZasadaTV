package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.dto.NameDTO;
import com.example.zasada_tv.controllers.tabs.dto.AttendedEventDTO;
import com.example.zasada_tv.controllers.tabs.dto.EventInfoDTO;
import com.example.zasada_tv.controllers.tabs.dto.EventParticipantsDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryPlayers;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

import static com.example.zasada_tv.utils.Utils.parseMatchDate;
import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@Service
@RequiredArgsConstructor
public class EventsTabService {
    private final PlayerRepository playerRepository;
    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;


    public ArrayList<Object> getPlayerEventsByType(String id, String type) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        if (!type.equals("ended")) {
            return getPlayerOngoingEvents(id);
        } else {
            return getPlayerEndedEvents(id);
        }
    }


    public ArrayList<AttendedEventDTO> getPlayerAttendedEvents(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<AttendedEventDTO> idMatches = new ArrayList<>();

        ArrayList<TournamentHistoryPlayers> playerEvents = playerDoc.getTournamentHistory();

        for (TournamentHistoryPlayers event : playerEvents) {
            String eventName = event.getTournamentName();
            TournamentDoc fullEv = tournamentRepository.findByName(eventName).get(0);

            if (fullEv.getStatus().equals("ended")) {
                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());

                String teamName = event.getTeamName();

                String place = fullEv.getParticipants().get(teamName);

                idMatches.add(new AttendedEventDTO(eventName, dateStart + " - " + dateEnd, place, teamName));
            }
        }

        return idMatches;
    }


    public ArrayList<Object> getTeamEventsByType(String id, String type) {
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        if (!type.equals("ended")) {
            return getTeamOngoingEvents(idName);
        } else {
            return getTeamEndedEvents(idName);
        }
    }


    public ArrayList<AttendedEventDTO> getTeamAttendedEvents(String id) {
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);


        ArrayList<AttendedEventDTO> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        for (TournamentDoc tournament : tournaments) {
            String eventName = tournament.getName();
            TournamentDoc fullEv = tournamentRepository.findByName(eventName).get(0);

            if (fullEv.getStatus().equals("ended")) {
                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());

                String place = fullEv.getParticipants().get(idName);

                idMatches.add(new AttendedEventDTO(eventName, dateStart + " - " + dateEnd, place, idName));
            }
        }

        return idMatches;
    }


    private ArrayList<Object> getTeamOngoingEvents(String idName) {
        ArrayList<Object> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        for (TournamentDoc tournament : tournaments) {
            if (!tournament.getStatus().equals("ended")) {
                HashMap<String, String> participants = tournament.getParticipants();

                if (participants.containsKey(idName)) {

                    String dateStart = parseMatchDate(tournament.getDateStart());
                    String dateEnd = parseMatchDate(tournament.getDateEnd());

                    ArrayList<NameDTO> participantsName = new ArrayList<>();

                    for (Map.Entry<String, String> set : participants.entrySet()) {
                        participantsName.add(new NameDTO(set.getKey()));
                    }

                    idMatches.add(new EventParticipantsDTO(tournament.getName(), dateStart + " - " + dateEnd, participantsName));
                }
            }
        }

        return idMatches;
    }


    private ArrayList<Object> getTeamEndedEvents(String idName) {
        ArrayList<Object> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        for (TournamentDoc tournament : tournaments) {
            String evName = tournament.getName();

            TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
            if (fullEv.getStatus().equals("ended")) {

                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());

                HashMap<String, String> participants = fullEv.getParticipants();

                String place = participants.get(idName);

                if (place.endsWith("1") || place.endsWith("2") || place.endsWith("4"))
                    place += "ое";
                else if (place.endsWith("3"))
                    place += "е";

                idMatches.add(new EventInfoDTO(evName, place, dateStart + " - " + dateEnd));
            }
        }

        return idMatches;
    }


    private ArrayList<Object> getPlayerOngoingEvents(String id) {
        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<Object> idMatches = new ArrayList<>();

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        AtomicReference<String> team = new AtomicReference<>("");

        playerDoc.getRosters().forEach((elem)->{
            if (elem.getExitDate() == null)
                team.set(elem.getTeamName());
        });

        for (TournamentDoc tournament : tournaments) {
            if (!tournament.getStatus().equals("ended")) {
                HashMap<String, String> participants = tournament.getParticipants();

                if (participants.containsKey(team.get()) || participants.containsKey(id)) {

                    String dateStart = parseMatchDate(tournament.getDateStart());
                    String dateEnd = parseMatchDate(tournament.getDateEnd());

                    ArrayList<NameDTO> participantsName = new ArrayList<>();

                    for (Map.Entry<String, String> set : participants.entrySet()) {
                        participantsName.add(new NameDTO(set.getKey()));
                    }

                    idMatches.add(new EventParticipantsDTO(tournament.getName(), dateStart + " - " + dateEnd, participantsName));
                }
            }
        }

        return idMatches;
    }


    private ArrayList<Object> getPlayerEndedEvents(String id) {
        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<Object> idMatches = new ArrayList<>();

        ArrayList<TournamentHistoryPlayers> ended = playerDoc.getTournamentHistory();

        for (TournamentHistoryPlayers ev : ended) {
            String evName = ev.getTournamentName();

            TournamentDoc fullEv = tournamentRepository.findByName(evName).get(0);
            if (fullEv.getStatus().equals("ended")) {

                String dateStart = parseMatchDate(fullEv.getDateStart());
                String dateEnd = parseMatchDate(fullEv.getDateEnd());

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

                idMatches.add(new EventInfoDTO(evName, place, dateStart + " - " + dateEnd));
            }
        }

        return idMatches;
    }
}
