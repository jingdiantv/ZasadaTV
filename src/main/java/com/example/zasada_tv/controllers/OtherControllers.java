package com.example.zasada_tv.controllers;


import com.example.zasada_tv.mongo_collections.documents.CountryDoc;
import com.example.zasada_tv.mongo_collections.interfaces.AdminRepository;
import com.example.zasada_tv.mongo_collections.interfaces.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Данный класс отвечает за обработку запросов без привязки к конкретной странице
 * */

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class OtherControllers {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private AdminRepository adminRepository;


    @RequestMapping(value = "/country", method = RequestMethod.GET)
    public ResponseEntity<List<CountryDoc>> getAllCountries(){
        return ResponseEntity.ok(countryRepository.findAll());
    }


    @RequestMapping(value = "/isAdmin/{id}", method = RequestMethod.GET)
    public ResponseEntity<Boolean> isAdmin(@PathVariable String id){
        //adminRepository.save(new AdminDoc(id));
        return ResponseEntity.ok(adminRepository.existsByAdminId(id));
    }

}
