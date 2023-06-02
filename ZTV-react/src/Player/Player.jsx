import React from "react";
import { useRef, useState, useEffect } from 'react';
import { useParams, Link} from "react-router-dom";
import FlagName from "../components/FlagName/FlagName";
import Trophies from "../components/Trophies/Trophies";
import PlayerTabs from "../components/Tabs/PlayerTabs/PlayerTabs";
import Editor from "../components/Editor/Editor";
import Login from "../Login/Login";
import DateSelector from "../components/MatchHelper/DateSelector";
import { fillSpaces, getListImgText, getImg, applHeaders, getElemByValue, onImageUploaded } from "../components/Helper/Helper";
import { getStoredPlayerNick, request } from "../components/MyAxios/MyAxios";
import "./Player.css"
import "../../src/Team/Team.css"
import '../components/Editor/Editor.css';

function Player(){
    
    const params = useParams(); // параметр из ссылки(ник игрока)

    // проверяем, владелец ли тот, кто зашел на аккаунт
    const [isOwner, seIsOwner] =  useState((getStoredPlayerNick() !== null && getStoredPlayerNick() !== "null" && getStoredPlayerNick() !== "undefined" && getStoredPlayerNick() === params.id));
    
    const [social, setSocial] = useState(null);
    const [trophies, setTrophies] = useState(null);
    const [playerFlagName, setPlayerFlagName] = useState(null);
    const [playerImage, setPlayerImage] = useState(null);
    const [playerTeam, setPlayerTeam] = useState(null);
    
    const [isPlayerAdmin, setIsPlayerAdmin] = useState(false); // true false
    const [isAdmin, setIsAdmin] = useState(false); // true false
    const [nick, setNick] = useState(params.id);

    const [matchesUpcoming, setMatchesUpcoming] = useState(null);
    const [matchesEnded, setMatchesEnded] = useState(null);

    const [leaveTeamActive, setLeaveTeamActive] = useState(true); //состояния модального окна для выхода из команды
    
    const [ongoingEvents, setOngoingEvents] = useState(null);
    const [endedEvents, setEndedEvents] = useState(null);

    const [lanEvents, setLanEvents] = useState(null);
    const [onlineEvents, setOnlineEvents] = useState(null);

    const [rosters, setRosters] = useState(null);
    const [curTeamDays, setCurTeamDays] = useState(null);
    const [allTeamsDays, setAllTeamsDays] = useState(null);

    const getSocial = () => {
        request("GET", "/getSocial/" + params.id, {}, applHeaders).then((resp) =>{
            for (let i = 0; i < 4; ++i){
                const name = resp.data[i]["alt"];
                resp.data[getElemByValue(resp.data, name, "alt")]["src"] = ("../../img/social/" + name + ".svg");
            }
            setSocial(resp.data);
        });
    }

    function getIsPlayerAdmin(){
        request("GET", "/isAdmin/" + params.id, {}, applHeaders).then((resp) =>{
            setIsPlayerAdmin(resp.data);
            if(resp.data){
                setNick(params.id + " (Админ)")
                setValueNick(params.id + " (Админ)");
            }
        });
    }

    function getIsAdmin(){
        if(getStoredPlayerNick() !== null && getStoredPlayerNick() !== "null" && getStoredPlayerNick() !== "undefined"){
            request("GET", "/isAdmin/" + getStoredPlayerNick(), {}, applHeaders).then((resp) =>{
                setIsAdmin(resp.data);
            });
        }
    }

    function getPlayerTeam(){
        request("GET", "/getTeam/" + params.id, {}, applHeaders).then((resp) => {
            if (resp.data[0]["name"] !== ""){
                resp.data.map((item) =>{
                    request("GET", "/getImage/" + item["name"] + "/type", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        let temp = resp.data;
                        temp[getElemByValue(temp, item["name"], "name")]["src"] = URL.createObjectURL(response.data);
                        setPlayerTeam(temp);
                        setLeaveTeamActive(false);
                    });
                });
            } else {
                setPlayerTeam(resp.data);
                setLeaveTeamActive(true);
            }
        });
    }

    const [stats, setStats] = useState(null);

    function getStats(){
        request("GET", "/getStats/" + params.id, {}, applHeaders).then((resp) =>{
            setStats(resp.data);
        });
    }


    function getPlayerMatches(type, setMatches){
        request("GET", "/getPlayerMatches/" + params.id + type, {}, applHeaders).then((resp) =>{
            for (let i = 0; i < resp.data.length; ++i){
                let event = resp.data[i];
                
                for (let j = 0; j < event.matches.length; ++j){
                    let match = event.matches[j];
                    request("GET", "/getImage/" + match["leftTeam"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        match["leftTeamSrc"] = URL.createObjectURL(response.data);
                    });
                    request("GET", "/getImage/" + match["rightTeam"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        match["rightTeamSrc"] = URL.createObjectURL(response.data);
                    });
                    event.matches[j] = match;
                }
                resp.data[i] = event;
                setMatches(resp.data);
            }
        });
    }

    function getPlayerEventsByType(type, setEvents){
        request("GET", "/getPlayerEventsByType/" + params.id + type, {}, applHeaders).then((resp) =>{
            for (let i = 0; i < resp.data.length; ++i){
                let event = resp.data[i];
                request("GET", "/getImage/" + event.name + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                    event["logo"] = URL.createObjectURL(response.data);
                });
                
                if (type !== "/ended"){
                    for (let j = 0; j < event.participants.length; ++j){
                        let part = event.participants[j];
                        request("GET", "/getImage/" + part.name + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                            part["src"] = URL.createObjectURL(response.data);
                        });
                        event.participants[j] = part;
                    }
                }
                resp.data[i] = event;
                setEvents(resp.data);
            }
        });
    }

    function getPlayerAchievements(type, setAchievements){
        request("GET", "/getPlayerAchievements/" + params.id + type, {}, applHeaders).then((resp) =>{
            for (let i = 0; i < resp.data.length; ++i){
                let event = resp.data[i];

                request("GET", "/getImage/" + event.name + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                    event["logo"] = URL.createObjectURL(response.data);
                });
                resp.data[i] = event;
                setAchievements(resp.data);
            }
        });
    }

    function getRosters(){
        request("GET", "/getPlayerRosters/" + params.id, {}, applHeaders).then((resp) =>{
            let sumDays = 0;
            for (let i = 0; i < resp.data.length; ++i){
                let roster = resp.data[i];

                if (roster.period.includes("Настоящее время")){
                    setCurTeamDays(roster.dayDiff);
                }

                request("GET", "/getImage/" + roster.team + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                    roster["teamLogo"] = URL.createObjectURL(response.data);
                });

                for (let j = 0; j < roster.trophies.length; ++j){
                    let trophy = {alt: roster.trophies[j]};

                    request("GET", "/getImage/" + trophy.alt + "/trophy", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        trophy["src"] = URL.createObjectURL(response.data);
                    });

                    roster.trophies[j] = trophy;
                }  
                resp.data[i] = roster;
                sumDays += roster.dayDiff;

                setAllTeamsDays(sumDays);
                setRosters(resp.data);
            }
        });
    }

    useEffect(() => {
        getIsPlayerAdmin();
        getPlayerMatches("/upcoming", setMatchesUpcoming);
        getPlayerMatches("/ended", setMatchesEnded);
        getPlayerAchievements("/lan", setLanEvents);
        getPlayerAchievements("/online", setOnlineEvents);
        getStats();
        getRosters();
        getPlayerEventsByType("/upcoming", setOngoingEvents);
        getPlayerEventsByType("/ended", setEndedEvents);
        getIsAdmin();
        getSocial();
        getListImgText("/getPlayerTrophies/" + params.id, "/trophy", "alt", setTrophies);
        getListImgText("/getNameFlag/" + params.id, "/mini", "country", setPlayerFlagName);
        getImg(setPlayerImage, params.id);
        getPlayerTeam();
    }, []);



    const [nickEditorActive, setNickEditorActive] = useState(false); //состояния модального окна для редактирования ника игрока
    const [socialEditorActive, setSocialEditorActive] = useState(false); //состояния модального окна для редактирования соц сетей
    const [socialUnbindActive, setSocialUnbindActive] = useState(false); //состояния модального окна для отвязки соц сети
    

    const [mouseOutCard, setMouseOutCard] = useState(true); //Для ховера игрока
    const [mouseOnCard, setMouseOnCard] = useState(false); //Для ховера игрока

    const [socialToUnbind, setSocialToUnbind] = useState('');

    const [valueNick, setValueNick] = useState(nick); //Для селектора команды
    const [valueSocial, setValueSocial] = useState("");
    const [addSocial, setAddSocialActive] = useState(false); //состояния модального окна для подключения соц. сетей
    const socialRef = useRef(null);

    const nickRef = useRef(null);

    function onNickChanged(nick){
        request("POST", "/changeNick", {
            oldNick: params.id,
            newNick: nick
        }).then((resp) => {
            
        }).catch((error) => {

        });
    }

    const getIndex = (arr, elem) =>{
        for (let i = 0; i < arr.length; ++i){
            if (arr[i]["alt"] === elem){
                return i;
            }
        }
    }

    const handleSocial = () =>{
        const link = socialRef.current.value;
        if(link !== ""){
            let temp = social;
            const idx = getIndex(temp, valueSocial);
            temp[idx]["link"] = link;
            setSocial(temp);
            
            request("POST", "/changeSocial", {
                player: params.id,
                link: link,
                social: valueSocial
            });
        }
        setAddSocialActive(false);
    }

    const unbindSocial = () =>{
        let temp = social;
        const idx = getIndex(temp, socialToUnbind);
        temp[idx]["link"] = "";
        setSocial(temp);
            
        request("POST", "/changeSocial", {
            player: params.id,
            link: "",
            social: socialToUnbind
        });
    }

    const handleClick = () => {
        let newNick = nickRef.current.value;
        if(newNick !== ""){
            setValueNick(isAdmin ? (newNick + " (Админ)") : newNick);
            onNickChanged(newNick);
        }
        setNickEditorActive(!nickEditorActive);
    };
    

    const handleImageUploaded = (event) =>{
        onImageUploaded(event, "/players/", setPlayerImage, params.id);
    }


    const toggleOnMouseOver = () => {
        return(
            mouseOutCard ? 
                <div>
                    {playerTeam !== null && playerTeam[0]["name"] !== "" ?
                        <div className="player_team_logo"><img src={playerTeam[0]["src"]} alt={playerTeam[0]["name"]}/></div>
                    :
                        <></>
                    }
                    <div className="player">
                        {/* <div className="crop_player"><img src="../../img/players/Tamada.png" alt="Tamada"/></div> */}
                        {playerImage !== null ? 
                            <div className="crop_player"><img src={playerImage} alt={params.id}/></div>
                        :
                            <></>
                        }
                    </div>
                </div>
            : 
                <div className="img_hover_wrapper" onMouseOut={() => {setMouseOutCard(true); setMouseOnCard(false)}}>
                    <label htmlFor="file-input">
                        <img src="../../img/PlayerHovered.svg" alt="Выбор фотографии игрока"/>
                    </label>
                    <input id="file-input" type="file" onChange={handleImageUploaded}/>
                </div>
        );
    }

    const [isDateSetted, setIsDateSetted] = useState(false);


    //----------Всё, что связано с селектором даты рождения--------------
    const [ageEditorActive, setAgeEditorActive] = useState(false); //Состояния модального окна для редактирования возраста
    const [dateSelectorActive, setDateSelectorActive] = useState(false); // Состояния селектора даты (открыт/закрыт календарь)
    const [dateSelected, setDateSelected] = useState('Укажите дату рождения'); // Здесь хранится выбраная дата
    const [valueStartDate, setValueStartDate] = useState('Укажите дату рождения'); // Это для даты выбранного матча
    const [agePlayer, setAgePlayer] = useState('Не указано');
    const toggleDate = () => { // Функция toggle для селектора даты
        setDateSelectorActive(!dateSelectorActive);
    };

    const getDate = (date) =>{
        
        let day = parseInt(date.substring(0, 2));
        let month = parseInt(date.substring(3, 5)) - 1;
        let year = parseInt(date.substring(6, 10));
        
        const parsed = new Date();
        parsed.setFullYear(year);
        parsed.setDate(day);
        parsed.setMonth(month);
    
        return parsed;
        
    }

    function diffDate(date){ // функция для нахождения полных лет игрока
        // var diff = Math.floor(new Date() - getDate(date));
        // var day_hours = 1000 * 60 * 60 * 24;

        // var days = Math.floor(diff/day_hours);
        // var months = Math.floor(days/31);
        // var years = Math.floor(months/12);
        
        var curDate = new Date();
        var bdate = getDate(date);

        if (bdate.getFullYear() === 100){
            return "Не указано";
        }

        var yearsDiff = curDate.getFullYear() - bdate.getFullYear();

        if ((curDate.getDate() - bdate.getDate() < 0) || (curDate.getMonth() - bdate.getMonth() < 0)){
            yearsDiff -= 1;
        }
        
        return yearsDiff;
    }


    function getAge(){
        request("GET", "/getAge/" + params.id, {}, applHeaders).then((resp) => {
            setAgePlayer(diffDate(resp.data) + " лет");
        });
    }

    useEffect(() => {
        getAge();
    }, []);

    


    function onDateSelected(){
        request("POST", "/changeBDate",{
            bdate: dateSelected,
            player: params.id
        }).then((resp) => {
            setAgePlayer(diffDate(dateSelected) + " лет");
        }).catch((error) => {
        });
        setAgeEditorActive(!ageEditorActive);
    }

    
    //-------------------------------------------------------------------

    //----------Всё, что связано с селекторами страны и города-----------

    const [countries, setCountries] = useState(null);

    const [countrySelectorActive, setCountrySelectorActive] = useState(false); //Селектор страны
    const [citySelectorActive, setCitySelectorActive] = useState(false); // Селектор города

    const [citySelected, setCitySelected] = useState('Выберите город'); // Здесь хранится выбранный город
    const [valueCity, setValueCity] = useState('Выберите город'); //Для селектора города

    const [countrySelected, setCountrySelected] = useState('Выберите страну'); // Здесь хранится выбранная страна
    const [valueCountry, setValueCountry] = useState('Выберите страну'); //Для селектора страны

    useEffect(() => {
        getListImgText("/country", "/mini", "countryRU", setCountries);
    }, []);

    const toggleCountry = () => { // Функция toggle для селектора страны
        setCountrySelectorActive(!countrySelectorActive);
    };

    const toggleCity = () => { // Функция toggle для селектора города
        setCitySelectorActive(!citySelectorActive);
    };

    const getElemByCountry = (country) => { // Функция, возвращающая элемент "страны" по её названию
        for(let i = 0; i < countries.length; ++i){
            if(countries[i].countryRU === country){
                return countries[i];
            }
        }
    }

    //-------------------------------------------------------------------

    //----------Всё, что связано с командой-----------

    const teamNameRef = useRef(null);
    const tagRef = useRef(null);
    

    const [leaveTeamWindowActive, setLeaveTeamWindowActive] = useState(false); //состояния модального окна для выхода из команды
    
    const [makeTeamActive, setMakeTeamActive] = useState(false); //состояния модального окна для создания команды

    const onCreateTeam = () =>{
        request("POST", "/createTeam", 
        {
            name: teamNameRef.current.value,
            tag: tagRef.current.value,
            country: countrySelected,
            city: citySelected,
            cap: params.id
        }).then((resp) => {
            let temp = [{}];
            temp[0]["name"] = resp.data.name;
            temp[0]["src"] = "../../img/teams_logo/NoLogo.svg";
            setLeaveTeamActive(false);
            setPlayerTeam(temp);
        }).catch((error) => {
        });
        setMakeTeamActive(!makeTeamActive);
    }

    function onLeftTeam() {
        request("POST", "/leftTeam", 
        {
            nick: params.id,
            team: playerTeam[0]["name"]
        }).then((resp) => {
            setLeaveTeamActive(!leaveTeamActive);
            setPlayerTeam(null);
        });
        setLeaveTeamWindowActive(!leaveTeamWindowActive);
    }

    //--------------------------------------------------------------------
    
    return(
    <div>
        <div className="user_back">
            <div className="player_card_wrapper" onMouseOut={() => {setMouseOutCard(true); setMouseOnCard(false)}} onMouseOver={() => {setMouseOutCard(false); setMouseOnCard(true)}}>
                {isAdmin ? toggleOnMouseOver() : 
                    <div>
                        {playerTeam !== null && playerTeam[0]["name"] !== "" ?
                            <div className="player_team_logo"><img src={playerTeam[0]["src"]} alt={playerTeam[0]["name"]}/></div>
                        :
                            <></>
                        }
                        <div className="player">
                            {playerImage !== null ? 
                                <div className="crop_player"><img src={playerImage} alt={params.id}/></div>
                            :
                                <></>
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="player_info">
                <div className="player_nick">
                    <p>{valueNick}</p>
                    {/* {isAdmin ? <Editor size="18px" depth={2} onClick={() => setNickEditorActive(true)}/>
                    : <></>} */}
                </div>
                {playerFlagName !== null ? 
                    <FlagName flagPath={playerFlagName[0].src} country={playerFlagName[0].country} name={playerFlagName[0].name} height='12px'/>
                :
                    <></>
                }
                <div className="devider_info">
                    <div className="devider_info_line">
                        <div className="row_center_5px">
                            <span>Возраст</span>
                            {(isOwner || isAdmin) && !isDateSetted ? <Editor size="12px" depth={2} onClick={() => setAgeEditorActive(true)}/>
                            : <></>}
                        </div>
                        <p>{agePlayer}</p>
                    </div>
                    <div className="devider_subline"></div>
                </div>
                <div className="devider_info">
                    <div className="devider_info_line">
                        <div className="row_center_5px">
                            <span>Текущая команда</span>
                            {isOwner && !leaveTeamActive ?  
                            <div className="editor" style={{width: "16px", height: "16px"}} onClick={() => setLeaveTeamWindowActive(true)}>
                                <img src="../../img/Cross.svg" alt="Editor"/>
                            </div>
                            : isOwner ? 
                            <div className="editor" style={{width: "17px", height: "17px"}} onClick={() => {setMakeTeamActive(true)}}>
                                <img src="../../img/Add.svg" alt="Editor"/>
                            </div> 
                            :
                            <></>
                            }

                        </div>
                        
                        {leaveTeamActive ? <p>Отсутствует</p> :
                        <Link to={"/team/" + fillSpaces(playerTeam[0]["name"])} style={{textDecoration: "none"}}>
                            <div className="devider_team">
                                <div className="devider_team_logo"><img src={playerTeam[0]["src"]} alt={playerTeam[0]["name"]}/></div>
                                <p>{playerTeam[0]["name"]}</p>
                            </div>
                        </Link>
                        }
                    </div>
                    <div className="devider_subline"></div>
                </div>
                <div className="devider_info">
                    <div className="devider_info_line">
                        <div className="row_center_5px">
                            <span>Социальные сети</span>
                            {/* ТУТ НАДО БУДЕТ ПОМЕНЯТЬ УСЛОВИЕ НА OnClick. Если игрок - на карандаш срабатывает его окно, если админ - его
                            Также условие на то, игрок или админ смотрит страницу!!!!!!*/}
                            {isAdmin || isOwner ? <Editor size="12px" depth={2} onClick={() => setSocialEditorActive(true)}/>
                            : <></>}
                            
                        </div>
                        <div className="social_media">
                            {social !== null ?
                                social.map((item) => 
                                item.link !== "" ? <a href={item.link} target="_blank" rel="noopener noreferrer"><img className={item.color === "white" ? 'active_elem' : 'active_colored'} src={item.src} alt={item.alt}/></a> : 
                                <img className={item.color === "white" ? 'inactive_elem' : 'inactive_colored'} src={item.src} alt={item.alt}/>
                                )
                            :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* div, разделяющий плашку игрока и трофеи */}
        <div className="devider_line"></div>

        {/* Трофеи */}
        {trophies !== null ?
            <Trophies items={trophies}/>
        :
          <></>  
        }

        {/* Табы игрока (Статистика, матчи, турниры ... ) */}
        <PlayerTabs 
        stat={stats} 
        rosters={rosters}
        matches_upcoming={matchesUpcoming}
        matches_ended={matchesEnded}
        ongoing_events={ongoingEvents}
        ended_events={endedEvents}
        lan_events={lanEvents}
        online_events={onlineEvents}
        nick={params.id}
        curTeamDays={curTeamDays}
        allTeamsDays={allTeamsDays}
        />

        {/* Модальное окно "Редактирование ника" */}
        <Login active={nickEditorActive} setActive={setNickEditorActive}>
            <div className="header_splash_window">
                 <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                <p>Укажите ник игрока</p>
            </div>
            <div className="col_center_gap30">
                <div className="text-field">
                    <input className="text-field_input" type="text" name="nick" placeholder="Введите ник игрока" ref={nickRef}/>
                </div>
                <div className="full_grey_button">
                    <input type="submit" value="Сохранить" onClick={handleClick}/>
                </div>
            </div>
        </Login>

        {/* Модальное окно "Редактирование социальных сетей" */}
        <Login active={socialEditorActive} setActive={setSocialEditorActive}>
            <div className="header_splash_window">
                 <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                <p>Управление социальными сетями</p>
            </div>
            {social !== null ?
                social.map((item) => 
                    <div>
                        <div className="social_row">
                            <div className="logo_social_wrap">
                                <div className={item.color === "white" ? "social_logo" : "social_logo colored_to_white"}><img src={item.src} alt={item.alt} /></div>
                                <div className="social_wrapper">
                                    <span>{item.alt}</span>
                                    {item.link === "" ? <p>Не указано</p> :
                                        <p>Установлено</p>
                                    }
                                </div>
                            </div>
                            {isAdmin && item.link !== "" ? 
                            <span className="unbind" onClick={() => {setSocialUnbindActive(true); setSocialEditorActive(false); setSocialToUnbind(item.alt)}}>Отвязать</span> 
                            : null    
                            }
                            {isOwner && item.link === "" ? <span className="unbind" onClick={() => {setAddSocialActive(true); setSocialEditorActive(false); setValueSocial(item.alt)}}>Подключить</span> :
                                null
                            }
                            {isOwner && item.link !== "" && (item.alt == "VK" || item.alt == "Discord") ? <span className="unbind" onClick={() => {setAddSocialActive(true); setSocialEditorActive(false); setValueSocial(item.alt)}}>Редактировать</span> :
                                null
                            }
                        </div>
                        
                        <div className="social_devider"></div>
                    </div>
                )
            :
                <></>
            }
            <div className="full_grey_button" >
                <input type="submit" value="Сохранить" onClick={() => socialEditorActive ? setSocialEditorActive(!socialEditorActive) : null} />
            </div>
        </Login>

        {/* Модальное окно "Привязка соц.сети" */}
        <Login active={addSocial} setActive={setAddSocialActive}>
            <div className="header_splash_window">
                 <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                <p>Укажите ссылку на {valueSocial}</p>
            </div>
            <div className="col_center_gap30">
                <div className="text-field">
                    <input className="text-field_input" type="text" name="nick" placeholder="Введите ссылку" ref={socialRef}/>
                </div>
                <div className="full_grey_button">
                    <input type="submit" value="Сохранить" onClick={handleSocial}/>
                </div>
            </div>
        </Login>

        {/* Модальное окно "Вы уверены, что хотите отвзяать соц. сеть?" */}
        <Login active={socialUnbindActive} setActive={setSocialUnbindActive}>
            <div className="header_splash_window">
                 <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                <p>Вы уверены, что хотите отвязать {socialToUnbind} игрока {params.id}?</p>
            </div>
            <div className="small_buttons_wrapper">
                <div className="small_dark_button">
                    <input type="submit" value="Нет" onClick={() => socialUnbindActive ? setSocialUnbindActive(!socialUnbindActive) : null}/>
                </div>
                <div className="small_grey_button">
                    <input type="submit" value="Да" onClick={() => {setSocialUnbindActive(false); unbindSocial()}}/>
                </div>
            </div>
        </Login>

        {/* Модальное окно "Редактирование возраста" */}
        <Login active={ageEditorActive} setActive={setAgeEditorActive}>
            <div className="header_splash_window">
                 <div className="logo_splash_window"></div>
            </div>
            
            <div className="info_text">
                <p>Укажите дату рождения</p>
            </div>
            <div className="col_center_gap30">
                <div className="inside scroll" style={{height: dateSelectorActive ? "400px": null, overflow: !dateSelectorActive ? "hidden" : null}}>
                    <DateSelector toggleDate={toggleDate} dateSelected={dateSelected} valueDate={valueStartDate} dateSelectorActive={dateSelectorActive} setDate={setDateSelected} minDate={getDate("05.01.1990")} maxDate={new Date()}/>
                </div>
                <div className="full_grey_button" >
                    <input type="submit" value="Подвердить" onClick={() => ageEditorActive ? onDateSelected(): null} />
                </div>
            </div>
        </Login>

        {/* Модальное окно "Вы уверены, что хотите покинуть команду?" */}
        <Login active={leaveTeamWindowActive} setActive={setLeaveTeamWindowActive}>
            <div className="header_splash_window">
                 <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                {playerTeam !== null ? 
                    <p>Вы уверены, что хотите покинуть команду {playerTeam[0]["name"]}?</p>
                :
                    <></>
                }
            </div>
            <div className="small_buttons_wrapper">
                <div className="small_dark_button">
                    <input type="submit" value="Нет" onClick={() => leaveTeamWindowActive ? setLeaveTeamWindowActive(!leaveTeamWindowActive) : null}/>
                </div>
                <div className="small_grey_button">
                    <input type="submit" value="Да" onClick={() => leaveTeamWindowActive ? onLeftTeam() : null}/>
                </div>
            </div>
        </Login>

        {/* Модально окно "Создание команды" */}
        <Login active={makeTeamActive} setActive={setMakeTeamActive}>
            <div className="header_splash_window">
                <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                <p>Укажите информацию о команде</p>
            </div> 
            <div className="col_center_gap30">
                 
                <div className="col_center_gap10">
                    <div className="text-field">
                        <input className="text-field_input" style={{width: "430px"}} type="text" name="teamName" id="teamName" placeholder="Название. Максимум 15 символов" ref={teamNameRef}/>
                    </div>
                    <div className="text-field">
                        <input className="text-field_input" style={{width: "430px"}} type="text" name="tag" id="tag" placeholder="Тег. Максимум 8 символов" ref={tagRef}/>
                    </div>
                    <div className="row_center_6">
                        <div className="text-field_half">
                            <div className="text-field_half_selector">
                                <div className="text_field_half_select" onClick={() => toggleCountry()}>
                                    <p className={countrySelected === valueCountry ? "onStart" : "choosed"}>{countrySelected}</p>
                                        <img src="../../img/arrow.svg" id="arrowIcon" className={countrySelectorActive ? 'rotate' : null} alt="arrow"/>
                                </div>
                                <ul className={ countrySelectorActive ? 'select_list' : 'select_list hide'}>
                                    {countries !== null ? 
                                        countries.map((country) =>
                                            <li className='text_field_half_options' onClick={() => {setCountrySelected(country.countryRU); setCitySelected(valueCity); toggleCountry()}}>
                                                <img src={"../../img/flags/mini/" + country.countryENG +".svg"} alt={country.countryRU}/>
                                                <p>{country.countryRU}</p>
                                            </li>
                                        )
                                    :
                                        <></>
                                    }
                                </ul>
                            </div>
                        </div>
                        {countrySelected !== "Выберите страну" ?
                            <div className="text-field_half">
                                <div className="text-field_half_selector">
                                    <div className="text_field_half_select" onClick={() => toggleCity()}>
                                        <p className={citySelected === valueCity ? "onStart" : "choosed"}>{citySelected}</p>
                                        <img src="../../img/arrow.svg" id="arrowIcon" className={citySelectorActive ? 'rotate' : null} alt="arrow"/>
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
                </div>
                <div className="small_buttons_wrapper">
                    <div className="small_dark_button" style={{width: "122px", height: "48px"}} >
                        <input type="submit" value="Отмена" style={{width: "122px", height: "48px"}} onClick={() => makeTeamActive ? setMakeTeamActive(!makeTeamActive) : null}/>
                    </div>
                    <div className="small_grey_button"  style={{width: "122px", height: "48px"}}>
                        <input type="submit" value="Создать" style={{width: "122px", height: "48px"}} onClick={() => {setMakeTeamActive(!makeTeamActive); onCreateTeam()}}/>
                    </div>
                </div>
            </div>
        </Login>

    </div>
    );
}

export default Player;