import React from "react";
import { useRef, useState } from 'react';
import Participant from '../../Participant/Participant';
import PrizePlace from '../../PrizePlace/PrizePlace';
import Map from '../../Map/Map';
import Editor from "../../Editor/Editor";
import Login from "../../../Login/Login";
import './EventInfo.css';

function EventInfo(props) {
    
    const [diskLinkEditorActive, setDiskLinkEditorActive] = useState(false); //состояния модального окна для редактирования

    const [prizePlaceEditorActive, setPrizePlaceEditorActive] = useState(false); //состояния модального окна для редактирования призовых мест
    const [prizePlaceSetterActive, setPrizePlaceSetterActive] = useState(false); //состояния модального окна для редактирования призовых мест
    const [selectorActive, setSelectorActive] = useState([false, false, false]); // состояния селектора

    const [descriptionSetterActive, SetDescriptionSetterActive] = useState(false); //состояния модального окна для редактирования призовых мест

    const [mapsSetterActive, setMapsSetterActive] = useState(false); //состояния модального окна для редактирования призовых мест

    const [valueTeam, setValueTeam] = useState(['Выберите команду', 'Выберите команду', 'Выберите команду']); //Для селектора команды
    const [teamsActive, setTeamsActive] = useState([false, false, false]); // состояния команд - выбрана ли команда(чтоб блокировать ее)

    const teams = [
        {name: "Tamada", src: "img/players/Tamada.png", team: "Amfier", teamsrc: "img/teams_logo/Amfier.png", status: "", type: "player"},
        {name: "rusttle", src: "img/players/rusttle.png", team: "", teamsrc: "", status: "", type: "player"},
        {name: "Walhalla", src: "img/teams_logo/Walhalla.png", status: "", type: "team"}
    ]

    const [valueMap, setValueMap] = useState(['Выберите карту 1', 'Выберите карту 2', 'Выберите карту 3', 'Выберите карту 4', 'Выберите карту 5', 'Выберите карту 6', 'Выберите карту 7']); //Для селектора команды
    const [selectorMapActive, setSelectorMapActive] = useState([false, false, false, false, false, false, false]); // состояния селектора

    const [mapsActive, setMapsActive] = useState([false, false, false, false, false, false, false]); // состояния команд - выбрана ли команда(чтоб блокировать ее)

    const diskLinkRef = useRef(null);

    const prizePlace = props.prizePlace;

    const [valueDiskLink, setValueDiskLink] = useState(props.photoLink); //Для селектора команды

    const eventMapPool = [
        "Anubis", "Mirage", "Overpass", "Nuke", "Vertigo", "Ancient", "Inferno"
    ]

    const urlFix = (url) => {
        if(url.startsWith("https://")){
            return url.replace("https://", "");
        }
        else if(url.startsWith("http://")){
            return url.replace("http://", "");
        }
        return url;
    }

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
                    <img src="../../img/arrow.svg" className={selectorActive[i] ? 'rotate' : null} alt="arrow"/>
                  </div>
                  <ul className={ selectorActive[i] ? 'select_list' : 'select_list hide'}>
                    {teams.map((team) =>
                      <li className={teamsActive[indexOf(team.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setTeamValue(i, team.name); setTeam(indexOf(team.name), valueTeam[i]); toggleClass(i)}}>
                        <div className="list_logo">
                          <img src={"../../" + team.src} alt={team.name}/>
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
                    <p className="choosed">{prizePlace[i]["place"]}</p>
                  </div>
                </div>
              </div>
          </div>
          );
        }
        return content;
    }

    const handleClick = () => {
        setValueDiskLink(diskLinkRef.current.value);
        setDiskLinkEditorActive(!diskLinkEditorActive);
    };

    const toggleMap = (id) => { // функция toggle для селектора
        let temp = [];
        for(let i = 0; i < selectorMapActive.length; ++i){
          temp.push(false);
        }
        if(id !== "all"){
          temp[id] = !selectorMapActive[id];
        }
        setSelectorMapActive(temp);
    };

    const setMap = (id, value) =>{ // с её помощью делаем нужную карту заблокированной
        let temp = [...mapsActive];
        let val = eventMapPool.indexOf(value);
    
        temp[val] = !temp[val];
        temp[id] = !temp[id];
        setMapsActive(temp);
    }

    const setMapValue = (id, value) =>{
        let tempMaps = [...valueMap];
        tempMaps[id] = value;
        setValueMap(tempMaps);
    }

    return(
        <div>
            <div className="space_wrapper">
                <div className="container_name">
                    <div className="event_col"><p>{props.part_header}</p></div>
                    <div className="participants_wrapper">
                        <Participant part={props.part} total={props.total} status={props.status}/>
                    </div>
                </div>

                <div className="container_name">
                    <div className="row_center_5px">
                        <div className="event_col"><p>Призовые места</p></div>
                        {props.isAdmin ? <Editor size="12px" depth={2} onClick={() => props.status === "registration" ? setPrizePlaceSetterActive(true) : setPrizePlaceEditorActive(true)}/> : <></>}
                    </div>
                    <div className="participants_wrapper">
                        <PrizePlace prize={props.prizePlace}/>
                    </div>
                </div>

                <div className="event_info_bottom">
                    <div className="container_name">
                        <div className="row_center_5px">
                            <div className="event_col">
                                <p>Пул карт</p>
                            </div>
                            {props.isAdmin ? props.status === "registration" ? <Editor size="12px" depth={2} onClick={() => setMapsSetterActive(true)}/> : <></> : <></>}
                        </div>
                        <div className="maps">
                            {props.maps.map((map_name) =>
                                <div className="map_wrapper">
                                    <Map map={map_name}/>
                                    <div className="map_name_wrapper"><p>{map_name}</p></div>
                                </div>   
                            )}
                        </div>
                    </div>
                    
                    <div className="event_info_bottom_wrapper">
                        <div className="container_name">
                            <div className="row_center_5px">
                                <div className="event_col">
                                    <p>Формат игр</p>
                                </div>
                                {props.isAdmin ? props.status === "registration" ? <Editor size="12px" depth={2} onClick={() => SetDescriptionSetterActive(true)}/> : <></> : <></>}
                            </div>
                            <div className="event_info">
                                <p>Ну тут описание турнира, всё такое, карты всякие и тд, и тп.
                                Ну тут описание турнира, всё такое, карты всякие и тд, и тп. 
                                </p>
                            </div>
                        </div>
                        <div className="container_name">
                            <div className="row_center_5px">
                                <div className="event_col"><p>Архив с фотографиями</p></div>
                                {props.isAdmin ? <Editor size="12px" depth={2} onClick={() => setDiskLinkEditorActive(true)}/> : <></>}
                            </div>
                            <div className="event_info">
                                <a href={valueDiskLink} target="_blank" rel="noopener noreferrer">{urlFix(valueDiskLink)}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Login active={prizePlaceSetterActive} setActive={setPrizePlaceSetterActive}>
                <div className="header_splash_window" onClick={() => toggleClass("all")}>
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text" onClick={() => toggleClass("all")}>
                <p>Укажите информацию о призовых местах</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside">
                    <div className="row_center_gap3" style={{paddingLeft: "14px"}}>
                                <div className="row_center_6">
                                    <div className="text-field_half">
                                        <input className="text-field_half input" type="text" placeholder="Укажите призовое место"/>
                                    </div>
                                    <div className="text-field_half">
                                        <input className="text-field_half input" placeholder="Укажите приз"/>
                                    </div>
                                </div>
                                <div className="minus"></div>
                            </div>
                            <div className="row_center_gap3" style={{paddingLeft: "14px"}}>
                                <div className="row_center_6">
                                    <div className="text-field_half">
                                        <input className="text-field_half input" type="text" placeholder="Укажите призовое место"/>
                                    </div>
                                    <div className="text-field_half">
                                        <input className="text-field_half input" placeholder="Укажите приз"/>
                                    </div>
                                </div>
                                <div className="minus"></div>
                            </div>
                            <div className="row_center_gap3" style={{paddingLeft: "14px"}}>
                                <div className="row_center_6">
                                    <div className="text-field_half">
                                        <input className="text-field_half input" type="text" placeholder="Укажите призовое место"/>
                                    </div>
                                    <div className="text-field_half">
                                        <input className="text-field_half input" placeholder="Укажите приз"/>
                                    </div>
                                </div>
                                <div className="minus"></div>
                            </div>
                            <div className="add_stream">
                                <p>Добавить призовое место</p>
                                <img src="../img/Add.svg" alt="Плюс" />
                            </div>
                    </div>
                    <div className="full_grey_button">
                        <input type="submit" value="Сохранить" onClick={() => prizePlaceSetterActive ? setPrizePlaceSetterActive(false) : null}/>
                    </div>
                </div>
            </Login>

            <Login active={prizePlaceEditorActive} setActive={setPrizePlaceEditorActive}>
                <div className="header_splash_window" onClick={() => toggleClass("all")}>
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text" onClick={() => toggleClass("all")}>
                <p>Укажите информацию о призовых местах</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside">
                        {generateSelectors()}
                    </div>
                    <div className="full_grey_button">
                        <input type="submit" value="Сохранить" onClick={() => prizePlaceEditorActive ? setPrizePlaceEditorActive(false) : null}/>
                    </div>
                </div>
            </Login>

            <Login active={mapsSetterActive} setActive={setMapsSetterActive}>
            <div className="header_splash_window" >
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о пуле карт</p>
                </div>
                <div className="col_center_gap10">
                    <div className="row_center_6" style={{zIndex: 2}}>
                        <div className="row_center_gap3">
                            <div className="minus"></div>
                            <div className="text-field_half">
                                <div className="text-field_half_selector">
                                    <div className="text_field_half_select" onClick={() => toggleMap(0)}>
                                        <p className={(valueMap[0] === "Выберите карту " + (0 + 1)) ? "onStart" : "choosed"}>{valueMap[0]}</p>
                                        <img src="../img/arrow.svg" className={selectorMapActive[0] ? 'rotate' : null} alt="arrow"/>
                                    </div>
                                    <ul className={ selectorMapActive[0] ? 'select_list' : 'select_list hide'}>
                                        {eventMapPool.map((map) =>
                                            <li className={mapsActive[eventMapPool.indexOf(map)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setMapValue(0, map); setMap(eventMapPool.indexOf(map), valueMap[0]); toggleMap(0)}}>
                                                <p>{map}</p>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row_center_gap3">
                            <div className="text-field_half">
                                <div className="text-field_half_selector">
                                    <div className="text_field_half_select" onClick={() => toggleMap(1)}>
                                        <p className={(valueMap[1] === "Выберите карту " + (1 + 1)) ? "onStart" : "choosed"}>{valueMap[1]}</p>
                                        <img src="../img/arrow.svg" className={selectorMapActive[1] ? 'rotate' : null} alt="arrow"/>
                                    </div>
                                    <ul className={ selectorMapActive[1] ? 'select_list' : 'select_list hide'}>
                                        {eventMapPool.map((map) =>
                                            <li className={mapsActive[eventMapPool.indexOf(map)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setMapValue(1, map); setMap(eventMapPool.indexOf(map), valueMap[1]); toggleMap(1)}}>
                                                <p>{map}</p>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="minus"></div>
                        </div>
                    </div>
                    <div className="add_stream">
                        <p>Добавить карту в пул</p>
                        <img src="../img/Add.svg" alt="Плюс" />
                    </div>
                </div>
            </Login>

            <Login active={diskLinkEditorActive} setActive={setDiskLinkEditorActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите ссылку на диск с фото</p>
                </div>
                <div className="col_center_gap30">
                    <div className="text-field">
                        <input className="text-field_input" type="text" name="diskLink" placeholder="Введите ссылку на диск с фото" ref={diskLinkRef}/>
                    </div>
                    <div className="full_grey_button">
                        <input type="submit" value="Сохранить" onClick={handleClick}/>
                    </div>
                </div>
            </Login>

            <Login active={descriptionSetterActive} setActive={SetDescriptionSetterActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о формате игр</p>
                </div>
                <div className="col_center_gap30">
                    <div className="description_field">
                        <textarea type="text" placeholder="Введите описание" style={{width: "434px", color: "white", fontSize: "16px", height: "65px"}}>{props.description}</textarea>
                    </div>
                    <div className="full_grey_button">
                        <input type="submit" value="Сохранить" onClick={() => descriptionSetterActive ? SetDescriptionSetterActive(false) : null}/>
                    </div>
                </div>
            </Login>
        </div>
    );
}

export default EventInfo;