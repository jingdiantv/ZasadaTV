package com.example.zasada_tv.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Данный класс реализует форму логина
 * */

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CredentialsDTO {

    private String nick;
    private char[] password;
}
