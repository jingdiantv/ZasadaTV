package com.example.zasada_tv.mongo_collections.documents;


import lombok.AllArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * Данный класс описывает коллекцию Admin из базы данных MongoDB
 */

@Document("Admin")
@ToString
@AllArgsConstructor
public class AdminDoc {

    @Id
    private String adminId;
}
