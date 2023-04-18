package com.example.zasada_tv;


import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;


/**
 * В этом классе проиходит парсинг входящих логов
 * */

public class LogParser {
    private static ArrayList<Player> player_stats = new ArrayList<>(); // вся статистика
    private static String ct_team = ""; // какая команда сейчас за КТ
    private static String t_team = ""; // какая команда сейчас за Т

    private static HashMap<String, String> weapons = new HashMap<>(); // набор всех оружий для выбора лучшего

    // инициализация weapons
    static {
        weapons.put("usp_silencer", "pistol");
        weapons.put("hkp2000", "pistol");
        weapons.put("elite", "pistol");
        weapons.put("p250", "pistol");
        weapons.put("fiveseven", "pistol");
        weapons.put("deagle", "pistol");
        weapons.put("glock", "pistol");
        weapons.put("tec9", "pistol");

        weapons.put("mp7", "two-handed");
        weapons.put("mac10", "two-handed");
        weapons.put("mp9", "two-handed");
        weapons.put("ump45", "two-handed");
        weapons.put("p90", "two-handed");
        weapons.put("bizon", "two-handed");
        weapons.put("mp5sd", "two-handed");

        weapons.put("nova", "two-handed");
        weapons.put("xm1014", "two-handed");
        weapons.put("mag7", "two-handed");
        weapons.put("sawedoff", "two-handed");

        weapons.put("m249", "two-handed");
        weapons.put("negev", "two-handed");

        weapons.put("famas", "two-handed");
        weapons.put("m4a1", "two-handed");
        weapons.put("m4a1_silencer", "two-handed");
        weapons.put("ssg08", "two-handed");
        weapons.put("aug", "two-handed");
        weapons.put("awp", "two-handed");
        weapons.put("scar20", "two-handed");
        weapons.put("galilar", "two-handed");
        weapons.put("ak47", "two-handed");
        weapons.put("sg556", "two-handed");
        weapons.put("g3sg1", "two-handed");
    }

    /**
     * Метод, который парсит входящие логи и выводит результат каждого действия на экран
     * */
    public static ArrayList<Player> parse() {
        try {
            File f = new File("C:\\Users\\1\\Desktop\\ZTV\\console.log");
            //File f = new File("E:\\Server\\console.log");

            BufferedReader b = new BufferedReader(new FileReader(f));

            String readLine = "";

            while ((readLine = b.readLine()) != null) {
                //System.out.println(readLine);
                if (readLine.contains("connected") && readLine.contains("Client")) {

                    // Это серым, типа в наблюдатели зашел
                    String nick = get_substring_lidx(readLine, "\"", "\"");
                    //System.out.println(nick + " зашёл на сервер как НАБЛЮДАТЕЛЬ");
                    set_team(nick, "Unassigned");

                    if (!contains_player(nick))
                        player_stats.add(new Player(nick));

                }
                else if (readLine.contains("switched from team") && readLine.contains("STEAM")){

                    String nick = get_substring_idx(readLine, "\"", "<");
                    String substring1 = readLine.substring(readLine.indexOf("\" switched from team"), readLine.indexOf("to <"));
                    String substring2 = readLine.substring(readLine.indexOf("to <"));

                    String team1 = get_substring_idx(substring1, "<", ">");
                    String team2 = get_substring_idx(substring2, "<", ">");

                    set_team(nick, team2);

                    //System.out.println(nick + " сменил команду с " + team1 + " на " + team2);

                }
                else if (readLine.contains("killed") && readLine.contains("with")){
                    String gun = get_substring_lidx(readLine.substring(readLine.indexOf("with")), "\"", "\"");

                    String killed_how = "";
                    if (readLine.contains(")"))
                        killed_how = get_substring_idx(readLine.substring(readLine.indexOf("with")), "(", ")");

                    String nick1 = get_substring_idx(readLine.substring(0, readLine.indexOf("[")), "\"", "<");
                    String nick2 = get_substring_idx(readLine.substring(readLine.indexOf("killed")), "\"", "<");

                    //System.out.println(nick1 + " убил " + nick2 + " с помощью " + gun + " - " + killed_how);
                    if(isTeamKill(nick1, nick2)) {
                        fix_stats(nick1, nick2, -1);
                        System.out.println(nick1 + " убил тиммейта " + nick2 + " с помощью " + gun);
                    }
                    else
                        fix_stats(nick1, nick2, 1);
                    death_reset(nick2);
                    set_killer_gun(nick1, gun);
                }
                else if (readLine.contains("killed by the bomb")){
                    // выбираем кого убило бомбой
                    String nick = get_substring_idx(readLine, "\"", "<");
                    b.readLine();
                    //System.out.println(nick + " был убит бомбой");
                    death_reset(nick);
                }
                else if (readLine.contains("committed suicide")){
                    String nick = get_substring_idx(readLine, "\"", "<");
                    //System.out.println(nick + " совершил суицид");
                    fix_stats("", nick, 1);
                    death_reset(nick);
                }
                else if (readLine.contains("World triggered \"Round_Start\"")){
                    // У всех, у кого хп меньше 100 - поднять до 100.
                    // У кого best_gun = "" - пистолет в зависимости от команды
                    round_start();
                    //System.out.println("Раунд начался");
                }
                else if (readLine.contains("World triggered \"Match_Start\"")){
                    // Всё обнулить
                    // Всем дать по 800 долларов стартовых
                    match_start();
                }
                else if (readLine.contains("triggered \"SFUI_Notice_Target_Bombed\"")){
                    String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
                    String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

                    //System.out.println("Раунд окончен - победили Т(" + t_score + " - " + ct_score + ") - Взорвана бомба");
                }
                else if (readLine.contains("triggered \"SFUI_Notice_Terrorists_Win\"")){
                    String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
                    String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

                    //System.out.println("Раунд окончен - победили Т(" + t_score + " - " + ct_score + ") - Враги уничтожены");
                }
                else if (readLine.contains("triggered \"SFUI_Notice_CTs_Win\"")){
                    String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
                    String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

                    //System.out.println("Раунд окончен - победили CT(" + t_score + " - " + ct_score + ") - Враги уничтожены");
                }
                else if(readLine.contains("triggered \"SFUI_Notice_Target_Saved\"")){
                    String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
                    String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

                    //System.out.println("Раунд окончен - победили CT(" + t_score + " - " + ct_score + ") - Время истекло");
                }
                else if(readLine.contains("triggered \"SFUI_Notice_Bomb_Defused\"")){
                    String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
                    String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

                    //System.out.println("Раунд окончен - победили CT(" + t_score + " - " + ct_score + ") - Бомба обезврежена");
                }
                else if (readLine.contains("Game Over:") && readLine.contains(" score ")){
                    // убираем отображение всего, кроме K A D
                    // выводим в БД всё
                    // player_stats.clear(); или просто у каждого убрать статистику
                    return player_stats;
                    //match_start();
                }
                else if (readLine.contains("Team playing \"CT\":")){
                    String new_ct = get_substring_space(readLine.substring(readLine.indexOf("\"CT\":")));
                    if (!Objects.equals(ct_team, new_ct))
                        ct_team = new_ct;
                }
                else if (readLine.contains("Team playing \"TERRORIST\":")){
                    String new_t = get_substring_space(readLine.substring(readLine.indexOf("\"TERRORIST\":")));
                    if (!Objects.equals(t_team, new_t))
                        t_team = new_t;
                }
                else if (readLine.contains("flash-assisted killing")){
                    // Сделать задержку перед выводом килов на экран. Если сюда зашли, то выводить
                    // ещё и иконку флеш-ассиста
                    String nick = get_substring_idx(readLine, "\"", "<");

                    //System.out.println("с флеш-ассистом от " + nick);
                }
                else if (readLine.contains("assisted killing") && !readLine.contains("flash-assisted killing")){
                    // Сделать задержку перед выводом килов на экран. Если сюда зашли, то выводить
                    // ещё и ассист
                    String nick = get_substring_idx(readLine, "\"", "<");
                    fix_assists(nick);

                    //System.out.println("с ассистом от " + nick);
                }
                else if (readLine.contains("purchased")){
                    String purchase = get_substring_lidx(readLine.substring(readLine.indexOf("purchased")), "\"", "\"");
                    String nick = get_substring_idx(readLine, "\"", "<");
                    check_purchase(nick, purchase);
                }
                else if (readLine.contains("money change")){
                    String cur_money = get_money(readLine.substring(readLine.indexOf("=")));
                    int money = Integer.parseInt(cur_money);

                    String nick = get_substring_idx(readLine, "\"", "<");

                    fix_money(nick, money);
                }
                else if (readLine.contains("took") && readLine.contains("damage from")){
                    String substring = readLine.substring(readLine.indexOf("Player"), readLine.indexOf("at"));
                    String nick = get_substring_lidx(substring, " ", " ");

                    String damaged_hp = get_substring_lidx(readLine.substring(readLine.indexOf("took")), " ", ".");

                    int damage = Integer.parseInt(damaged_hp);

                    if (damage <= 100)
                        fix_hp(nick, damage);
                }
                else if (readLine.contains("triggered \"Planted_The_Bomb\" at")){
                    String nick = get_substring_idx(readLine, "\"", "<");
                    String bombsite = get_substring_space(readLine.substring(readLine.indexOf("at bombsite")));
                    String situation = get_situation();

                    //System.out.println(nick + " поставил бомбу на " + bombsite + " в ситуации (" + situation + ")");
                }
                else if (readLine.contains("triggered \"Defused_The_Bomb\"")){
                    String nick = get_substring_idx(readLine, "\"", "<");
                    //System.out.println(nick + " раздефузил бомбу");
                }
                else if (readLine.contains("disconnected (reason \"")){
                    String nick = get_substring_idx(readLine, "\"", "<");
                    System.out.println(nick + " вышел с сервера");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }


    /**
     * В данном методе мы проверяем команды двух игроков (убийцы и убитого) на идентичность,
     * дабы выяснить, тимкилл ли это
     * @param nick1 - убийца
     * @param nick2 - убитый
     * */
    private static boolean isTeamKill(String nick1, String nick2) {
        String team1 = "";
        String team2 = "";

        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick1))
                team1 = player.getTeam();
            else if (Objects.equals(player.getNickname(), nick2))
                team2 = player.getTeam();
        }

        return Objects.equals(team1, team2) && !team1.isEmpty() && !team2.isEmpty();
    }


    /**
     * В данном методе мы получаем ситуацию (количество КТ и Т) на момент поставленной бомбы
     * */
    private static String get_situation() {
        int ct = 0;
        int t = 0;
        for (Player player : player_stats){
            if (player.getHp() > 0) {
                if (Objects.equals(player.getTeam(), "CT"))
                    ct++;
                else if (Objects.equals(player.getTeam(), "TERRORIST"))
                    t++;
            }
        }

        return t + " on " + ct;
    }


    /**
     * Данный метод изменяет деньги соответствующего игрока
     * @param nick - игрок, у которого нужно изменить количество денег
     * @param cur_money - текущее количество денег игрока
     * */
    private static void fix_money(String nick, int cur_money) {
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
                player.setMoney(cur_money);
            }
        }
    }


    /**
     * Данный метод изменяет хп игрока, если тот получил урон
     * @param nick - игрок, которому нанесли урон
     * @param damage - урон, нанесённый игроку
     * */
    private static void fix_hp(String nick, int damage){
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
                if (player.getHp() - damage >= 0){
                    int cur_hp = player.getHp() - damage;
                    player.setHp(cur_hp);

                    if (cur_hp == 0)
                        death_reset(nick);
                }
            }
        }
    }


    /**
     * В данном методе, в зависимости от совершённой покупки, ставится то или иное значение
     * объекта класса {@link Player @Player}
     * @param nick - игрок, совершивший покупку
     * @param purchase - то, что игрок купил
     * */
    private static void check_purchase(String nick, String purchase) {
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
                if (Objects.equals(purchase, "item_defuser"))
                    player.setDef_kit(true);
                else if (Objects.equals(purchase, "item_kevlar"))
                    player.setArmor(1);
                else if (Objects.equals(purchase, "item_assaultsuit"))
                    player.setArmor(2);
                else {
                    String gun = get_best_gun(player.getBest_weapon(), purchase);
                    player.setBest_weapon(gun);
                }
            }
        }
    }


    /**
     * В данном методе увеличивается количество ассистов соответствующего игрока
     * @param nick - игрок, который сделал ассист
     * */
    private static void fix_assists(String nick) {
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)){
                int assists = player.getAssists() + 1;
                player.setAssists(assists);
            }
        }
    }


    /**
     * При старте матча каждый игрок получает "стартовые настройки"
     * */
    private static void match_start() {
        for (Player player : player_stats){
            player.setBest_weapon("");
            player.setDef_kit(false);
            player.setHp(100);
            player.setArmor(0);
            player.setMoney(800);
            player.setKills(0);
            player.setDeaths(0);
            player.setAssists(0);
        }
    }


    /**
     * При старте раунда каждому игроку восстанавливают здоровье и дают стартовое оружие,
     * если таковое отсутствует
     * */
    private static void round_start() {
        for (Player player : player_stats){
            player.setHp(100);
            if (player.getBest_weapon().isEmpty()){
                if (Objects.equals(player.getTeam(), "CT"))
                    player.setBest_weapon("usp_silencer");
                else if (Objects.equals(player.getTeam(), "TERRORIST"))
                    player.setBest_weapon("glock");
            }
        }
    }


    /**
     * Данный метод исправляет статистику убийцы и убитого - увеличивает килы и смерти
     * @param nick1 - убийца. У него увеличиваются килы
     * @param nick2 - убитый. У него увеличиваются смерти
     * */
    private static void fix_stats(String nick1, String nick2, int score) {
        for (Player player_stat : player_stats) {
            if (Objects.equals(player_stat.getNickname(), nick1)) {
                int kills = player_stat.getKills() + score;
                player_stat.setKills(kills);
            }

            if (Objects.equals(player_stat.getNickname(), nick2)) {
                int deaths = player_stat.getDeaths() + 1;
                player_stat.setDeaths(deaths);
            }
        }
    }


    /**
     * Данный метод сбрасывает все показатели игрока при смерти
     * @param nick - умерший игрок. У него сбрасываем все характеристики
     * */
    private static void death_reset(String nick){
        //Если чел умер - не показывается армор, дефуза, оружие, а хп на 0
        for (Player player : player_stats) {
            if (Objects.equals(player.getNickname(), nick)){
                player.setArmor(0);
                player.setDef_kit(false);
                player.setHp(0);
                player.setBest_weapon("");
            }
        }
    }


    /**
     * Данный метод заменяет текущее оружие на то, с которого только что игрок сделал кил
     * @param nick - игрок, сделавший кил
     * @param gun - оружие, с которого игрок сделал кил
     * */
    private static void set_killer_gun(String nick, String gun){
        for (Player player : player_stats) {
            if (Objects.equals(player.getNickname(), nick)) {
                player.setBest_weapon(get_best_gun(player.getBest_weapon(), gun));
            }
        }
    }


    /**
     * В данном методе происходит выбор оружия для отображения. Отображается "лучшее" оружие
     * @param cur_gun - нынешнее оружие игрока
     * @param new_gun - оружие, которое игрок купил/с которого совершил кил. С ним происходит сравнение
     * @return оружие, которое будет отображено
     * */
    private static String get_best_gun(String cur_gun, String new_gun){
        if (weapons.containsKey(new_gun)){
            if (!weapons.containsKey(cur_gun))
                return new_gun;

            String c_gun = weapons.get(cur_gun);
            String n_gun = weapons.get(new_gun);

            // Пистолет и пистолет
            if (Objects.equals(c_gun, "pistol") && Objects.equals(n_gun, "pistol"))
                return new_gun;

            // Пистолет и всё остальное
            else if (Objects.equals(c_gun, "pistol") && Objects.equals(n_gun, "two-handed"))
                return new_gun;

                // Всё остальное и всё остальное
            else if (Objects.equals(c_gun, "two-handed") && Objects.equals(n_gun, "two-handed"))
                return new_gun;
        }
        return cur_gun;
    }


    /**
     * В данном методе соответствующему игроку изменяется команда при смене сторон
     * */
    private static void set_team(String nick, String team){
        for (Player player : player_stats) {
            if (Objects.equals(player.getNickname(), nick)){
                player.setTeam(team);
            }
        }
    }


    /**
     * В данном методе соответствующему игроку изменяется команда при смене сторон
     * @param nick - игрок, который сменил сторону
     * */
    private static boolean contains_player(String nick){
        for (Player player : player_stats) {
            if (Objects.equals(player.getNickname(), nick))
                return true;
        }
        return false;
    }


    /**
     * В данном методе получаем подстроку - количество денег после того или иного действия
     * @param input - входная строка, из которой будем вылинять количество денег
     * @return количество денег после операции
     * */
    private static String get_money(String input){
        int start = input.indexOf("$") + 1;
        int end = input.indexOf("(") - 1;

        return input.substring(start, end);
    }


    /**
     * В данном методе получаем подстроку с дважды использованным методом indexOf
     * @param input - входная строка, из которой будем вылинять подстроку
     * @param ch1 - первый символ, для которого ищем индекс. От него начнётся подстрока
     * @param ch2 - второй символ, для которого ищем индекс. Им закончится наша подстрока
     * @return полученная подстрока
     * */
    private static String get_substring_idx(String input, String ch1, String ch2){
        int start = input.indexOf(ch1) + 1;
        int end = input.indexOf(ch2);

        return input.substring(start, end);
    }


    /**
     * В данном методе получаем подстроку с использованием метода indexOf и lastIndexOf
     * @param input - входная строка, из которой будем вылинять подстроку
     * @param ch1 - первый символ, для которого ищем индекс. От него начнётся подстрока
     * @param ch2 - второй символ, для которого ищем индекс. Им закончится наша подстрока
     * @return полученная подстрока
     * */
    private static String get_substring_lidx(String input, String ch1, String ch2){
        int start = input.indexOf(ch1) + 1;
        int end = input.lastIndexOf(ch2);

        return input.substring(start, end);
    }


    /**
     * В данном методе получаем подстроку, которая начинается с первого пробела входной строки
     * @param input - входная строка, из которой будем вылинять подстроку
     * @return полученная подстрока
     * */
    private static String get_substring_space(String input) {
        int start = input.indexOf(" ") + 1;

        return input.substring(start);
    }
}
