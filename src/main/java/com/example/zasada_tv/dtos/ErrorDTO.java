package com.example.zasada_tv.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


/**
 * Данный класс отвечает за вывод сообщения при ошибке запроса
 * */

@AllArgsConstructor
@Data
@Builder
public class ErrorDTO {

    private String message;
}
