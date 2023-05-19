package com.example.zasada_tv;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.Arrays;


@RequiredArgsConstructor
@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PasswordEncoder passwordEncoder;

    public PlayerDoc findByNick(String nick){
        if (!playerRepository.existsByNick(nick))
            throw new AppException("Неизвестный пользователь", HttpStatus.NOT_FOUND);
        return playerRepository.findByNick(nick).get(0);
    }

    public PlayerDoc login(CredentialsDTO credentialsDTO){
        if (!playerRepository.existsByNick(credentialsDTO.getNick()))
            throw new AppException("Неизвестный пользователь", HttpStatus.NOT_FOUND);

        PlayerDoc player = playerRepository.findByNick(credentialsDTO.getNick()).get(0);

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPassword()), player.getPassword()))
            return player;
        throw new AppException("Неправильный пароль", HttpStatus.BAD_REQUEST);
    }

    public PlayerDoc register(RegistrationDTO player){
        if (playerRepository.existsByNick(player.getNick()))
            throw new AppException("Пользователь с таким ником уже существует", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = new PlayerDoc(player.getNick() + "987e2da412udajin", Arrays.toString(player.getPassword()),player.getNick(), player.getFirstName() + " " + player.getLastName(),
                null, player.getCountry(), "", "",
                "", "", "", "",
                "Игрок", "", new ArrayList<>(),
                new ArrayList<>());
        playerDoc.setPassword(passwordEncoder.encode(CharBuffer.wrap(player.getPassword())));

        PlayerDoc savedPlayer = playerRepository.save(playerDoc);

        return playerDoc;
    }
}
