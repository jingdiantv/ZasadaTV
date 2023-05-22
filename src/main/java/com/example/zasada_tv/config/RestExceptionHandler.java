package com.example.zasada_tv.config;


import com.example.zasada_tv.dtos.ErrorDTO;
import com.example.zasada_tv.exceptions.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * В данном классе обрабатываем ошибки при запросах
 * */

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handlerException(AppException exception){
        return ResponseEntity.status(exception.getCode())
                .body(ErrorDTO.builder().message(exception.getMessage()).build());
    }
}
