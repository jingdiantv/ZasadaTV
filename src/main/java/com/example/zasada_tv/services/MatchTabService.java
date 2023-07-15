package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.tabs.dto.EventMatchDTO;
import com.example.zasada_tv.controllers.tabs.dto.MatchInfoDTO;
import com.example.zasada_tv.controllers.tabs.dto.MatchTabInfoDTO;
import com.example.zasada_tv.controllers.tabs.dto.MatchesByDateDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.Matches;
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

import static com.example.zasada_tv.utils.Utils.parseMatchDate;
import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@Service
@RequiredArgsConstructor
public class MatchTabService {
    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;
    private final TournamentRepository tournamentRepository;


    public ArrayList<MatchTabInfoDTO> getPlayerMatches(String id, String status) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        ArrayList<TournamentHistoryPlayers> tournamentHistory = playerRepository.findByNick(id).get(0).getTournamentHistory();

        if (tournamentHistory.isEmpty())
            return new ArrayList<>();

        ArrayList<MatchTabInfoDTO> idMatches = new ArrayList<>();

        for (TournamentHistoryPlayers tournament : tournamentHistory) {
            TournamentDoc event = tournamentRepository.findByName(tournament.getTournamentName()).get(0);

            MatchTabInfoDTO foundedEvent = new MatchTabInfoDTO();
            foundedEvent.setEvent(tournament.getTournamentName());

            HashMap<String, String> participants = event.getParticipants();

            if (participants.containsKey(id))
                foundedEvent.setPlace(participants.get(id));
            else
                foundedEvent.setPlace(participants.get(tournament.getTeamName()));


            if (foundedEvent.getPlace().isEmpty())
                foundedEvent.setType("upcoming");
            else
                foundedEvent.setType("ended");

            ArrayList<Matches> matches = tournament.getMatches();
            ArrayList<EventMatchDTO> evMatches = new ArrayList<>();

            for (Matches match : matches) {
                if (match.getStatus().equals(status)) {
                    EventMatchDTO evMatch = new EventMatchDTO(match.getMatchId(), parseMatchDate(match.getMatchDate()),
                            match.getNameFirst(), match.getTagFirst(), match.getNameSecond(), match.getTagSecond(),
                            "-", "-");

                    if (!status.equals("upcoming")) {
                        evMatch.setLeftScore(Integer.toString(match.getScoreFirst()));
                        evMatch.setRightScore(Integer.toString(match.getScoreSecond()));
                    }

                    evMatches.add(evMatch);
                }
            }
            foundedEvent.setMatches(evMatches);

            idMatches.add(foundedEvent);
        }
        return idMatches;
    }


    public ArrayList<MatchesByDateDTO> getPlayerResults(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        ArrayList<TournamentHistoryPlayers> tournamentHistory = playerDoc.getTournamentHistory();

        ArrayList<MatchesByDateDTO> idMatches = new ArrayList<>();

        ArrayList<MatchInfoDTO> evMatches = new ArrayList<>();

        for (TournamentHistoryPlayers tournament : tournamentHistory) {

            ArrayList<Matches> matches = tournament.getMatches();

            for (Matches match : matches) {
                if (match.getStatus().equals("ended")) {
                    MatchInfoDTO evMatch = new MatchInfoDTO(tournament.getTournamentName(), Integer.toString(match.getTier()), match.getMaps(), "../img/Top_star.svg");

                    evMatch.setMatchId(match.getMatchId());
                    evMatch.setLeftTeam(match.getNameFirst());
                    evMatch.setLeftTag(match.getTagFirst());
                    evMatch.setRightTag(match.getTagSecond());
                    evMatch.setRightTeam(match.getNameSecond());
                    evMatch.setLeftScore(Integer.toString(match.getScoreFirst()));
                    evMatch.setRightScore(Integer.toString(match.getScoreSecond()));
                    evMatch.setDate(parseMatchDate(match.getMatchDate()));


                    evMatches.add(evMatch);
                }
            }
        }

        for (MatchInfoDTO match : evMatches) {
            String date = match.getDate();
            int idx = isInDict(idMatches, date);
            if (idx != -1) {
                List<MatchInfoDTO> eventMatches = idMatches.get(idx).getMatches();
                eventMatches.add(match);
                idMatches.get(idx).setMatches(eventMatches);
            } else {
                MatchesByDateDTO temp = new MatchesByDateDTO(date, List.of(match));
                idMatches.add(temp);
            }
        }

        return idMatches;
    }


    public ArrayList<MatchTabInfoDTO> getTeamMatches(String id, String status) {
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        List<TournamentDoc> tournamentDocList = tournamentRepository.findAll();

        ArrayList<MatchTabInfoDTO> idMatches = new ArrayList<>();

        for (TournamentDoc tournamentDoc : tournamentDocList) {
            HashMap<String, String> participants = tournamentDoc.getParticipants();

            if (participants.containsKey(idName)) {
                MatchTabInfoDTO foundedEvent = new MatchTabInfoDTO();
                foundedEvent.setEvent(tournamentDoc.getName());

                foundedEvent.setPlace(participants.get(idName));

                if (foundedEvent.getPlace().isEmpty())
                    foundedEvent.setType("upcoming");
                else
                    foundedEvent.setType("ended");

                ArrayList<Matches> matches = tournamentDoc.getMatches();
                ArrayList<EventMatchDTO> evMatches = new ArrayList<>();

                for (Matches match : matches) {
                    if (match.getStatus().equals(status)) {
                        EventMatchDTO evMatch = new EventMatchDTO(match.getMatchId(), parseMatchDate(match.getMatchDate()),
                                match.getNameFirst(), match.getTagFirst(), match.getNameSecond(), match.getTagSecond(),
                                "-", "-");

                        if (!status.equals("upcoming")) {
                            evMatch.setLeftScore(Integer.toString(match.getScoreFirst()));
                            evMatch.setRightScore(Integer.toString(match.getScoreSecond()));
                        }

                        evMatches.add(evMatch);
                    }
                }
                foundedEvent.setMatches(evMatches);

                idMatches.add(foundedEvent);
            }
        }

        return idMatches;
    }


    public ArrayList<MatchesByDateDTO> getTeamResults(String id) {
        String idName = unFillSpaces(id);

        if (!teamRepository.existsByTeamName(idName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        List<TournamentDoc> tournamentDocList = tournamentRepository.findAll();

        ArrayList<MatchesByDateDTO> idMatches = new ArrayList<>();

        for (TournamentDoc tournamentDoc : tournamentDocList) {
            HashMap<String, String> participants = tournamentDoc.getParticipants();

            if (participants.containsKey(idName)) {

                ArrayList<MatchInfoDTO> evMatches = new ArrayList<>();

                ArrayList<Matches> matches = tournamentDoc.getMatches();

                for (Matches match : matches) {
                    if (match.getStatus().equals("ended")) {
                        MatchInfoDTO evMatch = new MatchInfoDTO(tournamentDoc.getName(), Integer.toString(match.getTier()), match.getMaps(), "../img/Top_star.svg");

                        evMatch.setMatchId(match.getMatchId());
                        evMatch.setLeftTeam(match.getNameFirst());
                        evMatch.setLeftTag(match.getTagFirst());
                        evMatch.setRightTag(match.getTagSecond());
                        evMatch.setRightTeam(match.getNameSecond());
                        evMatch.setLeftScore(Integer.toString(match.getScoreFirst()));
                        evMatch.setRightScore(Integer.toString(match.getScoreSecond()));
                        evMatch.setDate(parseMatchDate(match.getMatchDate()));


                        evMatches.add(evMatch);
                    }
                }

                for (MatchInfoDTO match : evMatches) {
                    String date = match.getDate();
                    int idx = isInDict(idMatches, date);
                    if (idx != -1) {
                        List<MatchInfoDTO> eventMatches = idMatches.get(idx).getMatches();
                        eventMatches.add(match);
                        idMatches.get(idx).setMatches(eventMatches);
                    } else {
                        MatchesByDateDTO temp = new MatchesByDateDTO(date, List.of(match));
                        idMatches.add(temp);
                    }
                }
            }
        }
        return idMatches;
    }


    private int isInDict(ArrayList<MatchesByDateDTO> idMatches, String date) {
        for (MatchesByDateDTO idMatch : idMatches) {
            if (idMatch.getDate().equals(date))
                return idMatches.indexOf(idMatch);
        }
        return -1;
    }
}
