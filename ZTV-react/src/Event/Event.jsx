import React from "react";
import { useState } from "react";
import {Routes, Route, NavLink, Navigate, useParams} from 'react-router-dom'
import FlagName from "../components/FlagName/FlagName";
import EventInfo from "../components/EventMaker/EventInfo/EventInfo";
import EventMatches from "../components/EventMaker/EventMatches";
import EventResults from "../components/EventMaker/EventResults/EventResults";
import Login from "../Login/Login";
import Notification from "../components/Notification/Notification";
import DateSelector from "../components/MatchHelper/DateSelector";
import Editor from "../components/Editor/Editor";
import "./Event.css";
import '../components/Tabs/PlayerTabs/PlayerTabs.css';

function Event(){
    const isAdmin = true;

    const params = useParams();

    const [registrationInfoEditorActive, setRegistrationInfoEditorActive] = useState(false);

    const tournament ={
        date: "03.12 - 05.12.2023",
        prize: "10.000.000",
        fee: "1.000",
        teams: "16",
        regTeams: "0",
        type: "Online",
        format: "2x2"

    }
    const drawOngoing = () =>{
        return(
            <div>
                <ul className="event_tabs">
                    <li className="tab_link">
                        <div className="row_center_5px">
                            <NavLink to="info" style={({ isActive }) => ({  // если активна, то текст белый
                                color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                                Информация
                            </NavLink>
                            {isAdmin ?<Editor size="14px" depth={1} onClick={() => setEditOngoingActive(true)}/> : <></>}
                        </div>
                    </li>
                    <li className="tab_link">
                        <NavLink to="matches" style={({ isActive }) => ({  // если активна, то текст белый
                            color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                            Матчи
                        </NavLink>
                    </li>
                    <li className="tab_link">
                        <NavLink to="results" style={({ isActive }) => ({  // если активна, то текст белый
                            color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                            Результаты
                        </NavLink>
                    </li>
                </ul>
                <Routes>
                    <Route index element={<Navigate replace to={"/event/"+ params.id +"/info"} />}/>
                    <Route path="info" element={<EventInfo maps={maps} part={participants} total={total} prizePlace={prizePlace} part_header={part_header} photoLink={photoLink} status="ended" isAdmin={isAdmin}/>}/>
                    <Route path="matches" element={<EventMatches current_matches={current_matches} ongoing_matches={ongoing_matches}/>}/>
                    <Route path="results" element={<EventResults results={results}/>}/>
                </Routes>
            </div>
        );
    }

    const drawEnded = () =>{
        return(
            <div>
                <ul className="event_tabs">
                    <li className="tab_link">
                        <NavLink to="info" style={({ isActive }) => ({  // если активна, то текст белый
                            color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                            Информация
                        </NavLink>
                    </li>
                    <li className="tab_link">
                        <NavLink to="results" style={({ isActive }) => ({  // если активна, то текст белый
                            color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                            Результаты
                        </NavLink>
                    </li>
                </ul>
                <Routes>
                    <Route index element={<Navigate replace to={"/event/"+ params.id +"/info"} />}/>
                    <Route path="info" element={<EventInfo maps={maps} part={participants} total={total} prizePlace={prizePlace} part_header={part_header} photoLink={photoLink} status="ended" isAdmin={isAdmin}/>}/>
                    <Route path="results" element={<EventResults results={results}/>}/>
                </Routes>
            </div>
        );
    }
    
    const maps = ["Ancient", "Anubis", "Inferno", "Mirage", "Nuke", "Overpass", "Vertigo"]
    const registred = [
        {name: "Tamada", src: "img/players/Tamada.png", team: "Amfier", teamsrc: "img/teams_logo/Amfier.png", status: "await", type: "player"},
        {name: "rusttle", src: "img/players/rusttle.png", team: "", teamsrc: "", status: "accepted", type: "player"},
        {name: "Amfier", src: "img/teams_logo/Amfier.png", status: "accepted", type: "team"},
        {name: "Walhalla", src: "img/teams_logo/Walhalla.png", status: "await", type: "team"}
    ];

    const participants =[
        {name: "Tamada", src: "img/players/Tamada.png", team: "Amfier", teamsrc: "img/teams_logo/Amfier.png", status: "", type: "player"},
        {name: "rusttle", src: "img/players/rusttle.png", team: "", teamsrc: "", status: "", type: "player"},
        {name: "Walhalla", src: "img/teams_logo/Walhalla.png", status: "kicked", type: "team"},
        {name: "Walhalla", src: "img/teams_logo/Walhalla.png", status: "", type: "team"}
    ]
    const total = 16;

    const prizePlace = [
        {place: "1-2ое", prize: "10.000р", winner: "", src: ""},
        {place: "1-2ое", prize: "10.000р", winner: "", src: ""},
        {place: "3-4е", prize: "5.000р", winner: "", src: ""},
        {place: "3-4е", prize: "5.000р", winner: "", src: ""},
        {place: "5-6ое", prize: "2.500р", winner: "", src: ""},
        {place: "5-6ое", prize: "2.500р", winner: "", src: ""},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "", src: ""},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "ПУПА", src: "img/teams_logo/pupa.svg"},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "Amfier", src: "img/teams_logo/Walhalla.png"},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "Walhalla", src: "img/teams_logo/Walhalla.png"}
    ]

    const prizePlace2 = [
        {place: "1-2ое", prize: "10.000р", winner: "", src: ""},
        {place: "1-2ое", prize: "10.000р", winner: "", src: ""},
        {place: "3-4е", prize: "5.000р", winner: "", src: ""},
        {place: "3-4е", prize: "5.000р", winner: "", src: ""},
        {place: "5-6ое", prize: "2.500р", winner: "", src: ""},
        {place: "5-6ое", prize: "2.500р", winner: "", src: ""},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "", src: ""},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "", src: ""},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "", src: ""},
        {place: "7-10ое", prize: "Сертификаты клуба", winner: "", src: ""}
    ]

    const type = "team";
    const part_header = type === "team" ? "Команды" : "Участники";

    const photoLink = "https://disk.yandex.ru/d/5DJs4LKcEYfYxA";

    const current_matches = [
        {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftUpperScore: 9, rightUpperScore: 16, leftSubScore: 0, rightSubScore: 0, tier: 3, tierSrc: "../img/Top_star.svg", map: "anb"},
        {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftUpperScore: 16, rightUpperScore: 1, leftSubScore: 0, rightSubScore: 0, tier: 4, tierSrc: "../img/Top_star.svg", map: "anb"},
        {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftUpperScore: 15, rightUpperScore: 15, leftSubScore: 1, rightSubScore: 0, tier: 0, tierSrc: "../img/Top_star.svg", map: "bo3"},
        {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftUpperScore: 0, rightUpperScore: 0, leftSubScore: 2, rightSubScore: 2, tier: 5, tierSrc: "../img/Top_star.svg", map: "bo5"},
    ]

    const ongoing_matches = [
        {date: "15.03.2023", matches: [
            {time: "12:00", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", tier: 3, tierSrc: "../img/Top_star.svg", map: "anb"},
            {time: "12:45", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", tier: 5, tierSrc: "../img/Top_star.svg", map: "bo2"},
            {time: "13:45", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", tier: 3, tierSrc: "../img/Top_star.svg", map: "nuke"},
        ]},
        {date: "16.03.2023", matches: [
            {time: "09:45", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", tier: 3, tierSrc: "../img/Top_star.svg", map: "anb"},
            {time: "22:45", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", tier: 5, tierSrc: "../img/Top_star.svg", map: "bo2"},
            {time: "23:00", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", tier: 3, tierSrc: "../img/Top_star.svg", map: "nuke"},
        ]},
    ]

    const results = [
        {date: "03.12.2023", matches: [
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Walhalla", leftTeamSrc: "../img/teams_logo/Walhalla.png", rightTeam: "Amfier", rightTeamSrc: "../img/teams_logo/Amfier.png", leftScore: 16, rightScore: 8, tier: 5, tierSrc: "../img/Top_star.svg", map: "nuke"},
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftScore: 9, rightScore: 16, tier: 0, tierSrc: "../img/Top_star.svg", map: "trn"},
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftScore: 22, rightScore: 20, tier: 4, tierSrc: "../img/Top_star.svg", map: "cbble"}
        ]},
        {date: "04.12.2023", matches: [
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftScore: 16, rightScore: 8, tier: 1, tierSrc: "../img/Top_star.svg", map: "dust 2"},
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftScore: 9, rightScore: 16, tier: 3, tierSrc: "../img/Top_star.svg", map: "anb"},
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "../img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "../img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "../img/teams_logo/Walhalla.png", leftScore: 2, rightScore: 0, tier: 4, tierSrc: "../img/Top_star.svg", map: "bo3"}
        ]}
    ]

    const status = "ended" //registration, ongoing, ended
    const isCap = true; //капитан ли смотрит
    const errors = false; // есть ли причины не попасть на турик
    const [activeJoinTourWindow, setJoinTourWindowActive] = useState(false); // окно уточнения для регистрации на турик
    const [activeLeaveTourWindow, setLeaveTourWindowActive] = useState(false); // окно уточнения "покидания" турика
    const [activeTour, setActiveTour] = useState(false); // переменная, отвечающая за то зарегана ли команда на турик
    const [activeEditTeamWindow, setActiveEditTeamWindow] = useState(false); // окно изменения состава на турик

    const [dateSelected, setDateSelected] = useState('03.05.2023'); // здесь хранится выбраная дата
    const [dateEndSelected, setDateEndSelected] = useState('05.05.2023'); // здесь хранится выбраная дата

    const [valueStartDate, setValueStartDate] = useState('03.05.2023'); // Это для даты выбранного матча
    const [valueEndDate, setValueEndDate] = useState('05.05.2023'); // Это для даты выбранного матча

    const [dateSelectorActive, setDateSelectorActive] = useState(false); // открыт/закрыт календарь
    const [dateEndSelectorActive, setDateEndSelectorActive] = useState(false); // открыт/закрыт календарь

    const [citySelected, setCitySelected] = useState('Выберите город'); // здесь хранится выбраный турнир
    const [valueCity, setValueCity] = useState('Выберите город'); //Для селектора страны

    const [countrySelected, setCountrySelected] = useState('Выберите страну'); // здесь хранится выбраный турнир
    const [valueCountry, setValueCountry] = useState('Выберите страну'); //Для селектора страны

    const [countrySelectorActive, setCountrySelectorActive] = useState(false); 
    const [citySelectorActive, setCitySelectorActive] = useState(false); 

    const [valuePrize, setValuePrize] = useState('Укажите приз'); //Для селектора приза
    const [valueFee, setValueFee] = useState('Укажите взнос'); //Для селектора взноса
    const [selectedPrize, setSelectedPrize] = useState('Укажите приз'); //Для селектора приза
    const [selectedFee, setSelectedFee] = useState('Укажите взнос'); //Для селектора взноса
    

    const [selectedFormat, setSelectedFormat] = useState('Выберите формат'); // формат (bo1 и тп)
    const [valueFormat, setValueFormat] = useState('Выберите формат'); // формат (bo1 и тп)
    const [formatSelectorActive, setFormatSelectorActive] = useState(false);

    const [selectedType, setSelectedType] = useState('Выберите тип'); // тип (Лан/Онлайн)
    const [valueType, setValueType] = useState('Выберите тип'); // тип (Лан/Онлайн)
    const [typeSelectorActive, setTypeSelectorActive] = useState(false);
    const [deleteEventActive, setDeleteEventActive] = useState(false);

    const [editOngoingActive, setEditOngoingActive] = useState(false);
    
    const [selectedPath, setSelectedPath] = useState('Укажите путь до файла'); // тип (Лан/Онлайн)

    const [valueName, setValueName] = useState('Укажите название'); // тип (Лан/Онлайн)
    const [selectedName, setSelectedName] = useState('Укажите название'); // тип (Лан/Онлайн)

    const countries =[
        {name: "Россия", flagPath: "img/flags/mini/Russia.svg", cities: ["Пугачёв", "Самара", "Саратов", "Сызрань", "Балаково", "Тольятти"]},
        {name: "Остров Мэн", flagPath: "img/flags/mini/IsleOfMan.svg", cities: ["Дуглас", "Рамси", "Пил", "Каслтаун", "Лакси", "Онкан"]},
        {name: "Албания", flagPath: "img/flags/mini/Albania.svg", cities: ["Берат", "Буррели", "Влёра", "Гирокастра", "Грамши", "Дуррес"]},
        {name: "Испания", flagPath: "img/flags/mini/Spain.svg", cities: ["Барселона", "Мадрид", "Валенсия", "Севилья", "Мурсия", "Пальма"]},
        {name: "Белиз", flagPath: "img/flags/mini/Belize.svg", cities: ["Белиз Сити", "Сан-Игнасио", "Бельмопан", "Сан-Педро", "Коросаль", "Дангрига"]},
        {name: "Косово", flagPath: "img/flags/mini/Kosovo.svg", cities: ["Витина", "Вучитрн", "Глоговац", "Гнилане", "Дечани", "Джяковица"]}
    ]

    const getMinDate = () =>{
        const date = new Date();
        let day = date.getDate();
        day = day < 10 ? ("0" + day) : day;
  
        let month = date.getMonth() + 1;
        month = month < 10 ? ("0" + month) : month;
  
        return (day + "." + month + "." + date.getFullYear());
    }

    const toggleEndDate = () => { 
        setDateEndSelectorActive(!dateEndSelectorActive);
        setDateSelectorActive(false);
    };

    const toggleDate = () => { 
        setDateSelectorActive(!dateSelectorActive);
        setDateEndSelectorActive(false);
    };

    const toggleCountry = () => { // функция toggle для селектора
        setCountrySelectorActive(!countrySelectorActive);
    };

    const toggleCity = () => { // функция toggle для селектора
        setCitySelectorActive(!citySelectorActive);
    };

    const toggleFormat = () => {
        setFormatSelectorActive(!formatSelectorActive);
    }
  
    const toggleType = () => {
        setTypeSelectorActive(!typeSelectorActive);
    }

    const getElemByCountry = (country) => {
        for(let i = 0; i < countries.length; ++i){
            if(countries[i].name === country){
                return countries[i];
            }
        }
    }

    const [list, setList] = useState([]); //список уведомлений
    function showToast(type){ //"вывести уведомление"
        let toastProperties = null;
        switch (type){
            case "errorJoinTour":
                toastProperties = {
                    description: "Вы не можете принять участие в турнире: *причина*",
                    border: "1px solid #FF1E1E"
                }; break;
            case "successJoinTour":
                toastProperties = {
                    description: "Вы успешно зарегистрированы на турнир",
                    border: "1px solid var(--base-05)"
                }; break;
            case "successLeaveTour":
                toastProperties = {
                    description: "Вы отказались от участия в турнире",
                    border: "1px solid var(--base-05)"   
                }; break;
            case "successEditTeam":
                toastProperties = {
                    description: "Вы успешно изменили состав",
                    border: "1px solid var(--base-05)"
                }; break;
            default:
                setList([]);
        }
        setList([...list, toastProperties]);
    }

    const [playersActive, setPlayersActive] = useState([false, false, false, false, false]); // состояния игроков - выбран ли игрок(чтоб блокировать его)
    const [selectorActive, setSelectorActive] = useState([false, false]); // состояния селектора
    const [valuePlayer, setValuePlayer] = useState(['Выберите игрока', 'Выберите игрока']); //Для селектора команды
    const toggleClass = (id) => { // функция toggle для селектора
        let temp = [];
        for(let i = 0; i < selectorActive.length; ++i){
          temp.push(false);
        }
        if(id !== "all"){
          temp[id] = !selectorActive[id];
        }
        setSelectorActive(temp);
      };
    
      const setPlayer = (id, value) =>{ // с её помощью делаем нужную команду заблокированной 
        let temp = [...playersActive];
        let val = indexOf(value);
    
        temp[val] = !temp[val];
        temp[id] = !temp[id];
        setPlayersActive(temp);
      }
    
      const setPLayerValue = (id, value) =>{ // ставим выбранную команду в выбранное поле
        let tempPlayers = [...valuePlayer];
        tempPlayers[id] = value;
        setValuePlayer(tempPlayers);
      }
    
      const indexOf = (value) =>{
        for(let i = 0; i < players.length; ++i){
          if(value === players[i].name){
            return i;
          }
        }
      }
    const players = [ // для селектора
        {name: "Tamada"}, 
        {name: "ugly4"}, 
        {name: "_SD_"}, 
        {name: "risttle"}, 
        {name: "Hitry_Kazah"}
        ];
        
    const generateSelectors = () =>{ //селектор игрока
        const size = players.length;
        let content = []
        for(let i = 0; i < 2; ++i){
            
          content.push(
                
              <div className="text-field_half" style={{zIndex: size - i}}>
                <div className="text-field_half_selector">
                  <div className="text_field_half_select" onClick={() => toggleClass(i)}>
                    <p className={valuePlayer[i] === "Выберите игрока" ? "onStart" : "choosed"}>{valuePlayer[i]}</p>
                    <img src="../img/arrow.svg" className={selectorActive[i] ? 'rotate' : null} alt="arrow"/>
                  </div>
                  <ul className={ selectorActive[i] ? 'select_list' : 'select_list hide'}>
                    {players.map((player) =>
                      <li className={playersActive[indexOf(player.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setPLayerValue(i, player.name); setPlayer(indexOf(player.name), valuePlayer[i]); toggleClass(i)}}>
                        <p>{player.name}</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
          );
        }
        return content;
    }

    return(
        <div>
            <div className="event_image_header">
                <div className="crop_header"><img src="../../img/event_logo/IEMHeader.png" alt="IEM"/></div>
            </div>
            <div className="event_header">
                <div className="info_wrapper">
                    <div className="row_center_5px">
                        <span>Дата</span>
                        {isAdmin ? status === "registration" ? <Editor size="12px" depth={2} onClick={() => setRegistrationInfoEditorActive(true)}/> : <></> : <></>}
                    </div>
                    <div className="event_date_wrapper"><p>{tournament.date}</p></div>
                </div>

                <div className="info_wrapper">
                    <span>Приз</span>
                    <div className="event_prize_wrapper"><p>{tournament.prize}</p></div>
                </div>

                <div className="info_wrapper">
                    <span>Взнос</span>
                    <div className="event_fee_wrapper"><p>{tournament.fee}р</p></div>
                </div>

                <div className="info_wrapper">
                    <span>Команды</span>
                    <div className="event_team_wrapper"><p>{tournament.regTeams}/{tournament.teams}</p></div>
                </div>

                <div className="info_wrapper">
                    <span>Тип</span>
                    <div className="event_type_wrapper"><p>{tournament.type}</p></div>
                </div>
                
                <div className="info_wrapper">
                    <span>Формат</span>
                    <div className="event_format_wrapper"><p>{tournament.format}</p></div>
                </div>

                <div className="info_wrapper">
                    <span>Локация</span>
                    <div className="event_location_wrapper"><FlagName flagPath="../img/flags/mini/Russia.svg" country="Россия" name="Россия, Пугачёв" height='12px'/></div>
                </div>
            </div>
            {(isCap && !activeTour) ? 
                <div className="join_tournament" onClick={() => setJoinTourWindowActive(true)}>
                    <p>Принять участие в турнире</p>
                </div>
                :
                <div style={{display: "flex", flexDirection: "row", margin: "0 auto", marginTop: "25px", gap: "10px", justifyContent: "center"}}>
                    <div className="leave_tournament" style={{margin: "0"}} onClick={() => setLeaveTourWindowActive(true)}>
                        <p>Отказаться от участия</p>
                    </div>
                    {tournament.format == "2x2" ? 
                    <div className="join_tournament" style={{margin: "0"}} onClick={() => setActiveEditTeamWindow(true)}>
                        <p>Изменить состав команды</p>
                    </div> :
                    null}
                    
                </div>
            }
            {status === "registration" ? <EventInfo maps={maps} part={registred} total={total} prizePlace={prizePlace} part_header={part_header} photoLink={photoLink} status="registration" isAdmin={isAdmin}/> : 
            status === "ongoing" ? drawOngoing() :
            drawEnded()}
            
            <Login active={activeJoinTourWindow} setActive={setJoinTourWindowActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Принять участие в турнире?</p>
                </div>
                <div className="small_buttons_wrapper">
                    <div className="small_dark_button">
                        <input type="submit" value="Нет" onClick={() => activeJoinTourWindow ? setJoinTourWindowActive(!activeJoinTourWindow) : null}/>
                    </div>
                    <div className="small_grey_button">
                        <input type="submit" value="Да" onClick={() =>  (activeJoinTourWindow && !errors)  ? (tournament.format == "2x2" ? setActiveEditTeamWindow(true) : null , setJoinTourWindowActive(!activeJoinTourWindow), setActiveTour(true),showToast("successJoinTour")) : (setJoinTourWindowActive(!activeJoinTourWindow), showToast("errorJoinTour"))}/>
                    </div>
                </div>
            </Login>

            <Login active={activeLeaveTourWindow} setActive={setLeaveTourWindowActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Вы уверены, что хотите отказаться от участия в турнире?</p>
                </div>
                <div className="small_buttons_wrapper">
                    <div className="small_dark_button">
                        <input type="submit" value="Нет" onClick={() => activeLeaveTourWindow ? setLeaveTourWindowActive(!activeLeaveTourWindow) : null}/>
                    </div>
                    <div className="small_grey_button">
                        <input type="submit" value="Да" onClick={() =>  activeLeaveTourWindow  ? (setLeaveTourWindowActive(!activeLeaveTourWindow), setActiveTour(false), showToast("successLeaveTour")) : null}/>
                    </div>
                </div>
            </Login>

            <Login active={activeEditTeamWindow} setActive={setActiveEditTeamWindow}>
                <div className="header_splash_window" onClick={() => toggleClass("all")}>
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text" onClick={() => toggleClass("all")}>
                    <p>Выберите игроков для участия в турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="row_center_6">
                        
                            {generateSelectors()}
                        
                    </div>
                    <div className="full_grey_button" >
                        <input type="submit" value="Подтвердить" onClick={() => activeEditTeamWindow ? (setActiveEditTeamWindow(!activeEditTeamWindow), showToast("successEditTeam")) : null} />
                    </div>
                </div>
                
            </Login>

            <Notification props={list}></Notification>

            
            <Login active={registrationInfoEditorActive} setActive={setRegistrationInfoEditorActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside scroll">
                        <DateSelector toggleDate={toggleDate} dateSelected={dateSelected} valueDate={valueStartDate} dateSelectorActive={dateSelectorActive} setDate={setDateSelected} minDate={getMinDate()}/>
                        <DateSelector toggleDate={toggleEndDate} dateSelected={dateEndSelected} valueDate={valueEndDate} dateSelectorActive={dateEndSelectorActive} setDate={setDateEndSelected} minDate={getMinDate()}/>
                        <div className="row_center_6" style={{alignItems: "flex-start", width: "464px", zIndex: 2}}>
                                    <div className="text-field_half">
                                        <div className="text-field_half_selector">
                                            <div className="text_field_half_select" onClick={() => toggleCountry()}>
                                                <p className={countrySelected === valueCountry ? "onStart" : "choosed"}>{countrySelected}</p>
                                                <img src="../img/arrow.svg" id="arrowIcon" className={countrySelectorActive ? 'rotate' : null} alt="arrow"/>
                                            </div>
                                            <ul className={ countrySelectorActive ? 'select_list' : 'select_list hide'}>
                                                {countries.map((country) =>
                                                    <li className='text_field_half_options' onClick={() => {setCountrySelected(country.name); toggleCountry()}}>
                                                        <img src={"../" + country.flagPath} alt={country.name}/>
                                                        <p>{country.name}</p>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    {countrySelected !== "Выберите страну" ?
                                        <div className="text-field_half">
                                            <div className="text-field_half_selector">
                                                <div className="text_field_half_select" onClick={() => toggleCity()}>
                                                    <p className={citySelected === valueCity ? "onStart" : "choosed"}>{citySelected}</p>
                                                    <img src="../img/arrow.svg" id="arrowIcon" className={citySelectorActive ? 'rotate' : null} alt="arrow"/>
                                                </div>
                                                <ul className={ citySelectorActive ? 'select_list' : 'select_list hide'}>
                                                    {getElemByCountry(countrySelected).cities.map((city) =>
                                                        <li className='text_field_half_options' onClick={() => {setCitySelected(city); toggleCity()}}>
                                                            <p>{city}</p>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    :
                                        <></>
                                    }
                        </div>
                        <div className="row_center_6">
                            <div className="text-field_half">
                                <input className="text-field_half input" style={{color: selectedPrize === valuePrize ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedPrize} placeholder="Укажите приз" onChange={e => {setSelectedPrize(e.target.value)}}/>
                            </div>
                            <div className="text-field_half">
                                <input className="text-field_half input" style={{color: selectedFee === valueFee ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedFee} placeholder="Укажите взнос" onChange={e => {setSelectedFee(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row_center_6" style={{zIndex: 1}}>
                                    <div className="text-field_half">
                                        <div className="text-field_half_selector">
                                        <div className="text_field_half_select" onClick={() => toggleFormat()}>
                                            <p className={selectedFormat === "Выберите формат" ? "onStart" : "choosed"}>{selectedFormat}</p>
                                            <img src="../img/arrow.svg" className={formatSelectorActive ? 'rotate' : null} alt="arrow"/>
                                        </div>
                                        <ul className={ formatSelectorActive ? 'select_list' : 'select_list hide'}>
                                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("1x1"); toggleFormat()}}>
                                                <p>1x1</p>
                                            </li>
                                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("2x2"); toggleFormat()}}>
                                                <p>2x2</p>
                                            </li>
                                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("5x5"); toggleFormat()}}>
                                                <p>5x5</p>
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
                                    <div className="text-field_half">
                                        <div className="text-field_half_selector">
                                        <div className="text_field_half_select" onClick={() => toggleType()}>
                                            <p className={selectedType === "Выберите тип" ? "onStart" : "choosed"}>{selectedType}</p>
                                            <img src="../img/arrow.svg" className={typeSelectorActive ? 'rotate' : null} alt="arrow"/>
                                        </div>
                                        <ul className={ typeSelectorActive ? 'select_list' : 'select_list hide'}>
                                            <li className="text_field_half_options" onClick={()=>{setSelectedType("Lan"); toggleType()}}>
                                                <p>Lan</p>
                                            </li>
                                            <li className="text_field_half_options" onClick={()=>{setSelectedType("Online"); toggleType()}}>
                                                <p>Online</p>
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
                        </div>
                        <div className="row_center_6">
                                    <div className="text-field_half">
                                        <div className="text-field_half_selector">
                                            <label for="file-input">
                                                <div className="text_field_half_select">
                                                    <p className={selectedPath === "Укажите путь до файла" ? "onStart" : "choosed"}>{selectedPath}</p>
                                                    <img src="../img/Add.svg" alt="Add" style={{width: "15px"}}/>
                                                </div>
                                            </label>
                                            <input id="file-input" type="file" style={{all: "unset", width: "0px", height: "0px"}}/>
                                        </div>
                                    </div>
                                    <div className="text-field_half">
                                        <div className="text-field_half_selector">
                                            <label for="file-input">
                                                <div className="text_field_half_select">
                                                    <p className={selectedPath === "Укажите путь до файла" ? "onStart" : "choosed"}>{selectedPath}</p>
                                                    <img src="../img/Add.svg" alt="Add" style={{width: "15px"}}/>
                                                </div>
                                            </label>
                                            <input id="file-input" type="file" style={{all: "unset", width: "0px", height: "0px"}}/>
                                        </div>
                                    </div>
                        </div>
                        <div className="text-field">
                            <input className="text-field_input" type="text" style={{color: selectedName === valueName ? "var(--white70)" : "white"}} name="diskLink" placeholder="Укажите название" value={selectedName} onChange={e => {setSelectedName(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="col_center_gap_20">
                        <div className="full_grey_button">
                            <input type="submit" value="Подтвердить" onClick={() => registrationInfoEditorActive ? setRegistrationInfoEditorActive(false) : null}/>
                        </div>
                        <div className="red_button">
                            <input type="submit" value="Удалить матч" onClick={() => {setRegistrationInfoEditorActive(false); setDeleteEventActive(true)}}/>
                        </div>
                    </div>
                </div>
            </Login>

            <Login active={deleteEventActive} setActive={setDeleteEventActive}>
              <div className="header_splash_window">
                  <div className="logo_splash_window"></div>
              </div>
              <div className="info_text">
                  <p>Вы уверены, что хотите удалить турнир {valueName}?</p>
              </div>
              <div className="small_buttons_wrapper">
                <div className="small_dark_button">
                    <input type="submit" value="Нет" onClick={() => deleteEventActive ? setDeleteEventActive(!deleteEventActive) : null}/>
                </div>
                <div className="small_grey_button">
                    <input type="submit" value="Да" onClick={() => deleteEventActive ? setDeleteEventActive(!deleteEventActive) : null}/>
                </div>
              </div>
            </Login>

            <Login active={editOngoingActive} setActive={setEditOngoingActive}>
                <div className="header_splash_window">
                  <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                  <p>Укажите информацию о турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside">
                        <div className="row_center_6">
                            <div className="text-field_half">
                                <input className="text-field_half input" style={{color: selectedName === valueName ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedName} placeholder="Укажите название" onChange={e => {setSelectedName(e.target.value)}}/>
                            </div>
                            <div className="text-field_half">
                                <input className="text-field_half input" style={{color: selectedPrize === valuePrize ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedPrize} placeholder="Укажите приз" onChange={e => {setSelectedPrize(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row_center_6">
                            <div className="text-field_half">
                                                    <div className="text-field_half_selector">
                                                        <label for="file-input">
                                                            <div className="text_field_half_select">
                                                                <p className={selectedPath === "Укажите путь до файла" ? "onStart" : "choosed"}>{selectedPath}</p>
                                                                <img src="../img/Add.svg" alt="Add" style={{width: "15px"}}/>
                                                            </div>
                                                        </label>
                                                        <input id="file-input" type="file" style={{all: "unset", width: "0px", height: "0px"}}/>
                                                    </div>
                            </div>
                            <div className="text-field_half">
                                                <div className="text-field_half_selector">
                                                    <label for="file-input">
                                                        <div className="text_field_half_select">
                                                            <p className={selectedPath === "Укажите путь до файла" ? "onStart" : "choosed"}>{selectedPath}</p>
                                                            <img src="../img/Add.svg" alt="Add" style={{width: "15px"}}/>
                                                        </div>
                                                    </label>
                                                    <input id="file-input" type="file" style={{all: "unset", width: "0px", height: "0px"}}/>
                                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col_center_gap_20">
                            <div className="full_grey_button">
                                <input type="submit" value="Подтвердить" onClick={() => editOngoingActive ? setEditOngoingActive(false) : null}/>
                            </div>
                            <div className="red_button">
                                <input type="submit" value="Удалить матч" onClick={() => {setEditOngoingActive(false); setDeleteEventActive(true)}}/>
                            </div>
                    </div>
                </div>
            </Login>
        </div>
    );
}

export default Event;