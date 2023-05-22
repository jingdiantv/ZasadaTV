package com.example.zasada_tv.dtos;


import com.example.zasada_tv.mongo_collections.documents.PlayerDoc;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Данный класс является упрощенной формой {@link PlayerDoc} с токеном. Используется чтоб не хранить токен
 * в документе игрока
 * */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String country;

    private String nick;

    private String token;
}
