package com.example.zasada_tv.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Данный класс реализует форму регистрации
 * */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationDTO {

    private String firstName;

    private String lastName;

    private String nick;

    private String email;

    private String country;

    private char[] password;

}
