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


    public CountryDoc(String countryRU, String countryENG, ArrayList<String> cities){
        this.countryRU = countryRU;
        this.countryENG = countryENG;
        this.cities = cities;
    }


    @Override
    public String toString() {
        return String.format("Country{countryRU=%s, countryENG=%s, cities=%s}", countryRU, countryENG, cities.toString());
    }
}
