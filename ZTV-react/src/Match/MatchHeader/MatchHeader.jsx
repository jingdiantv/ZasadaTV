import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Editor from "../../components/Editor/Editor";
import SetMatchInfo from "../../components/MatchHelper/SetMatchInfo";
import Login from "../../Login/Login";
import { fillSpaces } from "../../components/Helper/Helper";
import "./MatchHeader.css"

function MatchHeader(props){
    const isAdmin = props.isAdmin;

    
    const [counter, setCounter] = React.useState((props.MatchDate.getTime() - new Date()) / 1000);
    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);

    function monthWord(monthNum){
        switch(monthNum){
            case 0: return "января"; break;
            case 1: return "февраля"; break;
            case 2: return "марта"; break;
            case 3: return "апреля"; break;
            case 4: return "мая"; break;
            case 5: return "июня"; break;
            case 6: return "июля"; break;
            case 7: return "августа"; break;
            case 8: return "сентября"; break;
            case 9: return "октября"; break;
            case 10: return "ноября"; break;
            case 11: return "декабря"; break;

        }
            
    }
   
    const getMatchDate = () =>{
        const date = props.MatchDate;
        
        let day = date.getDate();
        day = day < 10 ? ("0" + day) : day;

        let month = date.getMonth() + 1;
        month = month < 10 ? ("0" + month) : month;

        return day + "." + month + "." + date.getFullYear();
    }

    const getMatchTime = () =>{
        const date = props.MatchDate;

        let hours = date.getHours();
        hours = hours < 10 ? ("0" + hours) : hours;

        let minutes = date.getMinutes();
        minutes = minutes < 10 ? ("0" + minutes) : minutes;

        return hours + ":" + minutes;
    }

    const [teamsActive, setTeamsActive] = useState(props.teamsActive); // состояния команд - выбрана ли команда(чтоб блокировать ее)
    const [matchEditorActive, setMatchEditorActive] = useState(false); //состояния модального окна для редактирования текущих матчей
    const [deleteMatchActive, setDeleteMatchActive] = useState(false);

    const [valueDate, setValueDate] = useState(getMatchDate()); // Это для даты выбранного матча
    const [dateSelected, setDateSelected] = useState(valueDate); // здесь хранится выбраная дата
    const [dateSelectorActive, setDateSelectorActive] = useState(false); // открыт/закрыт календарь

    const [valueTime, setValueTime] = useState(getMatchTime()); // Это для времени выбранного матча
    const [timeSelected, setTimeSelected] = useState(valueTime); // здесь хранится выбраное время
    const [timeSelectorActive, setTimeSelectorActive] = useState(false); // открыт/закрыт выбор времени

    const [valueEvent, setValueEvent] = useState(props.event); // Это для турнира выбранного матча
    const [eventSelected, setEventSelected] = useState(valueEvent); // здесь хранится выбраный турнир
    const [eventSelectorActive, setEventSelectorActive] = useState(false); // открыт/закрыт выбор турнира

    const [selectedLeftTeam, setSelectedLeftTeam] = useState(props.NameFirst); // левая команда
    const [selectedRightTeam, setSelectedRightTeam] = useState(props.NameSecond); // правая команда    
    const [valueLeftTeam, setValueLeftTeam] = useState(selectedLeftTeam); // левая команда
    const [valueRightTeam, setValueRightTeam] = useState(selectedRightTeam); // правая команда
    const [leftTeamSelectorActive, setLeftTeamSelectorActive] = useState(false); // открыт/закрыт выбор левой команды
    const [rightTeamSelectorActive, setRightTeamSelectorActive] = useState(false); // открыт/закрыт выбор правой команды
    
    const [valueTeam, setValueTeam] = useState(selectedLeftTeam + " vs. " + selectedRightTeam); // Выбрать матч надо

    const allEvents = [
        {event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", series: "Zasada"}, 
        {event: "Zasada Super Duper Ultra mega Cup", eventSrc: "img/event_logo/Zasada2.svg", series: "Zasada"}, 
        {event: "BLAST Summer Cup by Tamada", eventSrc: "img/event_logo/BLAST.svg", series: "BLAST"}
    ]
  
    
    const toggleDate = () => { 
        setDateSelectorActive(!dateSelectorActive)
    };

    const toggleTime = () => {
        setTimeSelectorActive(!timeSelectorActive);
    }

    const toggleEvent = () => {
        setEventSelectorActive(!eventSelectorActive);
    }

    const toggleLeftTeam = () => {
        setLeftTeamSelectorActive(!leftTeamSelectorActive);
    }
  
    const toggleRightTeam = () => {
        setRightTeamSelectorActive(!rightTeamSelectorActive);
    }

    const indexOf = (value) =>{
        for(let i = 0; i < props.teams.length; ++i){
          if(value === props.teams[i].name){
            return i;
          }
        }
    }
  
    const setTeam = (id, value) =>{ // с её помощью делаем нужную команду заблокированной 
        let temp = [...teamsActive];
        let val = indexOf(value);

    
        if(val === id){
            temp[id] = true;
        }
        else{
            temp[val] = !temp[val];
            temp[id] = !temp[id];
        }
        setTeamsActive(temp);
    }
    
    const blockTeamOnStart = (selectedLeftTeam, selectedRightTeam) =>{
        const leftIdx = indexOf(selectedLeftTeam);
        const rightIdx = indexOf(selectedRightTeam);

        setTeam(leftIdx, selectedLeftTeam);
        setTeam(rightIdx, selectedRightTeam);
    }


    return(
        <div>
        <div className="header_match">
            
            <div className="container_time_match">
                <div className="container_time_match_time">
                    <a>
                        {getMatchTime()}
                    </a>
                </div>
                <div className="container_time_match_date">
                    <a>{props.MatchDate.getDate()} {monthWord(props.MatchDate.getMonth())} {props.MatchDate.getFullYear()}</a>
                </div>
                <div className="container_time_match_cup">
                    <Link to={"/event/" + fillSpaces(props.event)}>{props.event}</Link>
                </div>
                <div className="container_time_match_live">
                    <div className="row_center_5px">
                        {props.MatchStatus == 0 ? <a>{counter < 3600 ? 0 : parseInt(counter/3600)} час. {counter < 60 ? 0 : parseInt(counter/60%60)} мин. {parseInt(counter%60)} сек.</a> : null}
                        {props.MatchStatus == 1 ? <a>LIVE</a> : null}
                        {props.MatchStatus == 2 ? <a>Матч окончен</a> : null}
                        {isAdmin ? <Editor size="15px" depth={2} onClick={() => setMatchEditorActive(true)}/> : <></>}
                    </div>
                    
                </div>
            </div>
            <div className="flag_team" style={{background: "linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(25, 25, 25, 1)), url(\"../../img/flags/dragon.svg\")", left: "0"}}>
                <img src={props.LogoFirst} className="match_logo_team" />
                <div className="name_score_wrapper">
                    <p>{props.NameFirst}</p>  
                    {(props.MatchStatus == 1) || (props.MatchStatus == 2) ? <a id="points" style={props.ScoreSecond < props.ScoreFirst ?{color: "green"}:{color: "red"}}>{props.ScoreFirst}</a> : null}
                </div>
            </div>
            <div className="flag_team" style={{background: "linear-gradient(to left, rgba(0, 0, 0, 0.4), rgba(25, 25, 25, 1)), url(\"../../img/flags/RU.svg\")", right: "0"}}>
                <img src={props.LogoSecond} className="match_logo_team" />
                <div className="name_score_wrapper">
                    <p>{props.NameSecond}</p>
                    {(props.MatchStatus == 1) || (props.MatchStatus == 2) ? <a id="points" style={props.ScoreSecond < props.ScoreFirst ?{color: "red"}:{color: "green"}}>{props.ScoreSecond}</a> : null}
                </div>
            </div>
        
        </div>
        <Login active={matchEditorActive} setActive={setMatchEditorActive}>
            <SetMatchInfo
            matchId={props.matchId}
            toggleDate={toggleDate} 
            dateSelected={dateSelected} 
            valueDate={valueDate} 
            dateSelectorActive={dateSelectorActive} 
            setDateSelected={setDateSelected}
            timeSelected={timeSelected}
            valueTime={valueTime}
            timeSelectorActive={timeSelectorActive} 
            setTimeSelected={setTimeSelected} 
            toggleTime={toggleTime}
            eventSelected={eventSelected} 
            valueEvent={valueEvent}
            eventSelectorActive={eventSelectorActive}
            setEventSelected={setEventSelected} 
            toggleEvent={toggleEvent}
            selectedLeftTeam={selectedLeftTeam} 
            valueLeftTeam={valueLeftTeam} 
            leftTeamSelectorActive={leftTeamSelectorActive}
            toggleLeftTeam={toggleLeftTeam} 
            setSelectedLeftTeam={setSelectedLeftTeam} 
            setTeam={setTeam}
            selectedRightTeam={selectedRightTeam} 
            valueRightTeam={valueRightTeam} 
            rightTeamSelectorActive={rightTeamSelectorActive} 
            toggleRightTeam={toggleRightTeam} 
            setSelectedRightTeam={setSelectedRightTeam}
            setMatchEditorActive={setMatchEditorActive}
            setDeleteMatchActive={setDeleteMatchActive} 
            teamsActive={teamsActive} 
            indexOf={indexOf}
            teams={props.teams}
            allEvents={allEvents}
            />
        </Login>

        <Login active={deleteMatchActive} setActive={setDeleteMatchActive}>
              <div className="header_splash_window">
                  <div className="logo_splash_window"></div>
              </div>
              <div className="info_text">
                  <p>Вы уверены, что хотите удалить матч {valueTeam}?</p>
              </div>
              <div className="small_buttons_wrapper">
                <div className="small_dark_button">
                    <input type="submit" value="Нет" onClick={() => deleteMatchActive ? setDeleteMatchActive(!deleteMatchActive) : null}/>
                </div>
                <div className="small_grey_button">
                    <input type="submit" value="Да" onClick={() => deleteMatchActive ? setDeleteMatchActive(!deleteMatchActive) : null}/>
                </div>
              </div>
            </Login>
      </div>
    )
}

export default MatchHeader;