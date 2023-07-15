package com.example.zasada_tv.services;


import com.example.zasada_tv.exceptions.AppException;
import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;
import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import com.example.zasada_tv.mongo_collections.interfaces.CountryRepository;
import com.example.zasada_tv.mongo_collections.interfaces.PlayerRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TeamRepository;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.example.zasada_tv.utils.Utils.unFillSpaces;


@Service
@RequiredArgsConstructor
public class ImageService {

    private final TeamRepository teamRepository;
    private final CountryRepository countryRepository;
    private final PlayerRepository playerRepository;
    private final TournamentRepository tournamentRepository;


    public String uploadImage(MultipartFile file, String name, String type, String id, String imageDirectory) {

        if (teamRepository.existsByTeamName(id)) {
            TeamDoc teamDoc = teamRepository.findByTeamName(id).get(0);
            teamDoc.setLogoLink(type + name);
            teamRepository.save(teamDoc);
        } else if (playerRepository.existsByNick(id)) {
            PlayerDoc playerDoc = playerRepository.findByNick(id).get(0);
            playerDoc.setPhotoLink(type + name);
            playerRepository.save(playerDoc);
        }

        makeDirectoryIfNotExist(imageDirectory + type);
        Path fileNamePath = Paths.get(imageDirectory + type, name);
        try {
            Files.write(fileNamePath, file.getBytes());
            return name;
        } catch (IOException ex) {
            throw new AppException("Не получилось загрузить изображение", HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity<byte[]> getFile(String id, String type, String imageDirectory) throws IOException {
        String path = "";

        id = unFillSpaces(id);

        if (teamRepository.existsByTeamName(id)) {
            path = teamRepository.findByTeamName(id).get(0).getLogoLink();
        } else if (playerRepository.existsByNick(id)) {
            path = playerRepository.findByNick(id).get(0).getPhotoLink();
        } else if (countryRepository.existsByCountryRU(id)) {
            if (type.equals("mini")) {
                path = countryRepository.findByCountryRU(id).get(0).getFlagPathMini();
            } else {
                path = countryRepository.findByCountryRU(id).get(0).getFlagPath();
            }
        } else if (tournamentRepository.existsByName(id)) {
            if (type.equals("trophy")) {
                path = tournamentRepository.findByName(id).get(0).getTrophyLink();
            } else {
                path = tournamentRepository.findByName(id).get(0).getLogoLink();
            }
        } else if (type.equals("NonPhoto")) {
            path = "/players/NonPhoto.png";
        } else throw new AppException("Неизвестный параметр", HttpStatus.BAD_REQUEST);

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


    private String getMediaType(String path) {
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
