package com.example.zasada_tv.utils;


import com.example.zasada_tv.controllers.match_controller.dto.Player;
import com.example.zasada_tv.mongo_collections.documents.TournamentDoc;
import com.example.zasada_tv.mongo_collections.embedded.Matches;
import com.example.zasada_tv.mongo_collections.interfaces.TournamentRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;


/**
 * В этом классе происходит парсинг входящих логов
 * */

public class LogParser {
    private ArrayList<Player> player_stats; // вся статистика
    private String ct_team; // какая команда сейчас за КТ
    private String t_team; // какая команда сейчас за Т

    private String eventName;
    private int matchId;

    private HashMap<String, String> weapons; // набор всех оружий для выбора лучшего

    private TournamentRepository tournamentRepository;

    // инициализация weapons
//    {
//        weapons.put("usp_silencer", "pistol");
//        weapons.put("usp_silencer_off", "pistol");
//        weapons.put("hkp2000", "pistol");
//        weapons.put("elite", "pistol");
//        weapons.put("p250", "pistol");
//        weapons.put("fiveseven", "pistol");
//        weapons.put("deagle", "pistol");
//        weapons.put("glock", "pistol");
//        weapons.put("tec9", "pistol");
//        weapons.put("cz75a", "pistol");
//        weapons.put("revolver", "pistol");
//
//        weapons.put("mp7", "two-handed");
//        weapons.put("mac10", "two-handed");
//        weapons.put("mp9", "two-handed");
//        weapons.put("ump45", "two-handed");
//        weapons.put("p90", "two-handed");
//        weapons.put("bizon", "two-handed");
//        weapons.put("mp5sd", "two-handed");
//
//        weapons.put("nova", "two-handed");
//        weapons.put("xm1014", "two-handed");
//        weapons.put("mag7", "two-handed");
//        weapons.put("sawedoff", "two-handed");
//
//        weapons.put("m249", "two-handed");
//        weapons.put("negev", "two-handed");
//
//        weapons.put("famas", "two-handed");
//        weapons.put("m4a1", "two-handed");
//        weapons.put("m4a1_silencer", "two-handed");
//        weapons.put("ssg08", "two-handed");
//        weapons.put("aug", "two-handed");
//        weapons.put("awp", "two-handed");
//        weapons.put("scar20", "two-handed");
//        weapons.put("galilar", "two-handed");
//        weapons.put("ak47", "two-handed");
//        weapons.put("sg556", "two-handed");
//        weapons.put("g3sg1", "two-handed");
//    }

    public LogParser(String event, int id,TournamentRepository repository){
        player_stats = new ArrayList<>();
        ct_team = "";
        t_team = "";
        weapons = new HashMap<>();

        eventName = event;
        matchId = id;
        tournamentRepository = repository;

        // инициализация weapons
        weapons.put("usp_silencer", "pistol");
        weapons.put("hkp2000", "pistol");
        weapons.put("elite", "pistol");
        weapons.put("p250", "pistol");
        weapons.put("fiveseven", "pistol");
        weapons.put("deagle", "pistol");
        weapons.put("glock", "pistol");
        weapons.put("tec9", "pistol");
        weapons.put("cz75a", "pistol");
        weapons.put("revolver", "pistol");

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

    public void parse(String readLine) {
        HashMap<String, Object> logMap = new HashMap<>();
        TournamentDoc tournamentDoc = tournamentRepository.findByName(eventName).get(0);

        ArrayList<Matches> matchesList = tournamentDoc.getMatches();
        Matches curMatch = null;

        for (Matches match : matchesList){

            if (match.getMatchId() == matchId) {
                curMatch = match;
                player_stats = curMatch.getActivePlayers();
            }
        }


        if ((readLine.contains("connected") && readLine.contains("Client")) || (readLine.contains("STEAM") && readLine.contains("entered the game"))) {

            // Это серым, типа в наблюдатели зашел
            String nick;
            if(!readLine.contains("entered the game"))
                nick = get_substring_lidx(readLine, "\"", "\"");
            else
                nick = get_substring_idx(readLine, "\"", "<");

            if (!contains_player(nick))
                player_stats.add(new Player(nick));

            set_team(nick, "Unassigned");

            logMap.put("type", "login");
            logMap.put("nick", nick);

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

        } else if (readLine.contains("switched from team") && readLine.contains("STEAM")) {

            String nick = get_substring_idx(readLine, "\"", "<");
            //String substring1 = readLine.substring(readLine.indexOf("\" switched from team"), readLine.indexOf("to <"));
            String substring2 = readLine.substring(readLine.indexOf("to <"));

            //String team1 = get_substring_idx(substring1, "<", ">");
            String team2 = get_substring_idx(substring2, "<", ">");

            set_team(nick, team2);



            if (team2.equals("Unassigned")){
                ArrayList<Player> players = curMatch.getActivePlayers();

                for (Player player : players){
                    if (player.getNickname().equals(nick)) {
                        players.remove(player);
                        curMatch.setActivePlayers(players);

                        for (Matches match : matchesList){
                            if (match.getMatchId() == curMatch.getMatchId()){
                                match = curMatch;
                            }
                        }
                    }
                }

            } else {
                ArrayList<Player> players = new ArrayList<>();
                for (Player player : player_stats){
                    System.out.println(player.getNickname());
                    System.out.println(player.getTeam());
                    if (player.getTeam().equals("CT") || player.getTeam().equals("T"))
                        players.add(player);
                }
                curMatch.setActivePlayers(players);

                for (Matches match : matchesList){
                    if (match.getMatchId() == curMatch.getMatchId()){
                        match = curMatch;
                    }
                }
            }
            tournamentDoc.setMatches(matchesList);
            tournamentRepository.save(tournamentDoc);


            //System.out.println(nick + " сменил команду с " + team1 + " на " + team2);

        } else if (readLine.contains("killed") && readLine.contains("with")) {

            String gunSubstring = readLine.substring(readLine.indexOf("with"));
            int firstIdx = -1;
            int secondIdx = -1;
            int counter = 0;
            for (int i = 0; i < gunSubstring.length(); ++i){
                if (gunSubstring.charAt(i) == '\"'){
                    counter++;
                    if (counter == 1)
                        firstIdx = i + 1;
                    else if (counter == 2) {
                        secondIdx = i;
                        break;
                    }
                }
            }
            String gun = gunSubstring.substring(firstIdx, secondIdx);

            String killed_how = "";
            if (readLine.contains(")"))
                killed_how = get_substring_idx(readLine.substring(readLine.indexOf("with")), "(", ")");

            String nick1 = get_substring_idx(readLine.substring(0, readLine.indexOf("[")), "\"", "<");
            String nick2 = get_substring_idx(readLine.substring(readLine.indexOf("killed")), "\"", "<");

            Player player1 = findByNick(nick1);
            Player player2 = findByNick(nick2);

            String flashAssisted = "";
            String flashAssistedSide = "";
            if (readLine.contains("flash-assisted killing")) {
                flashAssisted = getNick("flash-assisted killing", readLine);
                Player flashAssistedPlayer = findByNick(flashAssisted);
                if (flashAssistedPlayer != null)
                    flashAssistedSide = findByNick(flashAssisted).getTeam();
            }

            String assisted = "";
            String assistedSide = "";
            if (readLine.contains("assisted killing") && readLine.indexOf("assisted killing") != readLine.indexOf("flash-assisted killing") + 6) {
                assisted = getNick("assisted killing", readLine);
                fix_assists(assisted);
                Player assisterPlayer = findByNick(assisted);
                if (assisterPlayer != null)
                    assistedSide = assisterPlayer.getTeam();
            }

            //System.out.println(nick1 + " убил " + nick2 + " с помощью " + gun + killed_how + assisted + flashAssisted);
            if (isTeamKill(nick1, nick2)) {
                fix_stats(nick1, nick2, -1);
                //System.out.println(nick1 + " убил тиммейта " + nick2 + " с помощью " + gun + killed_how + assisted + flashAssisted);
            } else
                fix_stats(nick1, nick2, 1);
            death_reset(nick2);
            set_killer_gun(nick1, gun);

            setDB(curMatch, tournamentDoc, matchesList);

            if (killed_how.isEmpty()){
                logMap.put("noscope", false);
                logMap.put("penetrated", false);
                logMap.put("throughsmoke", false);
                logMap.put("headshot", false);
                logMap.put("attackerblind", false);
            }
            else if (!killed_how.contains(" ")){
                logMap.put("noscope", false);
                logMap.put("penetrated", false);
                logMap.put("throughsmoke", false);
                logMap.put("headshot", false);
                logMap.put("attackerblind", false);

                if (killed_how.equals("noscope")){
                    logMap.put("noscope", true);
                } else if (killed_how.equals("penetrated")){
                    logMap.put("penetrated", true);
                } else if (killed_how.equals("throughsmoke")){
                    logMap.put("throughsmoke", true);
                } else if (killed_how.equals("headshot")){
                    logMap.put("headshot", true);
                } else if (killed_how.equals("attackerblind"))
                    logMap.put("attackerblind", true);
            }
            else {
                logMap.put("noscope", false);
                logMap.put("penetrated", false);
                logMap.put("throughsmoke", false);
                logMap.put("headshot", true);
                logMap.put("attackerblind", false);

                String[] killedBy = killed_how.split(" ");

                for (String kill : killedBy){
                    if (kill.equals("noscope")){
                        logMap.put("noscope", true);
                    } else if (kill.equals("penetrated")){
                        logMap.put("penetrated", true);
                    } else if (kill.equals("throughsmoke")){
                        logMap.put("throughsmoke", true);
                    } else if (kill.equals("headshot")){
                        logMap.put("headshot", true);
                    } else if (killed_how.equals("attackerblind"))
                    logMap.put("attackerblind", true);
                }
            }

            if (player1 != null && player2 != null) {
                logMap.put("type", "kill");
                logMap.put("killer", nick1);
                logMap.put("assisted", assisted);
                logMap.put("flashAssisted", flashAssisted);
                logMap.put("gun", gun);
                logMap.put("victim", nick2);
                logMap.put("victimSide", player2.getTeam());
                logMap.put("killerSide", player1.getTeam());
                logMap.put("assisterSide", assistedSide);
                logMap.put("flashAssistedSide", flashAssistedSide);

                setLogs(curMatch, tournamentDoc, matchesList, logMap);
            }


        } else if (readLine.contains("killed by the bomb")) {
            // выбираем кого убило бомбой
            String nick = get_substring_idx(readLine, "\"", "<");
            Player player = findByNick(nick);

            if (player != null) {
                //System.out.println(nick + " был убит бомбой");
                death_reset(nick);

                logMap.put("type", "suicide");
                logMap.put("nick", nick);
                logMap.put("side", player.getTeam());

                setDB(curMatch, tournamentDoc, matchesList);

                setLogs(curMatch, tournamentDoc, matchesList, logMap);
            }

        } else if (readLine.contains("committed suicide")) {
            String nick = get_substring_idx(readLine, "\"", "<");
            Player player = findByNick(nick);

            if (player != null) {
                //System.out.println(nick + " совершил суицид");
                fix_stats("", nick, 1);
                death_reset(nick);

                logMap.put("type", "suicide");
                logMap.put("nick", nick);
                logMap.put("side", player.getTeam());

                setDB(curMatch, tournamentDoc, matchesList);

                setLogs(curMatch, tournamentDoc, matchesList, logMap);
            }


        } else if (readLine.contains("World triggered \"Round_Start\"")) {
            // У всех, у кого хп меньше 100 - поднять до 100.
            // У кого best_gun = "" - пистолет в зависимости от команды
            // Тут equiped ПРОВЕРЯТЬ
            round_start();

            logMap.put("type", "roundStarted");

            setDB(curMatch, tournamentDoc, matchesList);

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println("Раунд начался");
        } else if (readLine.contains("World triggered \"Match_Start\"")) {
            // Всё обнулить
            // Всем дать по 800 долларов стартовых
            match_start();

            setDB(curMatch, tournamentDoc, matchesList);

        } else if (readLine.contains("triggered \"SFUI_Notice_Target_Bombed\"")) {
            String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
            String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

            logMap.put("type", "roundEnd");
            logMap.put("winner", "T");
            logMap.put("scoreCT", ct_score);
            logMap.put("scoreT", t_score);
            logMap.put("how", "Взорвана бомба");

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println("Раунд окончен - победили Т(" + t_score + " - " + ct_score + ") - Взорвана бомба");
        } else if (readLine.contains("triggered \"SFUI_Notice_Terrorists_Win\"")) {
            String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
            String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

            logMap.put("type", "roundEnd");
            logMap.put("winner", "T");
            logMap.put("scoreCT", ct_score);
            logMap.put("scoreT", t_score);
            logMap.put("how", "Враги уничтожены");

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println("Раунд окончен - победили Т(" + t_score + " - " + ct_score + ") - Враги уничтожены");
        } else if (readLine.contains("triggered \"SFUI_Notice_CTs_Win\"")) {
            String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
            String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

            logMap.put("type", "roundEnd");
            logMap.put("winner", "CT");
            logMap.put("scoreCT", ct_score);
            logMap.put("scoreT", t_score);
            logMap.put("how", "Враги уничтожены");

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println("Раунд окончен - победили CT(" + t_score + " - " + ct_score + ") - Враги уничтожены");
        } else if (readLine.contains("triggered \"SFUI_Notice_Target_Saved\"")) {
            String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
            String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

            logMap.put("type", "roundEnd");
            logMap.put("winner", "CT");
            logMap.put("scoreCT", ct_score);
            logMap.put("scoreT", t_score);
            logMap.put("how", "Время истекло");

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println("Раунд окончен - победили CT(" + t_score + " - " + ct_score + ") - Время истекло");
        } else if (readLine.contains("triggered \"SFUI_Notice_Bomb_Defused\"")) {
            String t_score = get_substring_lidx(readLine.substring(readLine.indexOf(") (T ")), "\"", "\"");
            String ct_score = get_substring_lidx(readLine.substring(readLine.indexOf(" (CT "), readLine.indexOf(") (T ")), "\"", "\"");

            logMap.put("type", "roundEnd");
            logMap.put("winner", "CT");
            logMap.put("scoreCT", ct_score);
            logMap.put("scoreT", t_score);
            logMap.put("how", "Бомба обезврежена");

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println("Раунд окончен - победили CT(" + t_score + " - " + ct_score + ") - Бомба обезврежена");
        } else if (readLine.contains("Game Over:") && readLine.contains(" score ")) {
            // убираем отображение всего, кроме K A D
            // выводим в БД всё
            // player_stats.clear(); или просто у каждого убрать статистику
            //return player_stats;
            //match_start();

            System.out.println("ИГРА КОНЧИЛАСЬ");

        } else if (readLine.contains("Team playing \"CT\":")) {
            String new_ct = get_substring_space(readLine.substring(readLine.indexOf("\"CT\":")));
            if (!Objects.equals(ct_team, new_ct)) {
                ct_team = new_ct;
                curMatch.setCt(new_ct);

                for (Matches match : matchesList){
                    if (match.getMatchId() == curMatch.getMatchId()){
                        match = curMatch;
                    }
                }

                tournamentDoc.setMatches(matchesList);
                tournamentRepository.save(tournamentDoc);
            }


        } else if (readLine.contains("Team playing \"TERRORIST\":")) {
            String new_t = get_substring_space(readLine.substring(readLine.indexOf("\"TERRORIST\":")));
            if (!Objects.equals(t_team, new_t)) {
                t_team = new_t;

                curMatch.setT(new_t);

                for (Matches match : matchesList){
                    if (match.getMatchId() == curMatch.getMatchId()){
                        match = curMatch;
                    }
                }

                tournamentDoc.setMatches(matchesList);
                tournamentRepository.save(tournamentDoc);
            }


        } else if (readLine.contains("purchased")) {
            String purchase = get_substring_lidx(readLine.substring(readLine.indexOf("purchased")), "\"", "\"");
            String nick = get_substring_idx(readLine, "\"", "<");
            check_purchase(nick, purchase);

            setDB(curMatch, tournamentDoc, matchesList);


        } else if (readLine.contains("\" dropped \"")) {
            String rawGun = readLine.substring(readLine.indexOf(" dropped \""), readLine.lastIndexOf("\"") + 1);
            String droppedGun = get_substring_lidx(rawGun, "\"", "\"");

            String nick = get_substring_idx(readLine, "\"", "<");

            //System.out.println(nick + " выкинул " + droppedGun);
            set_dropped_gun(nick, droppedGun);

            setDB(curMatch, tournamentDoc, matchesList);


        } else if (readLine.contains(">\" picked up \"")) {
            String rawGun = readLine.substring(readLine.indexOf(" picked up \""), readLine.lastIndexOf("\"") + 1);

            String pickedGun = get_substring_lidx(rawGun, "\"", "\"");

            String nick = get_substring_idx(readLine, "\"", "<");

            if (Objects.equals(pickedGun, "hkp2000"))
                pickedGun = "usp_silencer";

            set_picked_gun(nick, pickedGun);

            setDB(curMatch, tournamentDoc, matchesList);


        } else if (readLine.contains("money change")) {
            String cur_money = get_money(readLine.substring(readLine.indexOf("=")));
            int money = Integer.parseInt(cur_money);

            String nick = get_substring_idx(readLine, "\"", "<");

            fix_money(nick, money);

            setDB(curMatch, tournamentDoc, matchesList);


        } else if (readLine.contains("hitgroup \"") && readLine.contains("attacked")) {
            String rawDamage = readLine.substring(readLine.indexOf("(health \""), readLine.indexOf(") (armor \""));
            String damaged_hp = get_substring_lidx(rawDamage, "\"", "\"");

            int hp = Integer.parseInt(damaged_hp);

            if (hp >= 1) {
                String substring = readLine.substring(readLine.indexOf("] attacked \""), readLine.indexOf("] with \""));
                String nick = get_substring_idx(substring, "\"", "<");

                String rawArmor = readLine.substring(readLine.indexOf("(armor \""), readLine.indexOf(") (hitgroup \""));
                String damaged_armor = get_substring_lidx(rawArmor, "\"", "\"");

                int armor = Integer.parseInt(damaged_armor);
                if(armor == 0)
                    fix_armor(nick);

                fix_hp(nick, hp);
                //System.out.println("Игрок " + nick + " после дамага с хп = " + hp);
            }

            setDB(curMatch, tournamentDoc, matchesList);


        } else if (readLine.contains("triggered \"Planted_The_Bomb\" at")) {
            String nick = get_substring_idx(readLine, "\"", "<");
            String bombsite = get_substring_space(readLine.substring(readLine.indexOf("at bombsite")));
            ArrayList<Integer> situation = get_situation();


            logMap.put("type", "bombPlanted");
            logMap.put("nick", nick);
            logMap.put("plant", bombsite);
            logMap.put("tAlive", situation.get(0));
            logMap.put("ctAlive", situation.get(1));

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println(nick + " поставил бомбу на " + bombsite + " в ситуации (" + situation + ")");
        } else if (readLine.contains("triggered \"Defused_The_Bomb\"")) {
            String nick = get_substring_idx(readLine, "\"", "<");

            logMap.put("type", "bombDefused");
            logMap.put("nick", nick);

            setLogs(curMatch, tournamentDoc, matchesList, logMap);

            //System.out.println(nick + " раздефузил бомбу");
        } else if (readLine.contains("disconnected (reason \"")) {
            String nick = get_substring_idx(readLine, "\"", "<");

            Player curPlayer = findByNick(nick);

            if (curPlayer != null) {
                ArrayList<Player> players = curMatch.getActivePlayers();

                for (Player player : players) {
                    if (player.getNickname().equals(nick)) {
                        players.remove(player);
                        curMatch.setActivePlayers(players);

                        for (Matches match : matchesList) {
                            if (match.getMatchId() == curMatch.getMatchId()) {
                                match = curMatch;
                            }
                        }
                        tournamentDoc.setMatches(matchesList);
                        tournamentRepository.save(tournamentDoc);
                        break;
                    }
                }


                logMap.put("type", "logout");
                logMap.put("nick", nick);
                logMap.put("side", curPlayer.getTeam());

                setLogs(curMatch, tournamentDoc, matchesList, logMap);
            }
        }
        //}
    }


    private Player findByNick(String nick){
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
                return player;
            }
        }
        return null;
    }


    private void setLogs(Matches curMatch, TournamentDoc tournamentDoc, ArrayList<Matches> matchesList, HashMap<String, Object> logMap){
        ArrayList<HashMap<String, Object>> logs = curMatch.getLogs();
        logs.add(logMap);

        for (Matches match : matchesList){
            if (match.getMatchId() == curMatch.getMatchId()){
                match = curMatch;
            }
        }

        tournamentDoc.setMatches(matchesList);
        tournamentRepository.save(tournamentDoc);
    }


    private void setDB(Matches curMatch, TournamentDoc tournamentDoc, ArrayList<Matches> matchesList){
        ArrayList<Player> players = new ArrayList<>();
        for (Player player : player_stats){
            if (player.getTeam().equals("CT") || player.getTeam().equals("T"))
                players.add(player);
        }
        curMatch.setActivePlayers(players);

        for (Matches match : matchesList){
            if (match.getMatchId() == curMatch.getMatchId()){
                match = curMatch;
            }
        }

        tournamentDoc.setMatches(matchesList);
        tournamentRepository.save(tournamentDoc);
    }


    private String getNick(String subString, String inputLine){
        int counter = 0;
        int firstIdx = -1;
        int secondIdx = -1;
        int baCounter = 0;
        for (int i = inputLine.indexOf(subString); i > 0; i--){
            if (inputLine.charAt(i) == '\"'){
                counter++;
                if (counter == 2) {
                    firstIdx = i + 1;
                    break;
                }
            }
            if (inputLine.charAt(i) == '<'){
                baCounter++;
                if (baCounter == 3) {
                    secondIdx = i;
                }
            }
        }
        return inputLine.substring(firstIdx, secondIdx);
    }


    /**
     * В данном методе мы проверяем команды двух игроков (убийцы и убитого) на идентичность,
     * дабы выяснить, тимкилл ли это
     * @param nick1 - убийца
     * @param nick2 - убитый
     * */
    private boolean isTeamKill(String nick1, String nick2) {
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
    private ArrayList<Integer> get_situation() {
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
        ArrayList<Integer> situation = new ArrayList<>();
        situation.add(t);
        situation.add(ct);
        return situation;
    }


    /**
     * Данный метод изменяет деньги соответствующего игрока
     * @param nick - игрок, у которого нужно изменить количество денег
     * @param cur_money - текущее количество денег игрока
     * */
    private void fix_money(String nick, int cur_money) {
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
                player.setMoney(cur_money);
            }
        }
    }


    /**
     * Данный метод изменяет хп игрока, если тот получил урон
     * @param nick - игрок, которому нанесли урон
     * */
    private void fix_hp(String nick, int hp){
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
//                if (player.getHp() - damage >= 0){
//                    int cur_hp = player.getHp() - damage;
//                    player.setHp(cur_hp);
//
//                    if (cur_hp == 0)
//                        death_reset(nick);
//                }
                player.setHp(hp);
                System.out.println("УРОН ПОСЛЕ ПОСЛЕ ДАМАГА У ИРОКА " + player.getNickname() + " " + hp);
            }
        }
    }


    private void fix_armor(String nick){
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
                player.setArmor(0);
            }
        }
    }


    /**
     * В данном методе, в зависимости от совершённой покупки, ставится то или иное значение
     * объекта класса {@link Player @Player}
     * @param nick - игрок, совершивший покупку
     * @param purchase - то, что игрок купил
     * */
    private void check_purchase(String nick, String purchase) {
        for (Player player : player_stats){
            if (Objects.equals(player.getNickname(), nick)) {
                if (Objects.equals(purchase, "item_defuser"))
                    player.setDef_kit(true);
                else if (Objects.equals(purchase, "item_kevlar"))
                    player.setArmor(1);
                else if (Objects.equals(purchase, "item_assaultsuit"))
                    player.setArmor(2);
                else {
                    System.out.println("Один) Игрок " + nick + " купил " + purchase + "\n Его пистолет: " + player.getPistol() + ", а оружие: " + player.getBest_weapon());
                    String gun = get_best_gun(player.getBest_weapon(), purchase);

                    if(Objects.equals(weapons.get(gun), "pistol"))
                        player.setPistol(gun);

                    player.setBest_weapon(gun);

                    System.out.println("Два) Игрок " + nick + " купил " + purchase + "\n Его пистолет: " + player.getPistol() + ", а оружие: " + player.getBest_weapon());
                }
            }
        }
    }


    /**
     * В данном методе увеличивается количество ассистов соответствующего игрока
     * @param nick - игрок, который сделал ассист
     * */
    private void fix_assists(String nick) {
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
    private void match_start() {
        for (Player player : player_stats){
            player.setBest_weapon("");
            player.setPistol("");
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
    private void round_start() {
        for (Player player : player_stats){
            player.setHp(100);
//            if (player.getBest_weapon().isEmpty()){
//                if (Objects.equals(player.getTeam(), "CT")){
//                    player.setBest_weapon("usp_silencer");
//                    player.setPistol("usp_silencer");
//                }
//                else if (Objects.equals(player.getTeam(), "TERRORIST")){
//                    player.setBest_weapon("glock");
//                    player.setPistol("glock");
//                }
//            }
        }
    }


    /**
     * Данный метод исправляет статистику убийцы и убитого - увеличивает килы и смерти
     * @param nick1 - убийца. У него увеличиваются килы
     * @param nick2 - убитый. У него увеличиваются смерти
     * */
    private void fix_stats(String nick1, String nick2, int score) {
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
    private void death_reset(String nick){
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
    private void set_killer_gun(String nick, String gun){
        for (Player player : player_stats) {
            if (Objects.equals(player.getNickname(), nick)) {
                player.setBest_weapon(get_best_gun(player.getBest_weapon(), gun));
            }
        }
    }


    private void set_dropped_gun(String nick, String gun){
        if (weapons.containsKey(gun)){
            for (Player player : player_stats) {
                if (Objects.equals(player.getNickname(), nick)) {
                    System.out.println("1)Игрок " + nick + " выкинул " + gun + "\n Его пистолет: " + player.getPistol() + ", а оружие: " + player.getBest_weapon());
                    String cur_gun = player.getBest_weapon();

                    if (Objects.equals(player.getPistol(), gun) || Objects.equals(player.getPistol(), "cz75a") && Objects.equals(gun, "p250") || Objects.equals(player.getPistol(), "usp_silencer") && Objects.equals(gun, "hkp2000"))
                        player.setPistol("");

                    if (Objects.equals(cur_gun, gun))
                        player.setBest_weapon(player.getPistol());

                    System.out.println("2)Игрок " + nick + " выкинул " + gun + "\n Его пистолет: " + player.getPistol() + ", а оружие: " + player.getBest_weapon());
                }
            }
        }
    }

    private void set_picked_gun(String nick, String gun){
        if (weapons.containsKey(gun)){
            for (Player player : player_stats){
                if (Objects.equals(player.getNickname(), nick)) {
                    System.out.println("А)Игрок " + nick + " поднял " + gun + "\n Его пистолет: " + player.getPistol() + ", а оружие: " + player.getBest_weapon());

                    String cur_gun = player.getBest_weapon();

                    if (Objects.equals(weapons.get(gun), "pistol"))
                        player.setPistol(gun);

                    if (cur_gun.isEmpty())
                        player.setBest_weapon(gun);

                    player.setBest_weapon(get_best_gun(cur_gun, gun));

                    System.out.println("Б)Игрок " + nick + " поднял " + gun + "\n Его пистолет: " + player.getPistol() + ", а оружие: " + player.getBest_weapon());
                }
            }
        }
    }

    /**
     * В данном методе происходит выбор оружия для отображения. Отображается "лучшее" оружие
     * @param cur_gun - нынешнее оружие игрока
     * @param new_gun - оружие, которое игрок купил/с которого совершил кил. С ним происходит сравнение
     * @return оружие, которое будет отображено
     * */
    private String get_best_gun(String cur_gun, String new_gun){
        if (weapons.containsKey(new_gun)){
            if (!weapons.containsKey(cur_gun))
                return new_gun;

            String c_gun = weapons.get(cur_gun);
            String n_gun = weapons.get(new_gun);

//            // Пистолет и пистолет
//            if (Objects.equals(c_gun, "pistol") && Objects.equals(n_gun, "pistol"))
//                return new_gun;
//
//            // Пистолет и всё остальное
//            else if (Objects.equals(c_gun, "pistol") && Objects.equals(n_gun, "two-handed"))
//                return new_gun;
//
//                // Всё остальное и всё остальное
//            else if (Objects.equals(c_gun, "two-handed") && Objects.equals(n_gun, "two-handed"))
//                return new_gun;
            if (!(Objects.equals(c_gun, "two-handed") && Objects.equals(n_gun, "pistol")) && !Objects.equals(cur_gun, new_gun))
                return new_gun;
        }
        return cur_gun;
    }


    /**
     * В данном методе соответствующему игроку изменяется команда при смене сторон
     * */
    private void set_team(String nick, String team){
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
    private boolean contains_player(String nick){
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
    private String get_money(String input){
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
    private String get_substring_idx(String input, String ch1, String ch2){
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
    private String get_substring_lidx(String input, String ch1, String ch2){
        int start = input.indexOf(ch1) + 1;
        int end = input.lastIndexOf(ch2);

        return input.substring(start, end);
    }


    /**
     * В данном методе получаем подстроку, которая начинается с первого пробела входной строки
     * @param input - входная строка, из которой будем вылинять подстроку
     * @return полученная подстрока
     * */
    private String get_substring_space(String input) {
        int start = input.indexOf(" ") + 1;

        return input.substring(start);
    }
}
