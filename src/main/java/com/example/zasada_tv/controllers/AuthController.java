package com.example.zasada_tv.controllers;


import com.example.zasada_tv.controllers.dto.CredentialsDTO;
import com.example.zasada_tv.controllers.dto.RegistrationDTO;
import com.example.zasada_tv.controllers.dto.UserDTO;
import com.example.zasada_tv.jwt.UserAuthProvider;
import com.example.zasada_tv.services.AuthService;
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

    private final AuthService authService;
    private final UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO){
        UserDTO userDTO = authService.login(credentialsDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO.getNick()));

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationDTO registrationDTO){
        UserDTO userDTO = authService.register(registrationDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO.getNick()));

        return ResponseEntity.created(URI.create("/" + userDTO.getNick())).body(userDTO);
    }
}
