package com.example.zasada_tv.mongo_collections.documents;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

/**
 * Данный класс описывает коллекцию Admin из базы данных MongoDB
 */

@Document("Country")
@Data
@AllArgsConstructor
public class CountryDoc {

    @Id
    private String countryRU;

    private String countryENG;
    private ArrayList<String> cities;
    private String flagPathMini;
    private String flagPath;
}
