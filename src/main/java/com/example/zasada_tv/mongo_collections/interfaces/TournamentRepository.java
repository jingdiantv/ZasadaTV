package com.example.zasada_tv.mongo_collections.interfaces;


import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;


/**
 * Интерфейс, отвечающий за выполнение всех операций с коллекцией {@link TournamentDoc}
 * */

@Repository
public interface TournamentRepository extends MongoRepository<TournamentDoc, String> {
    ArrayList<TournamentDoc> findByDateStart(final LocalDateTime dateStart);
    ArrayList<TournamentDoc> findByDateEnd(final LocalDateTime dateEnd);
    ArrayList<TournamentDoc> findByType(final String type);
    ArrayList<TournamentDoc> findByStatus(final String status);
    ArrayList<TournamentDoc> findByCountry(final String country);
    ArrayList<TournamentDoc> findByCity(final String city);
    ArrayList<TournamentDoc> findByPrize(final String prize);
    ArrayList<TournamentDoc> findByName(final String name);

    void deleteByDateStart(final LocalDateTime dateStart);
    void deleteByDateEnd(final LocalDateTime dateEnd);
    void deleteByType(final String type);
    void deleteByStatus(final String status);
    void deleteByCountry(final String country);
    void deleteByCity(final String city);
    void deleteByPrize(final String prize);
    void deleteByName(final String name);

    boolean existsByDateStart(final LocalDateTime dateStart);
    boolean existsByDateEnd(final LocalDateTime dateEnd);
    boolean existsByType(final String type);
    boolean existsByStatus(final String status);
    boolean existsByCountry(final String country);
    boolean existsByCity(final String city);
    boolean existsByPrize(final String prize);
    boolean existsByName(final String name);
}
