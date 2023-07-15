package com.example.zasada_tv.controllers;


import com.example.zasada_tv.services.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class ImageController {

    public static final String imageDirectory = System.getProperty("user.dir") + "/images";

    private final ImageService imageService;


    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }


    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile file,
                                              @RequestParam("imageName") String name,
                                              @RequestParam("type") String type,
                                              @RequestParam("id") String id) {

        String response = imageService.uploadImage(file, name, type, id, imageDirectory);
        return ResponseEntity.created(URI.create("/" + response)).body(response);
    }


    @RequestMapping(value = "/getImage/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getFile(@PathVariable("id") String id, @PathVariable("type") String type) throws IOException {
        return imageService.getFile(id, type, imageDirectory);
    }


}
