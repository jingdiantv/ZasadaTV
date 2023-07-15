package com.example.zasada_tv.utils;


import java.time.LocalDateTime;


public class Utils {

    public static String parseMatchDate(LocalDateTime date){
        String day = fix_number(date.getDayOfMonth());
        String month = fix_number(date.getMonthValue());

        return day + "." + month + "." + date.getYear();
    }


    public static String fix_number(int number){
        String str = Integer.toString(number);
        if(number < 10)
            str = "0" + str;
        return str;
    }


    public static String unFillSpaces(String id) {
        if (id.contains("-"))
            return id.replaceAll("-", " ");
        return id;
    }


    public static String fillSpaces(String string) {
        return string.replaceAll(" ", "-");
    }
}
