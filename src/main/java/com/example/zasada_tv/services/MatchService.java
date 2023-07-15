package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.match_controller.dto.EditMatchInfoDTO;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.Matches;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import com.example.zasada_tv.utils.LogParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@Service
@RequiredArgsConstructor
public class MatchService {
    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;


    public void logParser(String input, int id, String event) {
        event = unFillSpaces(event);

        LogParser logParser = new LogParser(event, id, tournamentRepository);

        String[] inputArray = input.split("\n");
        for (int i = 0; i < inputArray.length; ++i) {
            if (inputArray[i].contains("killed") && inputArray[i].contains("with")) {
                String temp = inputArray[i];
                if (i + 1 < inputArray.length) {
                    if ((inputArray[i + 1].contains("flash-assisted killing")) || (inputArray[i + 1].contains("assisted killing") && !inputArray[i + 1].contains("flash-assisted killing"))) {
                        temp += ". " + inputArray[i + 1];
                        ++i;
                    }
                }
                if (i + 2 < inputArray.length) {
                    if ((inputArray[i + 2].contains("flash-assisted killing")) || (inputArray[i + 2].contains("assisted killing") && !inputArray[i + 2].contains("flash-assisted killing"))) {
                        temp += ". " + inputArray[i + 2];
                        ++i;
                    }
                }
                logParser.parse(temp);
            } else if (inputArray[i].contains(">\" picked up \"")) {
                String temp = inputArray[i];
                if (i + 1 < inputArray.length) {
                    if (inputArray[i + 1].contains("purchased")) {
                        temp = inputArray[i + 1];
                        ++i;
                    }
                }
                logParser.parse(temp);
            } else if (inputArray[i].contains("was killed by the bomb")) {
                String temp = inputArray[i];
                if (i + 1 < inputArray.length) {
                    if (inputArray[i + 1].contains("committed suicide with \"world\""))
                        ++i;
                }
                logParser.parse(temp);
            } else
                logParser.parse(inputArray[i]);
        }
    }


    public ArrayList<HashMap<String, Object>> getLogs(int id) {
        List<TournamentDoc> tournamentDocs = tournamentRepository.findAll();

        for (TournamentDoc doc : tournamentDocs) {
            ArrayList<Matches> matches = doc.getMatches();

            for (Matches match : matches) {
                if (match.getMatchId() == id) {
                    return match.getLogs();
                }
            }
        }

        return null;
    }


    public EditMatchInfoDTO editMatchInfo(EditMatchInfoDTO editMatchInfoDTO, int id, String event) {
        TournamentDoc tournamentDoc = tournamentRepository.findByName(event).get(0);

        ArrayList<Matches> matches = tournamentDoc.getMatches();

        for (Matches match : matches) {
            if (match.getMatchId() == id) {
                String first = editMatchInfoDTO.getNameFirst();
                String second = editMatchInfoDTO.getNameSecond();

                match.setNameFirst(first);
                match.setTagFirst(teamRepository.findByTeamName(first).get(0).getTag());

                match.setNameSecond(second);
                match.setTagSecond(teamRepository.findByTeamName(second).get(0).getTag());

                String[] dateSplit = editMatchInfoDTO.getDate().split("\\.");

                int year = Integer.parseInt(dateSplit[2]);
                int month = Integer.parseInt(dateSplit[1]);
                int day = Integer.parseInt(dateSplit[0]) + 1;

                String[] timeSplit = editMatchInfoDTO.getTime().split(":");

                int hour = Integer.parseInt(timeSplit[0]) + 4;
                int minute = Integer.parseInt(timeSplit[1]);

                match.setMatchDate(LocalDateTime.of(year, month, day, hour, minute));
            }
        }

        tournamentDoc.setMatches(matches);
        tournamentRepository.save(tournamentDoc);

        return editMatchInfoDTO;
    }
}
