package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.AuthController;
import com.example.zasada_tv.controllers.dto.CredentialsDTO;
import com.example.zasada_tv.controllers.dto.RegistrationDTO;
import com.example.zasada_tv.controllers.dto.UserDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;


/**
 * Класс-помощник для {@link AuthController}. Он реализует всю логику логина и регистрации
 */

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;
    private final PasswordEncoder passwordEncoder;


    public PlayerDoc findByNick(String nick) {
        if (!playerRepository.existsByNick(nick))
            throw new AppException("Неизвестный пользователь", HttpStatus.NOT_FOUND);
        return playerRepository.findByNick(nick).get(0);
    }


    public UserDTO login(CredentialsDTO credentialsDTO) {
        if (!playerRepository.existsByNick(credentialsDTO.getNick()))
            throw new AppException("Неизвестный пользователь", HttpStatus.NOT_FOUND);

        PlayerDoc player = playerRepository.findByNick(credentialsDTO.getNick()).get(0);

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPassword()), player.getPassword()))
            return toUserDto(player);
        throw new AppException("Неправильный пароль", HttpStatus.BAD_REQUEST);
    }


    public UserDTO register(RegistrationDTO player) {
        if (playerRepository.existsByNick(player.getNick()))
            throw new AppException("Пользователь с таким ником уже существует", HttpStatus.BAD_REQUEST);
        if (teamRepository.existsByTeamName(player.getNick()))
            throw new AppException("Пользователь с таким ником уже существует", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = registrationToPlayer(player);
        playerDoc.setPassword(passwordEncoder.encode(CharBuffer.wrap(player.getPassword())));

        PlayerDoc savedPlayer = playerRepository.save(playerDoc);

        return toUserDto(savedPlayer);
    }


    private UserDTO toUserDto(PlayerDoc player) {
        return new UserDTO(player.getFirstName(), player.getSecondName(),
                player.getEmail(), player.getCountry(), player.getNick(), "");
    }


    private PlayerDoc registrationToPlayer(RegistrationDTO registrationDTO) {
        return new PlayerDoc(playerRepository.findAll().size() + 1, registrationDTO.getNick(),
                registrationDTO.getFirstName(), registrationDTO.getLastName(),
                registrationDTO.getCountry(), registrationDTO.getEmail());
    }
}
