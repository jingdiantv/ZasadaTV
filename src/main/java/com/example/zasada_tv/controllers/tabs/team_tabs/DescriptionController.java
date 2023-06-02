package com.example.zasada_tv.controllers.tabs.team_tabs;

import com.example.zasada_tv.dtos.ChangeDescriptionDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class DescriptionController {

    @Autowired
    private TeamRepository teamRepository;

    @RequestMapping(value = "/changeDescription", method = RequestMethod.POST)
    public ResponseEntity<ChangeDescriptionDTO> changeDescription(@RequestBody ChangeDescriptionDTO descDTO){
        String teamName = unFillSpaces(descDTO.getTeam());

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        teamDoc.setDescription(descDTO.getDescription());

        teamRepository.save(teamDoc);

        return ResponseEntity.ok(descDTO);
    }
}
