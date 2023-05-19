package com.example.zasada_tv.mongo_collections.interfaces;


import com.example.zasada_tv.mongo_collections.documents.AdminDoc;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


/**
 * Интерфейс, отвечающий за выполнение всех операций с коллекцией {@link AdminDoc}
 * */

@Repository
public interface AdminRepository extends MongoRepository<AdminDoc, String> {
    ArrayList<AdminDoc> findByAdminId(final String adminId);

    void deleteByAdminId(final String adminId);

    boolean existsByAdminId(final String adminId);
}
