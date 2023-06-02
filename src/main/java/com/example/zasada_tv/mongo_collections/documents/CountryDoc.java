package com.example.zasada_tv.mongo_collections.documents;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

/**
 * Данный класс описывает коллекцию Admin из базы данных MongoDB
 * */

@Document("Country")
@Data
public class CountryDoc {

    @Id
    private String countryRU;

    private String countryENG;
    private ArrayList<String> cities;
    private String flagPathMini;
    private String flagPath;


    public CountryDoc(String countryRU, String countryENG, ArrayList<String> cities, String flagPathMini, String flagPath){
        this.countryRU = countryRU;
        this.countryENG = countryENG;
        this.cities = cities;
        this.flagPathMini = flagPathMini;
        this.flagPath = flagPath;
    }


    @Override
    public String toString() {
        return String.format("Country{countryRU=%s, countryENG=%s, cities=%s, flagPathMini=%s, flagPath=%s}", countryRU, countryENG, cities.toString(), flagPathMini, flagPath);
    }
}
