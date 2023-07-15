package com.example.zasada_tv.controllers.tabs.player_tabs;


import com.example.zasada_tv.dto.StatsDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class StatsController {

    private final PlayerRepository playerRepository;


    public StatsController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }


    @RequestMapping(value = "/getStats/{id}", method = RequestMethod.GET)
    public ResponseEntity<StatsDTO> getStats(@PathVariable String id) throws IOException {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        return ResponseEntity.ok(playerDoc.getStats());
    }
}
