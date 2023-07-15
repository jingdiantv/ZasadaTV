package com.example.zasada_tv.controllers.match_controller;


import com.example.zasada_tv.controllers.match_controller.dto.EditMatchInfoDTO;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.Matches;
import com.example.zasada_tv.services.MatchService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;


@RestController
public class MatchController {

	private final MatchService matchService;


	public MatchController(MatchService matchService){
		this.matchService = matchService;
	}


    @RequestMapping(value = "/match/{id}/{event}", method = RequestMethod.POST)
    public void parseLogs(@RequestBody String input, @PathVariable("id") int id, @PathVariable("event") String event){
		matchService.logParser(input, id, event);
    }


	@RequestMapping(value = "/getLogs/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getLogs(@PathVariable int id){
		ArrayList<HashMap<String, Object>> response = matchService.getLogs(id);

		if (response == null)
			return ResponseEntity.badRequest().build();
		else
			return ResponseEntity.ok(response);
	}


	@RequestMapping(value = "/editMatchInfo/{event}/{id}", method = RequestMethod.POST)
	public ResponseEntity<EditMatchInfoDTO> editMatchInfo(@RequestBody EditMatchInfoDTO editMatchInfoDTO,
														  @PathVariable("id") int id, @PathVariable("event") String event){

		EditMatchInfoDTO newInfo = matchService.editMatchInfo(editMatchInfoDTO, id, event);
		return ResponseEntity.ok(newInfo);
	}
}

