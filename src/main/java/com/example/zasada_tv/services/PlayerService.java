package com.example.zasada_tv.services;


import com.example.zasada_tv.controllers.dto.LeftTeamDTO;
import com.example.zasada_tv.controllers.dto.NewDateDTO;
import com.example.zasada_tv.controllers.dto.NewNickDTO;
import com.example.zasada_tv.controllers.dto.NewTeamDTO;
import com.example.zasada_tv.controllers.dto.ChangeSocialDTO;
import com.example.zasada_tv.controllers.dto.SocialDTO;
import com.example.zasada_tv.controllers.dto.TrophiesDTO;
import com.example.zasada_tv.controllers.dto.FlagNameDTO;
import com.example.zasada_tv.controllers.dto.NameDTO;
import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.embedded.Rosters;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static com.example.zasada_tv.utils.Utils.fix_number;
import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@Service
@RequiredArgsConstructor
public class PlayerService {

    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;


    public NewTeamDTO createTeam(@NotNull NewTeamDTO newTeam) {
        if ((teamRepository.existsByTag(newTeam.getTag()) && teamRepository.existsByTeamName(newTeam.getName())))
            throw new AppException("Такая команда уже существует", HttpStatus.BAD_REQUEST);
        if ((playerRepository.existsByNick(newTeam.getTag()) && playerRepository.existsByNick(newTeam.getName())))
            throw new AppException("Такая команда уже существует", HttpStatus.BAD_REQUEST);

        teamRepository.save(newTeamToTeamDoc(newTeam));

        PlayerDoc captain = playerRepository.findByNick(newTeam.getCap()).get(0);

        ArrayList<Rosters> rosters = captain.getRosters();
        rosters.add(new Rosters(LocalDate.now(), null, newTeam.getName(), new ArrayList<>()));
        captain.setRosters(rosters);

        playerRepository.save(captain);

        return newTeam;
    }


    public LeftTeamDTO leftTeam(LeftTeamDTO leftTeamDTO) {
        String teamName = unFillSpaces(leftTeamDTO.getTeam());

        if (!playerRepository.existsByNick(leftTeamDTO.getNick()))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        if (!teamRepository.existsByTeamName(teamName))
            throw new AppException("Неизвестная команда", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(leftTeamDTO.getNick()).get(0);

        ArrayList<Rosters> rosters = playerDoc.getRosters();

        for (Rosters roster : rosters) {
            if (roster.getTeamName().equals(teamName)) {
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
        if (leftTeamDTO.getNick().equals(teamDoc.getCaptain()) && !players.isEmpty()) {
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

        return leftTeamDTO;
    }


    public NewDateDTO changeBDate(NewDateDTO date) {
        if (!playerRepository.existsByNick(date.getPlayer()))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(date.getPlayer()).get(0);

        String[] dateSplit = date.getBdate().split("\\.");

        int year = Integer.parseInt(dateSplit[2]);
        int month = Integer.parseInt(dateSplit[1]);
        int day = Integer.parseInt(dateSplit[0]) + 1;

        playerDoc.setBdate(LocalDate.of(year, month, day));
        playerRepository.save(playerDoc);

        return date;
    }


    public NewNickDTO changeNick(NewNickDTO nick) {
        if (!playerRepository.existsByNick(nick.getOldNick()))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(nick.getOldNick()).get(0);
        playerDoc.setNick(nick.getNewNick());
        playerRepository.save(playerDoc);

        return nick;
    }


    public ChangeSocialDTO changeSocial(ChangeSocialDTO social) {
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

        return social;
    }


    public ArrayList<SocialDTO> getSocial(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        ArrayList<SocialDTO> social = new ArrayList<>();
        social.add(new SocialDTO("VK", "white", playerDoc.getVk()));
        social.add(new SocialDTO("Steam", "white", playerDoc.getSteam()));
        social.add(new SocialDTO("Discord", "colored", playerDoc.getDiscord()));
        social.add(new SocialDTO("Faceit", "colored", playerDoc.getFaceit()));

        return social;
    }


    public ArrayList<TrophiesDTO> getPlayerTrophies(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        ArrayList<String> trophies = playerDoc.getTrophies();

        ArrayList<TrophiesDTO> list = new ArrayList<>();
        for (String trophy : trophies) {
            list.add(new TrophiesDTO(trophy));
        }

        return list;
    }


    public List<FlagNameDTO> getNameFlag(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        String country = playerDoc.getCountry();
        String name = playerDoc.getFirstName() + " " + playerDoc.getSecondName();

        return List.of(new FlagNameDTO(country, name));
    }


    public List<NameDTO> getTeam(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
        AtomicReference<String> teamName = new AtomicReference<>("");

        playerDoc.getRosters().forEach((elem)->{
            if (elem.getExitDate() == null)
                teamName.set(elem.getTeamName());
        });

        return List.of(new NameDTO(teamName.get()));
    }


    public String getAge(String id) {
        if (!playerRepository.existsByNick(id))
            throw new AppException("Неизвестный пользователь", HttpStatus.BAD_REQUEST);

        PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);

        LocalDate bdate = playerDoc.getBdate();

        String day = fix_number(bdate.getDayOfMonth());
        String month = fix_number(bdate.getMonthValue());
        String year = String.valueOf(bdate.getYear());

        return day + "." + month + "." + year;
    }


    private TeamDoc newTeamToTeamDoc(NewTeamDTO newTeam) {
        List<String> players = List.of(newTeam.getCap());
        return new TeamDoc(newTeam.getName(), newTeam.getTag(), newTeam.getCap(), "", newTeam.getCountry(), newTeam.getCity(), "/teams_logo/NoLogo.svg", -999, -999, players, new ArrayList<>());
    }
}
