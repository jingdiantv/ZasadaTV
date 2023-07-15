package com.example.zasada_tv.controllers.tabs.team_tabs;

import com.example.zasada_tv.controllers.tabs.team_tabs.dto.ChangeDescriptionDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class DescriptionController {

    private final TeamRepository teamRepository;


    public DescriptionController(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }


    @RequestMapping(value = "/changeDescription", method = RequestMethod.POST)
    public ResponseEntity<ChangeDescriptionDTO> changeDescription(@RequestBody ChangeDescriptionDTO descDTO) {
        String teamName = unFillSpaces(descDTO.getTeam());

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        teamDoc.setDescription(descDTO.getDescription());

        teamRepository.save(teamDoc);

        return ResponseEntity.ok(descDTO);
    }
}
