package com.example.zasada_tv.controllers;


import com.example.zasada_tv.dtos.CredentialsDTO;
import com.example.zasada_tv.dtos.RegistrationDTO;
import com.example.zasada_tv.dtos.UserDTO;
import com.example.zasada_tv.jwt.UserAuthProvider;
import com.example.zasada_tv.services.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


/**
 * Данный класс отвечает за обработку запросов на логин и регистрацию
 * */

@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

    private final PlayerService playerService;
    private final UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO){
        UserDTO userDTO = playerService.login(credentialsDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO.getNick()));

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationDTO registrationDTO){
        UserDTO userDTO = playerService.register(registrationDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO.getNick()));

        return ResponseEntity.created(URI.create("/" + userDTO.getNick())).body(userDTO);
    }
}
