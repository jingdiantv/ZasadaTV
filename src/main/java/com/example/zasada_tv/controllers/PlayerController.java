package com.example.zasada_tv.controllers;


import com.example.zasada_tv.dtos.*;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.dtos.FlagNameDTO;
import com.example.zasada_tv.mongo_collections.embedded.Rosters;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TeamRepository teamRepository;


    @RequestMapping(value = "/createTeam", method = RequestMethod.POST)
    public ResponseEntity<NewTeamDTO> createTeam(@RequestBody NewTeamDTO newTeam){
        if ((teamRepository.existsByTag(newTeam.getTag()) && teamRepository.existsByTeamName(newTeam.getName())))
            throw new AppException("Такая команда уже существует", HttpStatus.BAD_REQUEST);
        if ((playerRepository.existsByNick(newTeam.getTag()) && playerRepository.existsByNick(newTeam.getName())))
            throw new AppException("Такая команда уже существует", HttpStatus.BAD_REQUEST);

        teamRepository.save(newTeamToTeamDoc(newTeam));

        PlayerDoc captain = playerRepository.findByNick(newTeam.getCap()).get(0);
        captain.setTeamRole("Капитан");
        captain.setTeamName(newTeam.getName());
        playerRepository.save(captain);

        return ResponseEntity.created(URI.create("/" + fillSpaces(newTeam.getName()))).body(newTeam);
    }


    @RequestMapping(value = "/leftTeam", method = RequestMethod.POST)
    public ResponseEntity<LeftTeamDTO> leftTeam(@RequestBody LeftTeamDTO leftTeamDTO){
        String teamName = unFillSpaces(leftTeamDTO.getTeam());

        if (!playerRepository.existsByNick(leftTeamDTO.getNick()))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);


        PlayerDoc playerDoc = playerRepository.findByNick(leftTeamDTO.getNick()).get(0);
        playerDoc.setTeamName("");
        playerDoc.setTeamRole("");

        ArrayList<Rosters> rosters = playerDoc.getRosters();

        for (Rosters roster : rosters){
            if (roster.getTeamName().equals(teamName)){
                roster.setExitDate(LocalDate.now());
                break;
            }
        }

        playerDoc.setRosters(rosters);

        playerRepository.save(playerDoc);

        TeamDoc teamDoc = teamRepository.findByTeamName(teamName).get(0);

        List<String> players = teamDoc.getPlayers();
        players.remove(leftTeamDTO.getNick());

        //if (players.isEmpty()){
        //    teamRepository.deleteByTeamName(leftTeamDTO.getTeam());
        // } else {
            if (leftTeamDTO.getNick().equals(teamDoc.getCaptain()) && !players.isEmpty()){
                int newCapIdx = (int) (Math.random() * players.size());
                String newCap = players.get(newCapIdx);

                if (!playerRepository.existsByNick(newCap))
                    throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

                teamDoc.setCaptain(newCap);
                PlayerDoc newCaptainDoc = playerRepository.findByNick(newCap).get(0);

                playerRepository.save(newCaptainDoc);
            }

            teamDoc.setPlayers(players);

            teamRepository.save(teamDoc);
        //}


        return ResponseEntity.ok(leftTeamDTO);
    }


    @RequestMapping(value = "/changeBDate", method = RequestMethod.POST)
    public ResponseEntity<NewDateDTO> changeBDate(@RequestBody NewDateDTO date){
        if (!playerRepository.existsByNick(date.getPlayer()))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(date.getPlayer()).get(0);

        String[] dateSplit = date.getBdate().split("\\.");

        int year = Integer.parseInt(dateSplit[2]);
        int month = Integer.parseInt(dateSplit[1]);
        int day = Integer.parseInt(dateSplit[0]) + 1;

        playerDoc.setBdate(LocalDate.of(year, month, day));
        playerRepository.save(playerDoc);

        return ResponseEntity.ok(date);
    }


    @RequestMapping(value = "/changeNick", method = RequestMethod.POST)
    public ResponseEntity<NewNickDTO> changeNick(@RequestBody NewNickDTO nick){
        if (!playerRepository.existsByNick(nick.getOldNick()))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(nick.getOldNick()).get(0);
        playerDoc.setNick(nick.getNewNick());
        playerRepository.save(playerDoc);

        return ResponseEntity.ok(nick);
    }


    @RequestMapping(value = "/changeSocial", method = RequestMethod.POST)
    public ResponseEntity<ChangeSocialDTO> changeSocial(@RequestBody ChangeSocialDTO social){
        if (!playerRepository.existsByNick(social.getPlayer()))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(social.getPlayer()).get(0);
        switch (social.getSocial()) {
            case "VK" -> playerDoc.setVk(social.getLink());
            case "Steam" -> playerDoc.setSteam(social.getLink());
            case "Discord" -> playerDoc.setDiscord(social.getLink());
            case "Faceit" -> playerDoc.setFaceit(social.getLink());
        }
        playerRepository.save(playerDoc);

        return ResponseEntity.ok(social);
    }


    @RequestMapping(value = "/getSocial/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<SocialDTO>> getSocial(@PathVariable String id) throws IOException {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        ArrayList<SocialDTO> social = new ArrayList<>();
        social.add(new SocialDTO("VK", "white", playerDoc.getVk()));
        social.add(new SocialDTO("Steam", "white", playerDoc.getSteam()));
        social.add(new SocialDTO("Discord", "colored", playerDoc.getDiscord()));
        social.add(new SocialDTO("Faceit", "colored", playerDoc.getFaceit()));


        return ResponseEntity.ok(social);
    }


    @RequestMapping(value = "/getPlayerTrophies/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArrayList<TrophiesDTO>> getPlayerTrophies(@PathVariable String id) throws IOException {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        ArrayList<String> trophies = playerDoc.getTrophies();

        ArrayList<TrophiesDTO> list = new ArrayList<>();
        for (String trophy : trophies){
            list.add(new TrophiesDTO(trophy));
        }

        return ResponseEntity.ok(list);
    }


    @RequestMapping(value = "/getNameFlag/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FlagNameDTO>> getNameFlag(@PathVariable String id) throws IOException {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        String country = playerDoc.getCountry();
        String name = playerDoc.getFirstName() + " " + playerDoc.getSecondName();

        List<FlagNameDTO> flagName = List.of(new FlagNameDTO(country, name));

        return ResponseEntity.ok(flagName);
    }


    @RequestMapping(value = "/getTeam/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HashMap<String, String>>> getTeam(@PathVariable String id) throws IOException {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        String teamName = playerDoc.getTeamName();

        HashMap<String, String> team = new HashMap<>();
        team.put("name", teamName);

        List<HashMap<String, String>> flagName = List.of(team);

        return ResponseEntity.ok(flagName);
    }


    @RequestMapping(value = "/getAge/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getAge(@PathVariable String id) throws IOException {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        LocalDate bdate = playerDoc.getBdate();

        String day = fix_number(bdate.getDayOfMonth());
        String month = fix_number(bdate.getMonthValue());
        String year = String.valueOf(bdate.getYear());

        String age = day + "." + month + "." + year;

        return ResponseEntity.ok(age);
    }


    private TeamDoc newTeamToTeamDoc(NewTeamDTO newTeam){
        List<String> players = List.of(newTeam.getCap());
        return new TeamDoc(newTeam.getName(), newTeam.getTag(), newTeam.getCap(), "", newTeam.getCountry(),
                newTeam.getCity(), "/teams_logo/NoLogo.svg", -999, -999, players, new ArrayList<>());
    }


    private String fillSpaces(String string){
        return string.replaceAll(" ", "-");
    }


    private String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }
}
