package com.example.zasada_tv.mongo_collections.documents;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * Данный класс описывает коллекцию Team из базы данных MongoDB
 * */

@Document("Team")
public class TeamDoc {

    @Id
    private String teamName;

    private String description;
    private String country;
    private String city;
    private String logoLink;


    public TeamDoc(String teamName, String description, String country, String city, String logoLink){
        this.teamName = teamName;
        this.description = description;
        this.country = country;
        this.city = city;
        this.logoLink = logoLink;
    }


    @Override
    public String toString() {
        return String.format("Team{teamName=%s, description=%s, country=%s, city=%s, logoLink=%s}",
                teamName, description, country, city, logoLink);
    }
}
