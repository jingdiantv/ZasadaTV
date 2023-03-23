package com.example.zasada_tv.mongo_collections.interfaces;


import com.example.zasada_tv.mongo_collections.documents.TeamDoc;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


/**
 * Интерфейс, отвечающий за выполнение всех операций с коллекцией {@link TeamDoc}
 * */

@Repository
public interface TeamRepository extends MongoRepository<TeamDoc, String> {
    ArrayList<TeamDoc> findByTeamName(final String teamName);
    ArrayList<TeamDoc> findByDescription(final String description);
    ArrayList<TeamDoc> findByCountry(final String country);
    ArrayList<TeamDoc> findByCity(final String city);

    void deleteByTeamName(final String teamName);
    void deleteByDescription(final String description);
    void deleteByCity(final String city);
    void deleteByCountry(final String country);
}
