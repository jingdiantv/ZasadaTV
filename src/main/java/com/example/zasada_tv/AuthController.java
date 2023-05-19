package com.example.zasada_tv;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

    private final PlayerService playerService;
    private final UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    public ResponseEntity<PlayerDoc> login(@RequestBody CredentialsDTO credentialsDTO){
        PlayerDoc player = playerService.login(credentialsDTO);

        player.setToken(userAuthProvider.createToken(player.getNick()));
        return ResponseEntity.ok(player);
    }

    @PostMapping("/register")
    public ResponseEntity<PlayerDoc> register(@RequestBody RegistrationDTO registrationDTO){
        PlayerDoc player = playerService.register(registrationDTO);
        player.setToken(userAuthProvider.createToken(player.getNick()));
        return ResponseEntity.created(URI.create("/" + player.getNick())).body(player);
    }
}
