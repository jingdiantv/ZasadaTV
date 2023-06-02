package com.example.zasada_tv.controllers;


import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.interfaces.CountryRepository;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.example.zasada_tv.controllers.helpers.Helper.unFillSpaces;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class ImageController {

    public static final String imageDirectory = System.getProperty("user.dir") + "/images";

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private TournamentRepository tournamentRepository;


    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
                                         @RequestParam("imageName") String name,
                                         @RequestParam("type") String type,
                                         @RequestParam("id") String id) {

        if (teamRepository.existsByTeamName(id)){
            TeamDoc teamDoc = teamRepository.findByTeamName(id).get(0);
            teamDoc.setLogoLink(type + name);
            teamRepository.save(teamDoc);
        } else if (playerRepository.existsByNick(id)){
            PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
            playerDoc.setPhotoLink(type + name);
            playerRepository.save(playerDoc);
        }

        makeDirectoryIfNotExist(imageDirectory + type);
        Path fileNamePath = Paths.get(imageDirectory + type, name);
        try {
            Files.write(fileNamePath, file.getBytes());
            return new ResponseEntity<>(name, HttpStatus.CREATED);
        } catch (IOException ex) {
            return new ResponseEntity<>("Не получилось загрузить изображение", HttpStatus.BAD_REQUEST);
        }
    }


    @RequestMapping(value = "/getImage/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getFile(@PathVariable("id") String id, @PathVariable("type") String type) throws IOException {
        String path = "";

        id = unFillSpaces(id);

        if (teamRepository.existsByTeamName(id))
            path = teamRepository.findByTeamName(id).get(0).getLogoLink();
        else if (playerRepository.existsByNick(id))
            path = playerRepository.findByNick(id).get(0).getPhotoLink();
        else if (countryRepository.existsByCountryRU(id)){
            if (type.equals("mini"))
                path = countryRepository.findByCountryRU(id).get(0).getFlagPathMini();
            else
                path = countryRepository.findByCountryRU(id).get(0).getFlagPath();
        } else if (tournamentRepository.existsByName(id)){
            if (type.equals("trophy"))
                path = tournamentRepository.findByName(id).get(0).getTrophyLink();
            else
                path = tournamentRepository.findByName(id).get(0).getLogoLink();
        } else if (type.equals("NonPhoto"))
            path = "/players/NonPhoto.png";

        else throw new AppException("Неизвестный параметр", HttpStatus.BAD_REQUEST);

        String mediaType = getMediaType(path);

        File file = new File(imageDirectory + path);

        byte[] fileContent = Files.readAllBytes(file.toPath());

        return ResponseEntity.ok().contentLength(fileContent.length).contentType(MediaType.parseMediaType(mediaType)).body(fileContent);
    }


    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }


    private String getMediaType(String path){
        String extension = path.substring(path.lastIndexOf("."));

        return switch (extension) {
            case ".png" -> "image/png";
            case ".jpg" -> "image/jpg";
            case ".jpeg" -> "image/jpeg";
            case ".webp" -> "image/webp";
            case ".svg" -> "image/svg+xml";
            default -> "";
        };
    }
}
