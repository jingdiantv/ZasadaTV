package com.example.zasada_tv.exceptions;


import org.springframework.http.HttpStatus;


/**
 * Данный класс расширяет RuntimeException, чтоб обрабатывать ошибки, полученные при запросах с указанием кода
 * */

public class AppException extends RuntimeException{

    private final HttpStatus code;

    public AppException(String message, HttpStatus code){
        super(message);
        this.code = code;
    }

    public HttpStatus getCode(){
        return code;
    }
}
