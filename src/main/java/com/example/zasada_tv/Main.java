package com.example.zasada_tv;


import com.example.zasada_tv.mongo_collections.documents.*;
import com.example.zasada_tv.mongo_collections.embedded.*;
import com.example.zasada_tv.mongo_collections.interfaces.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Objects;


@SpringBootApplication
@EnableMongoRepositories
public class Main implements CommandLineRunner {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private TournamentRepository tournamentRepository;

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private PlayerRepository playerRepository;


	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		//testAdmin();
		//testPlayer();
		//testTeam();
		//testTournament();

		String match_id = "1";

		ArrayList<Player> players = LogParser.parse();
		for(Player player : players){
			for(PlayerDoc playerDoc : playerRepository.findByNick(player.getNickname())){
				for(PlayerStats playerStats : playerDoc.getPlayerStats()){
					if(Objects.equals(playerStats.getMatch_id(), match_id)){
						System.out.println(playerDoc.toString());
						int kills = playerStats.getKills() + player.getKills();
						int assists = playerStats.getAssists() + player.getAssists();
						int deaths = playerStats.getDeaths() + player.getDeaths();

						playerStats.setKills(kills);
						playerStats.setAssists(assists);
						playerStats.setDeaths(deaths);
						playerStats.setKd((float)kills / deaths);
						System.out.println(playerDoc.toString());
						playerRepository.save(playerDoc);
					}
				}
			}
		}
	}


	private void testPlayer() {
		System.out.println("\n-----------Игроки-----------");
		playerRepository.deleteAll();

		ArrayList<PlayerStats> playerStats = new ArrayList<PlayerStats>();
		playerStats.add(new PlayerStats("1", 20,5, 15,1.33));

		ArrayList<TournamentHistoryPlayers> tournamentHistoryPlayers = new ArrayList<TournamentHistoryPlayers>();
		tournamentHistoryPlayers.add(new TournamentHistoryPlayers("Pugachev Major 2022", "ПУПА"));
		tournamentHistoryPlayers.add(new TournamentHistoryPlayers("Zasada Cup", "ПУПА"));

		PlayerDoc playerDoc1 = new PlayerDoc("987e412udajin", "Tamada", "Симовин Кирилл",
				LocalDateTime.now(), "Russia", "Пугачёв", "steamcommunity.com/id/tamada4a",
				"VolceChat", "Tamada#2134", "vk.com/tarnada", "ПУПА",
				"Капитан", "disk.yandex.ru/i/2a-504tusqDEWA", tournamentHistoryPlayers,
				playerStats);

		PlayerDoc playerDoc2 = new PlayerDoc("987e2da412udajin", "Hitry_Kazah", "Актаев Амир",
				LocalDateTime.now(), "Russia", "Пугачёв", "steamcommunity.com/id/hitry_kazah",
				"Hitry_Kazah", "", "", "ПУПА",
				"Игрок", "disk.yandex.ru/i/7wy1obVsCg4juQ", tournamentHistoryPlayers,
				playerStats);

		playerRepository.save(playerDoc1);
		playerRepository.save(playerDoc2);

		System.out.println("Выводим игрока с именем Актаев Амир");
		playerRepository.findByFname("Актаев Амир");
	}


	private void testTeam() {
		System.out.println("\n-----------Команда-----------");
		teamRepository.deleteAll();

		TeamDoc teamDoc1 = new TeamDoc("ПУПА", "Одна из первых команд города",
				"Россия", "Пугачёв", "disk.yandex.ru/i/ADFb9AuidHo9SQ");

		TeamDoc teamDoc2 = new TeamDoc("DreamTeam", "Вторая из первых команд города",
				"Россия", "Пугачёв", "disk.yandex.ru/i/s8nMFeOec3uklA");

		TeamDoc teamDoc3 = new TeamDoc("G2", "Одна из лучших команд мира",
				"Франция", "Марсель", "");

		teamRepository.save(teamDoc1);
		teamRepository.save(teamDoc2);
		teamRepository.save(teamDoc3);

		System.out.println("Вывод команды с названием ПУПА");
		teamRepository.findByTeamName("ПУПА").forEach(System.out::println);

		System.out.println("\nВывод команды с названием описанием Лучшая из лучших команда");
		teamRepository.findByDescription("Лучшая из лучших команда").forEach(System.out::println);

		System.out.println("\nВывод команды из Марселя");
		teamRepository.findByCity("Марсель").forEach(System.out::println);

		System.out.println("\nВывод команды из России");
		teamRepository.findByCountry("Россия").forEach(System.out::println);

		// удаляем команды из России
		teamRepository.deleteByCountry("Россия");
	}


	private void testTournament(){
		System.out.println("\n-----------Турнир-----------");
		tournamentRepository.deleteAll();

		ArrayList<TournamentHistoryTeams> historyTeams = new ArrayList<TournamentHistoryTeams>();
		historyTeams.add(new TournamentHistoryTeams("ПУПА", "3-4", "1.000 рублей"));
		historyTeams.add(new TournamentHistoryTeams("DreamTeam", "1", "4.000 рублей"));

		ArrayList<Requests> requests = new ArrayList<Requests>();
		requests.add(new Requests("1", "ПУПА", "Одобрено"));
		requests.add(new Requests("2", "DreamTeam", "Одобрено"));
		requests.add(new Requests("3", "zxcCursed", "Отказано"));

		ArrayList<Matches> matches = new ArrayList<Matches>();
		matches.add(new Matches("1", 16, 19, LocalDateTime.now(), "Закончен", "ПУПА", "DreamTeam"));

		TournamentDoc tournamentDoc1 = new TournamentDoc("Pugachev Major 2022", LocalDateTime.now(), LocalDateTime.now(),
				"LAN", "Окончен", "Россия", "Пугачёв", "",
				"8.000 рублей", requests, historyTeams, matches);

		TournamentDoc tournamentDoc2 = new TournamentDoc("Zasada Cup", LocalDateTime.now(), LocalDateTime.now(),
				"Online", "Текущий", "Россия", "Вольск", "",
				"200 рублей", requests, historyTeams, matches);

		tournamentRepository.save(tournamentDoc1);
		tournamentRepository.save(tournamentDoc2);

		System.out.println("Вывод турнира с датой старта " + LocalDateTime.now());
		tournamentRepository.findByDateStart(LocalDateTime.now()).forEach(System.out::println);

		System.out.println("\nВывод турнира с датой конца " + LocalDateTime.now());
		tournamentRepository.findByDateEnd(LocalDateTime.now()).forEach(System.out::println);

		System.out.println("\nВывод Онлайн турнира");
		tournamentRepository.findByType("Online").forEach(System.out::println);

		System.out.println("\nВывод текущего турнира");
		tournamentRepository.findByStatus("Текущий").forEach(System.out::println);

		System.out.println("\nВывод турнира из России");
		tournamentRepository.findByCountry("Россия").forEach(System.out::println);

		System.out.println("\nВывод турнира из Пугачёва");
		tournamentRepository.findByCity("Пугачёв").forEach(System.out::println);

		System.out.println("\nВывод турнира с призовым 8.000 рублей");
		tournamentRepository.findByPrize("8.000 рублей").forEach(System.out::println);

		System.out.println("\nВывод турнира с названием: Pugachev Major 2022");
		tournamentRepository.findByName("Pugachev Major 2022").forEach(System.out::println);

		// удаляем по названию
		tournamentRepository.deleteByName("Pugachev Major 2022");
	}


	private void testAdmin(){
		System.out.println("\n------------Админ------------");
		adminRepository.deleteAll();

		adminRepository.save(new AdminDoc("Tamada"));
		adminRepository.save(new AdminDoc("da4aTama"));
		adminRepository.save(new AdminDoc("ugly4"));

		// удаляем по id
		adminRepository.deleteByAdminId("Tamada");

		System.out.println("Вывод админа с id ugly4");
		adminRepository.findByAdminId("ugly4").forEach(System.out::println);

		System.out.println("\nВывод всех админов");
		adminRepository.findAll().forEach(System.out::println);
	}
}
