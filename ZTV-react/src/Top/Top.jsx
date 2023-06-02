import React from "react";
import {Link} from "react-router-dom"
import { useState } from 'react';
import NonFirstTeam from "./Teams/NonFirstTeam/NonFirstTeam";
import FirstTeam from "./Teams/FirstTeam/FirstTeam";
import Editor from "../components/Editor/Editor";
import Login from "../Login/Login";
import { fillSpaces } from "../components/Helper/Helper";
import "./Top.css"
import "../../src/auto-layout.css"

function Top(){

  const firstTeam={
    topPosition: 1,
    logo: "img/teams_logo/AbuDabi.svg",
    name: "AbuDabi",
    players: [
      {nick: "Tamada", photo: "img/players/Tamada.png", country: "Испания", flagPath: "img/flags/mini/Spain.svg"},
      {nick: "Hitriy_Kazah", photo: "img/players/Hitriy_Kazah.png", country: "Косово", flagPath: "img/flags/mini/Kosovo.svg"},
      {nick: "_SD_", photo: "img/players/_SD_.png", country: "Остров Мэн", flagPath: "img/flags/mini/IsleOfMan.svg"},
      {nick: "rusttle", photo: "img/players/rusttle.png", country: "Белиз", flagPath: "img/flags/mini/Belize.svg"},
      {nick: "ugly4", photo: "img/players/ugly4.png", country: "Россия", flagPath: "img/flags/mini/Russia.svg"}
    ],
    changedPosition: 0
  }
  
  const nonFirstTeams = [
      {logo: "img/teams_logo/pupa.svg", name: "ПУПА", topPosition: 2, changedPosition: 1, players: [
        {nick: "игрок1"},
        {nick: "игрок2"},
        {nick: "игрок3"},
        {nick: "игрок4"},
        {nick: "игрок5"}
      ]},
      {logo: "img/teams_logo/NoLogo.svg", name: "G2", topPosition: 3, changedPosition: -1, players: [
        {nick: "игрок1"},
        {nick: "игрок2"},
        {nick: "игрок3"},
        {nick: "игрок4"},
        {nick: "игрок5"}
      ]},
      {logo: "img/teams_logo/Amfier.png", name: "Amfier", topPosition: 4, changedPosition: 0, players: [
        {nick: "игрок1"},
        {nick: "игрок2"},
        {nick: "игрок3"},
        {nick: "игрок4"},
        {nick: "игрок5"}
      ]},
      {logo: "img/teams_logo/Walhalla.png", name: "Walhalla", topPosition: 5, changedPosition: 0, players: [
        {nick: "игрок1"},
        {nick: "игрок2"},
        {nick: "игрок3"},
        {nick: "игрок4"},
        {nick: "игрок5"}
      ]}
  ]

  const isAdmin = true;

  const [editorActive, setEditorActive] = useState(false); //состояния модального окна для редактирования топа
  const [selectorActive, setSelectorActive] = useState([false, false, false, false, false]); // состояния селектора


  const [valueTeam, setValueTeam] = useState(['Выберите команду', 'Выберите команду', 'Выберите команду', 'Выберите команду', 'Выберите команду']); //Для селектора команды

  const teams = [
  {name: "ПУПА", logo: "img/teams_logo/pupa.svg"}, 
  {name: "Walhalla", logo: "img/teams_logo/Walhalla.png"}, 
  {name: "G2", logo: "img/teams_logo/NoLogo.svg"}, 
  {name: "AbuDabi", logo: "img/teams_logo/AbuDabi.svg"}, 
  {name: "Amfier", logo: "img/teams_logo/Amfier.png"}
  ];

  const [teamsActive, setTeamsActive] = useState([false, false, false, false, false]); // состояния команд - выбрана ли команда(чтоб блокировать ее)
  
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

  const setTeam = (id, value) =>{ // с её помощью делаем нужную команду заблокированной 
    let temp = [...teamsActive];
    let val = indexOf(value);
    temp[val] = !temp[val];
    temp[id] = !temp[id];
    setTeamsActive(temp);
  }

  const setTeamValue = (id, value) =>{ // ставим выбранную команду в выбранное поле
    let tempTeams = [...valueTeam];
    tempTeams[id] = value;
    setValueTeam(tempTeams);
  }

  const indexOf = (value) =>{
    for(let i = 0; i < teams.length; ++i){
      if(value === teams[i].name){
        return i;
      }
    }
  }

  const generateSelectors = () =>{
    const size = teams.length;
    let content = []
    for(let i = 0; i < size; ++i){
      content.push(
        <div className="row_center_6">
          <div className="text-field_half" style={{zIndex: size - i}}>
            <div className="text-field_half_selector">
              <div className="text_field_half_select" onClick={() => toggleClass(i)}>
                <p className={valueTeam[i] === "Выберите команду" ? "onStart" : "choosed"}>{valueTeam[i]}</p>
                <img src="img/arrow.svg" className={selectorActive[i] ? 'rotate' : null} alt="arrow"/>
              </div>
              <ul className={ selectorActive[i] ? 'select_list' : 'select_list hide'}>
                {teams.map((team) =>
                  <li className={teamsActive[indexOf(team.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setTeamValue(i, team.name); console.log(indexOf(team.name), valueTeam[i]); setTeam(indexOf(team.name), valueTeam[i]); toggleClass(i)}}>
                    <div className="list_logo">
                      <img src={team.logo} alt={team.name}/>
                    </div>
                    <p>{team.name}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="text-field_half" style={{zIndex: size - i}}>
            <div className="text-field_half_selector">
              <div className="text_field_half_select non_selectable_half_select">
                <p className="choosed">{i + 1}</p>
              </div>
            </div>
          </div>
      </div>
      );
    }
    return content;
  }

  return(
    <div>
      <div className="top_teams">
          <div className="row_center_5px">
            <p>Топ команд на 01.04.2023</p>
            {isAdmin ? <Editor size="20px" depth={0} onClick={() => setEditorActive(true)}/> 
            : <></>}
            
          </div>
          <div className="col_center_gap10">
            
            <FirstTeam {...firstTeam}/>
            
              <div className="col_center_gap10">
                {nonFirstTeams.map((team)=>
                  <Link to={"/team/" + fillSpaces(team.name)} style={{textDecoration: "none"}}>
                    <NonFirstTeam {...team}/>
                  </Link>
                )}
              </div>
          </div>
      </div>
      <Login active={editorActive} setActive={setEditorActive}>
          <div className="header_splash_window" onClick={() => toggleClass("all")}>
            <div className="logo_splash_window"></div>
          </div>
          <div className="info_text" onClick={() => toggleClass("all")}>
              <p>Укажите информацию о положении команд в топе</p>
          </div>
          <div className="col_center_gap30">
            <div className="inside">
              {generateSelectors()}
            </div>
            <div className="full_grey_button">
              <input type="submit" value="Сохранить" onClick={() => editorActive ? setEditorActive(false) : null}/>
            </div>
          </div>
      </Login>
    </div>
  )
};

export default Top;