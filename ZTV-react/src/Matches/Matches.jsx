import React from "react";
import { useState } from 'react';
import CurrentMatchMaker from "../components/MatchMacker/CurrentMatchMaker";
import OngoingMatchMaker from "../components/MatchMacker/OngoingMatchMaker";
import Editor from "../components/Editor/Editor";
import Login from "../Login/Login";
import DatePicker from "../components/DatePicker/DatePicker";
import DateSelector from "../components/MatchHelper/DateSelector";
import SetMatchInfo from "../components/MatchHelper/SetMatchInfo";
import TimePicker from "../components/TimePicker/TimePicker";
import "./Matches.css";

function Matches() {

    const isAdmin = true;

    const [ongoingEditorActive, setOngoingEditorActive] = useState(false); //состояния модального окна для редактирования текущих матчей
    const [comingEditorActive, setComingEditorActive] = useState(false); //состояния модального окна для редактирования будущих матчей

    const [matchEditorActive, setMatchEditorActive] = useState(false); //состояния модального окна для редактирования текущих матчей
    const [ongoingMatchEditorActive, setOngoingMatchEditorActive] = useState(false); //состояния модального окна для редактирования текущих матчей
    
    const [chooseComingMatchActive, setChooseComingMatchActive] = useState(false); //выбираем будущий матч

    const [matchSelectorActive, setMatchSelectorActive] = useState(false);
    const [dateSelectedOngoing, setDateSelectedOngoing] = useState('');

    const [valueTeam, setValueTeam] = useState('Выберите матч'); // Выбрать матч надо
   
    const [valueDate, setValueDate] = useState(''); // Это для даты выбранного матча
    const [dateSelected, setDateSelected] = useState(''); // здесь хранится выбраная дата
    const [dateSelectorActive, setDateSelectorActive] = useState(false); // открыт/закрыт календарь

    const [valueTime, setValueTime] = useState(''); // Это для времени выбранного матча
    const [timeSelected, setTimeSelected] = useState(''); // здесь хранится выбраное время
    const [timeSelectorActive, setTimeSelectorActive] = useState(false); // открыт/закрыт выбор времени

    const [valueEvent, setValueEvent] = useState(''); // Это для турнира выбранного матча
    const [eventSelected, setEventSelected] = useState(''); // здесь хранится выбраный турнир
    const [eventSelectorActive, setEventSelectorActive] = useState(false); // открыт/закрыт выбор турнира

    const [selectedLeftTeam, setSelectedLeftTeam] = useState(''); // левая команда
    const [selectedRightTeam, setSelectedRightTeam] = useState(''); // правая команда    
    const [valueLeftTeam, setValueLeftTeam] = useState(''); // левая команда
    const [valueRightTeam, setValueRightTeam] = useState(''); // правая команда
    const [leftTeamSelectorActive, setLeftTeamSelectorActive] = useState(false); // открыт/закрыт выбор левой команды
    const [rightTeamSelectorActive, setRightTeamSelectorActive] = useState(false); // открыт/закрыт выбор правой команды
    const [teamsActive, setTeamsActive] = useState([false, false, false, false, false]); // состояния команд - выбрана ли команда(чтоб блокировать ее)

    const [deleteMatchActive, setDeleteMatchActive] = useState(false);

    const [createMatchActive, setCreateMatchActive] = useState(false);

    const [selectedFormat, setSelectedFormat] = useState('Выберите формат'); // формат (bo1 и тп)
    const [formatSelectorActive, setFormatSelectorActive] = useState(false);

    const [selectedType, setSelectedType] = useState('Выберите тип'); // тип (Лан/Онлайн)
    const [typeSelectorActive, setTypeSelectorActive] = useState(false);

    const [selectedTier, setSelectedTier] = useState('Выберите важность'); // важность
    const [tierSelectorActive, setTierSelectorActive] = useState(false);

    const current_matches = [
        {date: "02.05.2023", time: "12:00", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "00000000", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "00000000", rightTeamSrc: "img/teams_logo/Walhalla.png", leftUpperScore: 9, rightUpperScore: 16, leftSubScore: 0, rightSubScore: 0, tier: 3, tierSrc: "img/Top_star.svg", map: "anb"},
        {date: "03.05.2023", time: "13:10", series: "BLAST", event: "BLAST Summer Cup", eventSrc: "img/event_logo/BLAST.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftUpperScore: 16, rightUpperScore: 1, leftSubScore: 0, rightSubScore: 0, tier: 4, tierSrc: "img/Top_star.svg", map: "anb"},
        {date: "03.05.2023", time: "14:05", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "G2", rightTeamSrc: "img/teams_logo/NoLogo.svg", leftUpperScore: 15, rightUpperScore: 15, leftSubScore: 1, rightSubScore: 0, tier: 0, tierSrc: "img/Top_star.svg", map: "bo3"},
        {date: "03.05.2023", time: "15:03", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftUpperScore: 0, rightUpperScore: 0, leftSubScore: 2, rightSubScore: 2, tier: 5, tierSrc: "img/Top_star.svg", map: "bo5"},
    ]

    const ongoing_matches = [
        {date: "15.05.2023", matches: [
            {date: "15.05.2023", time: "12:00", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", tier: 3, tierSrc: "img/Top_star.svg", map: "anb"},
            {date: "15.05.2023", time: "12:45", series: "BLAST", event: "BLAST Summer Cup by Tamada", eventSrc: "img/event_logo/BLAST.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", tier: 5, tierSrc: "img/Top_star.svg", map: "bo2"},
            {date: "15.05.2023", time: "13:45", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", tier: 3, tierSrc: "img/Top_star.svg", map: "nuke"},
        ]},
        {date: "16.05.2023", matches: [
            {date: "16.05.2023", time: "09:45", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", tier: 3, tierSrc: "img/Top_star.svg", map: "anb"},
            {date: "16.05.2023", time: "22:45", series: "BLAST", event: "BLAST Summer Cup by Tamada", eventSrc: "img/event_logo/BLAST.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", tier: 5, tierSrc: "img/Top_star.svg", map: "bo2"},
            {date: "16.05.2023", time: "23:00", series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", tier: 3, tierSrc: "img/Top_star.svg", map: "nuke"},
        ]},
    ]

    const allEvents = [
      {event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", series: "Zasada"}, 
      {event: "BLAST Summer Cup by Tamada", eventSrc: "img/event_logo/BLAST.svg", series: "BLAST"}
    ]

    const teams = [
      {name: "ПУПА", logo: "img/teams_logo/pupa.svg"}, 
      {name: "Walhalla", logo: "img/teams_logo/Walhalla.png"}, 
      {name: "G2", logo: "img/teams_logo/NoLogo.svg"}, 
      {name: "AbuDabi", logo: "img/teams_logo/AbuDabi.svg"}, 
      {name: "Amfier", logo: "img/teams_logo/Amfier.png"}
      ];

    const toggleClass = () => { 
      setMatchSelectorActive(!matchSelectorActive)
    };

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
    
    const toggleFormat = () => {
      setFormatSelectorActive(!formatSelectorActive);
    }

    const toggleType = () => {
      setTypeSelectorActive(!typeSelectorActive);
    }

    const toggleTier = () => {
      setTierSelectorActive(!tierSelectorActive);
    }

    const setTeam = (id, value) =>{ // с её помощью делаем нужную команду заблокированной 
      let temp = [...teamsActive];
      let val = indexOf(value);
  
      temp[val] = !temp[val];
      temp[id] = !temp[id];
      setTeamsActive(temp);
    }

    const indexOf = (value) =>{
      for(let i = 0; i < teams.length; ++i){
        if(value === teams[i].name){
          return i;
        }
      }
    }

    const genMinDate = () =>{
      const date = new Date();
      let day = date.getDate();
      day = day < 10 ? ("0" + day) : day;

      let month = date.getMonth() + 1;
      month = month < 10 ? ("0" + month) : month;

      return (day + "." + month + "." + date.getFullYear());
    }

    const getMinTime = () =>{
      return "00:00";
    }

    const setLeftTeam = (team) =>{
      const idx = indexOf(team);
      teamsActive[idx] = !teamsActive[idx];

      setValueLeftTeam(team); 
      setSelectedLeftTeam(team);
    }

    const setRightTeam = (team) =>{
      const idx = indexOf(team);
      teamsActive[idx] = !teamsActive[idx];

      setValueRightTeam(team); 
      setSelectedRightTeam(team);
    }

    const getMatchesByEvent = (ev) =>{
      let matchesArr = [];
      for(let i = 0; i < ongoing_matches.length; ++i){
        const elem = ongoing_matches[i];
        for(let j = 0; j < elem.matches.length; ++j){
          const match = elem.matches[j];
          if(match.event === ev){
            matchesArr.push(match);
          }
        }
      }
      return matchesArr;
    }

    const tierListGenerator = () => {
      let content = [];
      for(let i = 0; i < 5; ++i){
        const value = (i + 1) === 1 ? "1 звезда" : (i + 1) < 5 ? ((i + 1) + " звезды") : "5 звёзд";
        content.push(
          <li className="text_field_half_options" style={{height: "49px"}} onClick={()=>{setSelectedTier(value); toggleTier()}}>
            {tierGenerator(i + 1, "img/Top_star.svg")}
          </li>
        )
      }
      return content;
    }

    const tierGenerator = (tier, tierSrc) =>{
      let tierArray = [];
      for(let i = 0; i < 5; ++i){
          if (i < tier){
            tierArray.push(
                  <img src={tierSrc} alt="star"/>
              );
          }
          else{
            tierArray.push(
                  <img src={tierSrc} style={{opacity: 0.3}} alt="faded_star"/>
              );
          }
      }
      return tierArray;
    }

    return(
        <div>
            <div className="matches_header">
                <div className="row_center_5px">
                    <p>Текущие матчи</p>
                    {isAdmin ? <Editor size="12px" depth={1} onClick={() => setOngoingEditorActive(true)}/> : <></>}
                </div>
            </div>
            <div className="matches">
                <div className="col_center_gap10">
                    {current_matches.map((match) =>
                        <CurrentMatchMaker {...match}/>
                    )}
                </div>
            </div>

            <div className="matches_header">
              <div className="row_center_5px">
                <p>Ближайшие матчи</p>
                {isAdmin ? <Editor size="12px" depth={1} onClick={() => setComingEditorActive(true)}/> : <></>}
              </div>
            </div>
            <div className="matches">
                {ongoing_matches.map((day) =>
                    <OngoingMatchMaker {...day}/>
                )}
            </div>

            <Login active={ongoingEditorActive} setActive={setOngoingEditorActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о матче</p>
                </div>
                <div className="inside">
                <div className="col_center_gap30">
                    <div className="match_selector" style={{zIndex: 1}}>
                      <div className="match_select" onClick={() => toggleClass()}>
                        <p className={valueTeam === "Выберите матч" ? "onStart" : "choosed"}>{valueTeam}</p>
                        <img src="../img/arrow.svg" className={matchSelectorActive ? 'rotate' : null} alt="arrow"/>
                      </div>
                      <ul className={ matchSelectorActive ? 'match_select_list' : 'match_select_list hide'}>
                        {current_matches.map((match) =>
                          <li className="select_match_options" onClick={()=>{setValueTeam(match.leftTeam + " vs. " + match.rightTeam); setValueDate(match.date); setDateSelected(match.date); setTimeSelected(match.time); setValueTime(match.time); setEventSelected(match.event); setValueEvent(match.event); setLeftTeam(match.leftTeam); setRightTeam(match.rightTeam); toggleClass()}}>
                            <div className="match_list_team_wrapper">
                              <div className="left_team_tag"><p>{match.leftTeam}</p></div>
                              <div className="list_logo">
                                <img src={match.leftTeamSrc} alt={match.leftTeam}/>
                              </div>
                            </div>
                            <p> vs. </p>
                            <div className="match_list_team_wrapper">
                              <div className="list_logo">
                                <img src={match.rightTeamSrc} alt={match.rightTeam}/>
                              </div>
                              <div className="right_team_tag"><p>{match.rightTeam}</p></div>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="full_grey_button">
                      <input type="submit" value="Подтвердить" onClick={() => {setMatchEditorActive(true); setOngoingEditorActive(false)}}/>
                    </div>
                  </div>
                </div>
            </Login>

            <Login active={matchEditorActive} setActive={setMatchEditorActive}>
              <SetMatchInfo
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
              teams={teams}
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

            <Login active={comingEditorActive} setActive={setComingEditorActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Что Вы хотите сделать?</p>
                </div>
                <div className="buttons_wrapper">
                  <div className="dark_button">
                    <input type="submit" value="Изменить матч" onClick={() => {setComingEditorActive(false); setChooseComingMatchActive(true); setDateSelected("Выберите дату"); setEventSelected("Выберите турнир")}}/>
                  </div>
                  <div className="full_grey_button" style={{margin: 0}}>
                    <input type="submit" value="Создать матч" onClick={() => {setComingEditorActive(false); setCreateMatchActive(true); setDateSelected("Выберите дату"); setEventSelected("Выберите турнир"); setTimeSelected("Выберите время"); setSelectedLeftTeam("Выберите левую команду"); setSelectedRightTeam("Выберите правую команду")}}/>
                  </div>
                </div>
            </Login>

            <Login active={chooseComingMatchActive} setActive={setChooseComingMatchActive}>
              <div className="header_splash_window">
                  <div className="logo_splash_window"></div>
              </div>
              <div className="info_text">
                  <p>Укажите информацию о матче</p>
              </div>
              <div className="col_center_gap10">
                <div className="text-field_selector">
                  <div className="text_field_select" onClick={() => toggleDate()}>
                    <p className={dateSelected === "Выберите дату" ? "onStart" : "choosed"}>{dateSelected}</p>
                    <img src="../img/arrow.svg" className={dateSelectorActive ? 'rotate' : null} alt="arrow"/>
                  </div>
                  <ul className={ dateSelectorActive ? 'select_date' : 'select_date hide'}>
                    <li className="date_options" key="datePicker">
                      <DatePicker setDate={setDateSelected} minDate={genMinDate()}/>
                    </li>
                  </ul>
                </div>
                {dateSelected !== "Выберите дату" ?
                  // ТУТ ПОКА ВСЕ ТУРНИРЫ ПОКАЗЫВАЮТСЯ. ПОТОМ НАДО БУДЕТ СДЕЛАТЬ ОТОБРАЖЕНИЕ ТУРНИРОВ ПО ВЫБРАННОЙ ДАТЕ
                  <div className="col_center_gap10">
                  <div className="text-field_half" style={{zIndex: 2}}>
                  <div className="text-field_half_selector">
                    <div className="text_field_half_select" onClick={() => toggleEvent()}>
                      <p className={eventSelected === "Выберите турнир" ? "onStart" : "choosed"}>{eventSelected}</p>
                      <img src="img/arrow.svg" id="arrowIcon" className={eventSelectorActive ? 'rotate' : null} alt="arrow"/>
                    </div>
                    <ul className={ eventSelectorActive ? 'select_list' : 'select_list hide'}>
                      {allEvents.map((ev) =>
                        <li className='text_field_half_options' onClick={() => {setEventSelected(ev.event); toggleEvent()}}>
                          <div className="list_logo">
                            <img src={ev.eventSrc} alt={ev.series}/>
                          </div>
                          <p>{ev.event}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                  </div>
                  {eventSelected !== "Выберите турнир" ?
                    <div className="col_center_gap30">
                      <div className="match_selector" style={{zIndex: 1}}>
                        <div className="match_select" onClick={() => toggleClass()}>
                          <p className={valueTeam === "Выберите матч" ? "onStart" : "choosed"}>{valueTeam}</p>
                          <img src="../img/arrow.svg" className={matchSelectorActive ? 'rotate' : null} alt="arrow"/>
                        </div>
                        <ul className={ matchSelectorActive ? 'match_select_list' : 'match_select_list hide'}>
                          {getMatchesByEvent(eventSelected).map((match) =>
                            <li className="select_match_options" onClick={()=>{setValueTeam(match.leftTeam + " vs. " + match.rightTeam); setValueDate(match.date); setDateSelectedOngoing(match.date); setTimeSelected(match.time); setValueTime(match.time); setEventSelected(match.event); setValueEvent(match.event); setLeftTeam(match.leftTeam); setRightTeam(match.rightTeam); toggleClass()}}>
                              <div className="match_list_team_wrapper">
                                <div className="left_team_tag"><p>{match.leftTeam}</p></div>
                                <div className="list_logo">
                                  <img src={match.leftTeamSrc} alt={match.leftTeam}/>
                                </div>
                              </div>
                              <p> vs. </p>
                              <div className="match_list_team_wrapper">
                                <div className="list_logo">
                                  <img src={match.rightTeamSrc} alt={match.rightTeam}/>
                                </div>
                                <div className="right_team_tag"><p>{match.rightTeam}</p></div>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="full_grey_button">
                        <input type="submit" value="Подтвердить" onClick={() => {setOngoingMatchEditorActive(true); setChooseComingMatchActive(false)}}/>
                      </div>
                    </div>
                  :
                  <></>
                  }
                  </div> 
                :
                <></>
                }
              </div>
            </Login>

            <Login active={ongoingMatchEditorActive} setActive={setOngoingMatchEditorActive}>
              <SetMatchInfo
              toggleDate={toggleDate} 
              dateSelected={dateSelectedOngoing} 
              valueDate={valueDate} 
              dateSelectorActive={dateSelectorActive} 
              setDateSelected={setDateSelectedOngoing}
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
              setMatchEditorActive={setOngoingMatchEditorActive}
              setDeleteMatchActive={setDeleteMatchActive} 
              teamsActive={teamsActive} 
              indexOf={indexOf}
              teams={teams}
              allEvents={allEvents}
              />
            </Login>

            <Login active={createMatchActive} setActive={setCreateMatchActive}>
              <div className="header_splash_window">
                <div className="logo_splash_window"></div>
              </div>
              <div className="info_text">
                <p>Укажите информацию о матче</p>
              </div>
              <div className="col_center_gap30">
                <div className="inside scroll">
                  <DateSelector toggleDate={toggleDate} dateSelected={dateSelected} valueDate={"Выберите дату"} dateSelectorActive={dateSelectorActive} setDate={setDateSelected} minDate={genMinDate()}/>
                  <div className="row_center_6">
                    <div className="text-field_half">
                      <div className="text-field_half_selector">
                        <div className="text_field_half_select" onClick={() => toggleTime()}>
                          <p className={timeSelected === "Выберите время" ? "onStart" : "choosed"}>{timeSelected}</p>
                          <img src="img/arrow.svg" id="arrowIcon" className={timeSelectorActive ? 'rotate' : null} alt="arrow"/>
                        </div>
                        <ul className={ timeSelectorActive ? 'time_list' : 'time_list hide'}>
                          <TimePicker setTime={setTimeSelected} minTime={getMinTime()}/>
                        </ul>
                      </div>
                    </div>
                    <div className="text-field_half">
                      <div className="text-field_half_selector">
                        <div className="text_field_half_select" onClick={() => toggleEvent()}>
                          <p className={eventSelected === "Выберите турнир" ? "onStart" : "choosed"}>{eventSelected}</p>
                          <img src="img/arrow.svg" id="arrowIcon" className={eventSelectorActive ? 'rotate' : null} alt="arrow"/>
                        </div>
                        <ul className={ eventSelectorActive ? 'select_list' : 'select_list hide'}>
                          {allEvents.map((ev) =>
                            <li className='text_field_half_options' onClick={() => {setEventSelected(ev.event); toggleEvent()}}>
                              <div className="list_logo">
                                <img src={ev.eventSrc} alt={ev.series}/>
                              </div>
                              <p>{ev.event}</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row_center_6">
                    <div className="text-field_half">
                      <div className="text-field_half_selector">
                        <div className="text_field_half_select" onClick={() => toggleLeftTeam()}>
                              <p className={selectedLeftTeam === "Выберите левую команду" ? "onStart" : "choosed"}>{selectedLeftTeam}</p>
                              <img src="img/arrow.svg" className={leftTeamSelectorActive ? 'rotate' : null} alt="arrow"/>
                        </div>
                        <ul className={ leftTeamSelectorActive ? 'select_list' : 'select_list hide'}>
                          {teams.map((team) =>
                            <li className={teamsActive[indexOf(team.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setSelectedLeftTeam(team.name); setTeam(indexOf(team.name), selectedLeftTeam); toggleLeftTeam()}}>
                              <div className="list_logo">
                                <img src={team.logo} alt={team.name}/>
                              </div>
                              <p>{team.name}</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="text-field_half">
                      <div className="text-field_half_selector">
                        <div className="text_field_half_select" onClick={() => toggleRightTeam()}>
                          <p className={selectedRightTeam === "Выберите правую команду" ? "onStart" : "choosed"}>{selectedRightTeam}</p>
                          <img src="img/arrow.svg" className={rightTeamSelectorActive ? 'rotate' : null} alt="arrow"/>
                        </div>
                        <ul className={ rightTeamSelectorActive ? 'select_list' : 'select_list hide'}>
                          {teams.map((team) =>
                            <li className={teamsActive[indexOf(team.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setSelectedRightTeam(team.name); setTeam(indexOf(team.name), selectedRightTeam); toggleRightTeam()}}>
                              <div className="list_logo">
                                <img src={team.logo} alt={team.name}/>
                              </div>
                              <p>{team.name}</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="description_field">
                    <textarea type="text" placeholder="Введите описание" style={{width: "434px", color: "white", fontSize: "16px"}}></textarea>
                  </div>
                  <div className="row_center_6">
                    <div className="text-field_half">
                        <div className="text-field_half_selector">
                          <div className="text_field_half_select" onClick={() => toggleFormat()}>
                            <p className={selectedFormat === "Выберите формат" ? "onStart" : "choosed"}>{selectedFormat}</p>
                            <img src="img/arrow.svg" className={formatSelectorActive ? 'rotate' : null} alt="arrow"/>
                          </div>
                          <ul className={ formatSelectorActive ? 'select_list' : 'select_list hide'}>
                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("bo1"); toggleFormat()}}>
                              <p>bo1</p>
                            </li>
                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("bo2"); toggleFormat()}}>
                              <p>bo2</p>
                            </li>
                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("bo3"); toggleFormat()}}>
                              <p>bo3</p>
                            </li>
                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("bo5"); toggleFormat()}}>
                              <p>bo5</p>
                            </li>
                            <li className="text_field_half_options" onClick={()=>{setSelectedFormat("bo7"); toggleFormat()}}>
                              <p>bo7</p>
                            </li>
                          </ul>
                        </div>
                    </div>
                    <div className="text-field_half">
                        <div className="text-field_half_selector">
                          <div className="text_field_half_select" onClick={() => toggleType()}>
                            <p className={selectedType === "Выберите тип" ? "onStart" : "choosed"}>{selectedType}</p>
                            <img src="img/arrow.svg" className={typeSelectorActive ? 'rotate' : null} alt="arrow"/>
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
                  <div className="text-field_half">
                        <div className="text-field_half_selector">
                          <div className="text_field_half_select" onClick={() => toggleTier()}>
                            <p className={selectedTier === "Выберите важность" ? "onStart" : "choosed"}>{selectedTier}</p>
                            <img src="img/arrow.svg" className={tierSelectorActive ? 'rotate' : null} alt="arrow"/>
                          </div>
                          <ul className={ tierSelectorActive ? 'select_list' : 'select_list hide'}>
                            {tierListGenerator()}
                          </ul>
                        </div>
                    </div>
                </div>
                <div className="green_button">
                  <input type="submit" value="Создать матч" onClick={() => {setCreateMatchActive(false)}}/>
                </div>
              </div>
            </Login>
        </div>
    );
}

export default Matches;