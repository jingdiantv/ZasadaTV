package com.example.zasada_tv.mongo_collections.interfaces;


import com.example.zasada_tv.mongo_collections.documents.CountryDoc;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


/**
 * Интерфейс, отвечающий за выполнение всех операций с коллекцией {@link CountryDoc}
 */

@Repository
public interface CountryRepository extends MongoRepository<CountryDoc, String> {
    ArrayList<CountryDoc> findByCountryRU(final String countryRU);
    ArrayList<CountryDoc> findByCountryENG(final String countryENG);

    void deleteByCountryRU(final String countryRU);
    void deleteByCountryENG(final String countryENG);

    boolean existsByCountryRU(final String countryRU);
    boolean existsByCountryENG(final String countryENG);
}
