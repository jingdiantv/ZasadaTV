package com.example.zasada_tv.controllers.tabs.player_tabs;


import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class StatsController {
    @Autowired
    private PlayerRepository playerRepository;

    @RequestMapping(value = "/getStats/{id}", method = RequestMethod.GET)
    public ResponseEntity<HashMap<String, Object>> getStats(@PathVariable String id) throws IOException {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        return ResponseEntity.ok(playerDoc.getStats());
    }
}
