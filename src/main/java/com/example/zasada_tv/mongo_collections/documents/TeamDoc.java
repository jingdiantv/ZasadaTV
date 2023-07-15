package com.example.zasada_tv.mongo_collections.documents;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


/**
 * Данный класс описывает коллекцию Team из базы данных MongoDB
 */

@Document("Team")
@Data
@AllArgsConstructor
public class TeamDoc {

    @Id
    private String teamName;

    private String tag;
    private String captain;
    private String description;
    private String country;
    private String city;
    private String logoLink;
    private int top;
    private int topDiff;
    private List<String> players;
    private ArrayList<String> trophies;
}
