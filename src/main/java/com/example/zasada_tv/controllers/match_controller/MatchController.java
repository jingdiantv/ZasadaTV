package com.example.zasada_tv.controllers.match_controller;


import com.example.zasada_tv.dtos.EditMatchInfoDTO;
import com.example.zasada_tv.dtos.TrophiesDTO;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.Matches;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;


@RestController
public class MatchController {

	@Autowired
	private TournamentRepository tournamentRepository;

	@Autowired
	private TeamRepository teamRepository;


    @RequestMapping(value = "/match/{id}/{event}", method = RequestMethod.POST)
    public void parseLogs(@RequestBody String input, @PathVariable("id") int id, @PathVariable("event") String event){
		event = unFillSpaces(event);

		LogParser logParser = new LogParser(event, id, tournamentRepository);

		String[] inputArray = input.split("\n");
		for (int i = 0; i < inputArray.length; ++i){
			if (inputArray[i].contains("killed") && inputArray[i].contains("with")){
				String temp = inputArray[i];
				if (i + 1 < inputArray.length){
					if ((inputArray[i + 1].contains("flash-assisted killing")) || (inputArray[i + 1].contains("assisted killing") && !inputArray[i + 1].contains("flash-assisted killing"))) {
						temp += ". " + inputArray[i + 1];
						++i;
					}
				}
				if (i + 2 < inputArray.length){
					if ((inputArray[i + 2].contains("flash-assisted killing")) || (inputArray[i + 2].contains("assisted killing") && !inputArray[i + 2].contains("flash-assisted killing"))) {
						temp += ". " + inputArray[i + 2];
						++i;
					}
				}
				logParser.parse(temp);
			} else if (inputArray[i].contains(">\" picked up \"")){
				String temp = inputArray[i];
				if (i + 1 < inputArray.length){
					if(inputArray[i + 1].contains("purchased")) {
						temp = inputArray[i + 1];
						++i;
					}
				}
				logParser.parse(temp);
			} else if(inputArray[i].contains("was killed by the bomb")){
				String temp = inputArray[i];
				if (i + 1 < inputArray.length){
					if(inputArray[i + 1].contains("committed suicide with \"world\""))
						++i;
				}
				logParser.parse(temp);
			}
			else
				logParser.parse(inputArray[i]);
		}
    }


	@RequestMapping(value = "/getLogs/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getLogs(@PathVariable int id){
		List<TournamentDoc> tournamentDocs = tournamentRepository.findAll();

		for (TournamentDoc doc : tournamentDocs){
			ArrayList<Matches> matches = doc.getMatches();

			for (Matches match : matches){
				if (match.getMatchId() == id){
					return ResponseEntity.ok(match.getLogs());
				}
			}
		}

		return ResponseEntity.badRequest().build();
	}


	@RequestMapping(value = "/editMatchInfo/{event}/{id}", method = RequestMethod.POST)
	public ResponseEntity<EditMatchInfoDTO> editMatchInfo(@RequestBody EditMatchInfoDTO editMatchInfoDTO,
														  @PathVariable("id") int id, @PathVariable("event") String event){

		TournamentDoc tournamentDoc = tournamentRepository.findByName(event).get(0);

		ArrayList<Matches> matches = tournamentDoc.getMatches();

		for (Matches match : matches){
			if (match.getMatchId() == id){
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

		return ResponseEntity.ok(editMatchInfoDTO);
	}
}

