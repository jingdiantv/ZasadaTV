package com.example.zasada_tv;


/**
 * Класс Player. В нём содержится вся интересующая нас информация, которая будет выведена
 * так или иначе на экран на сайте
 * */

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


    public int getAssists(){return assists;}


    public int getArmor() {
        return armor;
    }


    public int getDeaths() {
        return deaths;
    }


    public int getHp() {
        return hp;
    }


    public int getKills() {
        return kills;
    }


    public int getMoney() {
        return money;
    }


    public String getBest_weapon() {
        return best_weapon;
    }


    public String getNickname() {
        return nickname;
    }


    public boolean getDef_kit(){
        return def_kit;
    }


    public String getTeam(){
        return team;
    }

    public String getPistol(){
        return pistol;
    }


    public void setAssists(int assists){this.assists = assists;}


    public void setArmor(int armor) {
        this.armor = armor;
    }


    public void setBest_weapon(String best_weapon) {
        this.best_weapon = best_weapon;
    }


    public void setDef_kit(boolean def_kit) {
        this.def_kit = def_kit;
    }


    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }


    public void setHp(int hp) {
        this.hp = hp;
    }


    public void setKills(int kills) {
        this.kills = kills;
    }


    public void setMoney(int money) {
        this.money = money;
    }


    public void setTeam(String team){this.team = team;}

    public void setPistol(String pistol){this.pistol = pistol;}
}
