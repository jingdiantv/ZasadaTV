package com.example.zasada_tv.mongo_collections.documents;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * Данный класс описывает коллекцию Admin из базы данных MongoDB
 * */

@Document("Admin")
public class AdminDoc {

    @Id
    private String adminId;


    public AdminDoc(String adminId){
        this.adminId = adminId;
    }


    @Override
    public String toString() {
        return String.format("Admin{adminId=%s}", adminId);
    }
}
