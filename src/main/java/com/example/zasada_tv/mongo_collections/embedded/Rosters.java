package com.example.zasada_tv.mongo_collections.embedded;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;

import static com.example.zasada_tv.utils.Utils.fix_number;


@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Rosters {

    private LocalDate enterDate;
    private LocalDate exitDate;

    private String teamName;

    private ArrayList<String> trophies;


    @Override
    public String toString() {
        String enterDay = "";
        String enterMonth = "";
        String enterYear = "";
        if(enterDate != null) {
            enterDay = fix_number(enterDate.getDayOfMonth());
            enterMonth = fix_number(enterDate.getMonthValue());
            enterYear = String.valueOf(enterDate.getYear());
        }

        String exitDay = "";
        String exitMonth = "";
        String exitYear = "";
        if(exitDate != null) {
            exitDay = fix_number(exitDate.getDayOfMonth());
            exitMonth = fix_number(exitDate.getMonthValue());
            exitYear = String.valueOf(exitDate.getYear());
        }

        return String.format("Rosters{enterDate=%s-%s-%s, exitDate=%s-%s-%s, teamName=%s, trophies=%s}",
                enterDay, enterMonth, enterYear, exitDay, exitMonth, exitYear, teamName, trophies.toString());
    }
}
