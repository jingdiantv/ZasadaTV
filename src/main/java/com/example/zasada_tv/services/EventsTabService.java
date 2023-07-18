package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.tabs.dto.AttendedEventDTO;
import com.example.zasada_tv.controllers.tabs.dto.EventInfoDTO;
import com.example.zasada_tv.controllers.tabs.dto.EventParticipantsDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.TournamentHistoryTeams;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static com.example.zasada_tv.utils.Utils.*;


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

        List<TournamentDoc> tournamentDocs = tournamentRepository.findAll();

        for (TournamentDoc tournamentDoc : tournamentDocs) {
            tournamentDoc.getHistoryTeams().forEach((team) -> playerDoc.getRosters().forEach((roster) -> {
                LocalDateTime dateStart = tournamentDoc.getDateStart();
                LocalDateTime dateEnd = tournamentDoc.getDateEnd();

                String teamName = team.getTeamName();

                if (roster.getTeamName().equals(teamName) && isInTeam(dateStart.toLocalDate(), dateEnd.toLocalDate(), roster.getEnterDate(), roster.getExitDate()) && (tournamentDoc.getStatus().equals("ended"))) {
                    String dateStartStr = parseMatchDate(dateStart);
                    String dateEndStr = parseMatchDate(dateEnd);

                    idMatches.add(new AttendedEventDTO(tournamentDoc.getName(), dateStartStr + " - " + dateEndStr, getPlace(tournamentDoc, teamName, ""), teamName));
                }
            }));
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

                idMatches.add(new AttendedEventDTO(eventName, dateStart + " - " + dateEnd, getPlace(fullEv, idName, ""), idName));
            }
        }

        return idMatches;
    }


    private ArrayList<Object> getTeamOngoingEvents(String idName) {
        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        return getEndedEvents(tournaments, idName, "");
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

                String place = getPlace(fullEv, idName, "");

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

        List<TournamentDoc> tournaments = tournamentRepository.findAll();

        AtomicReference<String> team = new AtomicReference<>("");

        playerDoc.getRosters().forEach((elem) -> {
            if (elem.getExitDate() == null)
                team.set(elem.getTeamName());
        });

        return getEndedEvents(tournaments, team.get(), id);
    }


    private ArrayList<Object> getPlayerEndedEvents(String id) {
        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<Object> idMatches = new ArrayList<>();

        List<TournamentDoc> tournamentDocs = tournamentRepository.findAll();

        for (TournamentDoc tournamentDoc : tournamentDocs) {
            tournamentDoc.getHistoryTeams().forEach((team) -> playerDoc.getRosters().forEach((roster) -> {
                LocalDateTime dateStart = tournamentDoc.getDateStart();
                LocalDateTime dateEnd = tournamentDoc.getDateEnd();

                String teamName = team.getTeamName();

                if (roster.getTeamName().equals(teamName) && isInTeam(dateStart.toLocalDate(), dateEnd.toLocalDate(), roster.getEnterDate(), roster.getExitDate()) && (tournamentDoc.getStatus().equals("ended"))) {
                    String dateStartStr = parseMatchDate(dateStart);
                    String dateEndStr = parseMatchDate(dateEnd);

                    String place = getPlace(tournamentDoc, teamName, id);

                    if (place.endsWith("1") || place.endsWith("2") || place.endsWith("4"))
                        place += "ое";
                    else if (place.endsWith("3"))
                        place += "е";

                    idMatches.add(new EventInfoDTO(tournamentDoc.getName(), place, dateStartStr + " - " + dateEndStr));
                }
            }));
        }

        return idMatches;
    }


    private ArrayList<Object> getEndedEvents(List<TournamentDoc> tournaments, String teamName, String playerName) {
        ArrayList<Object> idMatches = new ArrayList<>();

        for (TournamentDoc tournament : tournaments) {
            if (!tournament.getStatus().equals("ended")) {

                ArrayList<TournamentHistoryTeams> tournamentHistoryTeams = tournament.getHistoryTeams();

                for (TournamentHistoryTeams tournamentTeam : tournamentHistoryTeams) {
                    if (tournamentTeam.getTeamName().equals(teamName) || tournamentTeam.getTeamName().equals(playerName)) {
                        String dateStart = parseMatchDate(tournament.getDateStart());
                        String dateEnd = parseMatchDate(tournament.getDateEnd());

                        idMatches.add(new EventParticipantsDTO(tournament.getName(), dateStart + " - " + dateEnd, tournamentHistoryTeams));
                    }
                }
            }
        }

        return idMatches;
    }
}
