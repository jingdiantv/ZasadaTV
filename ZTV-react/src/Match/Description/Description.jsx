import React from "react";
import { useState } from "react";
import Editor from "../../components/Editor/Editor";
import Login from "../../Login/Login";
import "./Description.css"

function Description(props){
    const leftTeam = props.NameFirst;
    const rightTeam = props.NameSecond;

    const [infoEditorActive, setInfoEditorActive] = useState(false); //состояния модального окна для редактирования текущих матчей
    
    const [selectedFormat, setSelectedFormat] = useState("bo" + props.format[8]); // формат (bo1 и тп)
    const [formatSelectorActive, setFormatSelectorActive] = useState(false);

    const [selectedType, setSelectedType] = useState(props.type); // тип (Лан/Онлайн)
    const [typeSelectorActive, setTypeSelectorActive] = useState(false);

    const [mapsActive, setMapsActive] = useState([false, false, false, false, false, false, false]); // состояния команд - выбрана ли команда(чтоб блокировать ее)
    const [pickActive, setPickActive] = useState([false, false, false, false, false]);

    const [selectorMapActive, setSelectorMapActive] = useState([false, false, false, false, false, false, false]); // состояния селектора
    const [selectorPickActive, setSelectorPickActive] = useState([false, false, false, false, false, false, false]); // состояния селектора

    const [valuePick, setValuePick] = useState(['Выберите пик', 'Выберите пик', 'Выберите пик', 'Выберите пик', 'Выберите пик', 'Выберите пик', 'Выберите пик']); //Для селектора команды
    const [valueMap, setValueMap] = useState(['Выберите карту 1', 'Выберите карту 2', 'Выберите карту 3', 'Выберите карту 4', 'Выберите карту 5', 'Выберите карту 6', 'Выберите карту 7']); //Для селектора команды

    const [pickState, setPickState] = useState([ 
        {name: leftTeam + " банит", count: 0},
        {name: leftTeam + " пикает", count: 0},
        {name: rightTeam + " банит", count: 0},
        {name: rightTeam + " пикает", count: 0},
        {name: "Десайдер", count: 0},
    ]);

    const setPick = (id) =>{
        const tempPick = [...pickState];
        tempPick[id].count = tempPick[id].count + 1;
        const bo = parseInt(props.format[8]);

        let temp = [...pickActive];
        if(bo === 1){
            if(tempPick[id].name.includes("банит") && tempPick[id].count >= 3){
                temp[id] = true;
            } else if(tempPick[id].name.includes("пикает") && tempPick[id].count >= 0){
                temp[id] = true;
            } else if(tempPick[id].name.includes("Десайдер") && tempPick[id].count >= 1){
                temp[id] = true;
            }
        } else if(bo === 2){
            if(tempPick[id].name.includes("банит") && tempPick[id].count >= 2){
                temp[id] = true;
            } else if(tempPick[id].name.includes("пикает") && tempPick[id].count >= 1){
                temp[id] = true;
            } else if(tempPick[id].name.includes("Десайдер") && tempPick[id].count >= 0){
                temp[id] = true;
            }
        } else if(bo === 3){
            if(tempPick[id].name.includes("банит") && tempPick[id].count >= 2){
                temp[id] = true;
            } else if(tempPick[id].name.includes("пикает") && tempPick[id].count >= 1){
                temp[id] = true;
            } else if(tempPick[id].name.includes("Десайдер") && tempPick[id].count >= 1){
                temp[id] = true;
            }
        } else if(bo === 5){
            if(tempPick[id].name.includes("банит") && tempPick[id].count >= 1){
                temp[id] = true;
            } else if(tempPick[id].name.includes("пикает") && tempPick[id].count >= 2){
                temp[id] = true;
            } else if(tempPick[id].name.includes("Десайдер") && tempPick[id].count >= 1){
                temp[id] = true;
            }
        }
        setPickActive(temp);
        setPickState(tempPick);
    }

    const setPickValue = (id, name) =>{
        let tempPicks = [...valuePick];
        tempPicks[id] = name;
        setValuePick(tempPicks);
    }

    const setMapValue = (id, value) =>{
        let tempMaps = [...valueMap];
        tempMaps[id] = value;
        setValueMap(tempMaps);
    }

    const setMap = (id, value) =>{ // с её помощью делаем нужную карту заблокированной
        let temp = [...mapsActive];
        let val = eventMapPool.indexOf(value);
    
        temp[val] = !temp[val];
        temp[id] = !temp[id];
        setMapsActive(temp);
      }

      const togglePick = (id) => { // функция toggle для селектора
        let temp = [];
        for(let i = 0; i < selectorPickActive.length; ++i){
          temp.push(false);
        }
        if(id !== "all"){
          temp[id] = !selectorPickActive[id];
        }
        setSelectorPickActive(temp);
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

    const indexOf = (value) => {
        for(let i = 0; i < pickState.length; ++i){
            if(value === pickState[i].name){
                return i;
            }
        }
    }

    const selectorGenerator = () =>{
        let content = [];
        for (let i = 0; i < 7; ++i){
            content.push(
                <div className="row_center_6">
                    <div className="text-field_half" style={{zIndex: 7 - i}}>
                        <div className="text-field_half_selector">
                            <div className="text_field_half_select" onClick={() => toggleMap(i)}>
                                <p className={(valueMap[i] === "Выберите карту " + (i + 1)) ? "onStart" : "choosed"}>{valueMap[i]}</p>
                                <img src="../../img/arrow.svg" className={selectorMapActive[i] ? 'rotate' : null} alt="arrow"/>
                            </div>
                            <ul className={ selectorMapActive[i] ? 'select_list' : 'select_list hide'}>
                                {eventMapPool.map((map) =>
                                <li className={mapsActive[eventMapPool.indexOf(map)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setMapValue(i, map); setMap(eventMapPool.indexOf(map), valueMap[i]); toggleMap(i)}}>
                                    <p>{map}</p>
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="text-field_half" style={{zIndex: 7 - i}}>
                        <div className="text-field_half_selector">
                            <div className="text_field_half_select" onClick={() => togglePick(i)}>
                                <p className={valuePick[i] === "Выберите пик" ? "onStart" : "choosed"}>{valuePick[i]}</p>
                                <img src="../../img/arrow.svg" className={selectorPickActive[i] ? 'rotate' : null} alt="arrow"/>
                            </div>
                            <ul className={ selectorPickActive[i] ? 'select_list' : 'select_list hide'}>
                                {pickState.map((pick) =>
                                <li className={pickActive[indexOf(pick.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setPickValue(i, pick.name); setPick(indexOf(pick.name)); togglePick(i)}}>
                                    <p>{pick.name}</p>
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    }


    const eventMapPool = [
        "Anubis", "Mirage", "Overpass", "Nuke", "Vertigo", "Ancient", "Inferno"
    ]

    const toggleFormat = () => {
        setFormatSelectorActive(!formatSelectorActive);
      }
  
    const toggleType = () => {
        setTypeSelectorActive(!typeSelectorActive);
    }

    return(
    <div>
        <div className="row_center_5px">
            <p>Карты</p>
            {props.isAdmin ?<Editor size="14px" depth={2} onClick={() => setInfoEditorActive(true)}/> : <></>}
        </div>
        <div className="match_info_upcoming_maps_desc">
            <p>{props.format} ({props.type})<br/><br/>{props.description}</p>
        </div>
        {props.MatchStatus === 0 ? null : 
            <div className="maps_news">
                <p>1. Команда ПУПА убирает Mirage</p>
                <p>2. Команда AbuDabi убирает Vertigo</p>
                <p>3. Команда AbuDabi выбирает Overpass</p>
                <p>4. Команда ПУПА выбирает Anubis</p>
                <p>5. Команда AbuDabi убирает Inferno</p>
                <p>6. Команда ПУПА убирает Ancient</p>
                <p>7. Остаётся Nuke</p>
            </div>
        }
        <Login active={infoEditorActive} setActive={setInfoEditorActive}>
            <div className="header_splash_window">
                <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                <p>Укажите информацию о картах</p>
            </div>
            <div className="col_center_gap30">
                <div className="inside scroll">
                    <div className="row_center_6" style={{zIndex: 8}}>
                        <div className="text-field_half">
                            <div className="text-field_half_selector">
                                <div className="text_field_half_select" onClick={() => toggleFormat()}>
                                    <p className={selectedFormat === ("bo" + props.format[8]) ? "onStart" : "choosed"}>{selectedFormat}</p>
                                    <img src="../../img/arrow.svg" className={formatSelectorActive ? 'rotate' : null} alt="arrow"/>
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
                                    <p className={selectedType === props.type ? "onStart" : "choosed"}>{selectedType}</p>
                                    <img src="../../img/arrow.svg" className={typeSelectorActive ? 'rotate' : null} alt="arrow"/>
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
                    <div className="description_field">
                        <textarea type="text" placeholder="Введите описание" style={{width: "434px", color: "white", fontSize: "16px", height: "65px"}}>{props.description}</textarea>
                    </div>
                    {selectorGenerator()}
                </div>
                <div className="full_grey_button">
                    <input type="submit" value="Подтвердить" onClick={() => infoEditorActive ? setInfoEditorActive(false) : null}/>
                </div>
            </div>
        </Login>
    </div>
    )
}

export default Description;