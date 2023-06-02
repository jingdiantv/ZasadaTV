package com.example.zasada_tv.controllers.match_controller;


import lombok.Data;


/**
 * Класс Player. В нём содержится вся интересующая нас информация, которая будет выведена
 * так или иначе на экран на сайте
 * */


@Data
public class Player {
    private String team; // текущая команда: ct, t, spectator(Unassigned)
    private String nickname; // никнейм игрока
    private boolean def_kit; // false - отсутствие, true - куплены
    private String pistol; // пистолет игрока
    private String best_weapon; // лучшее оружие
    private int hp; // количество хп
    private int armor; // 0 - отсутствие, 1 - броня, 2 - шлем + броня
    private int money; // количество денег
    private int kills; // количество килов
    private int deaths; // количество смертей
    private int assists; // количество ассистов


    // Задаём игроку параметры как для первого раунда ММ
    public Player(String nickname){
        this.team = "";
        this.nickname = nickname;
        this.def_kit = false;
        this.best_weapon = "";
        this.pistol = "";
        this.hp = 100;
        this.armor = 0;
        this.money = 800;
        this.kills = 0;
        this.deaths = 0;
        this.assists = 0;
    }
}
