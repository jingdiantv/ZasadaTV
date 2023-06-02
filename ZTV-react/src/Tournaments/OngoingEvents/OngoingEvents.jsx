import React from "react";
import { useState } from "react";
import OngoingEventsMaker from "../../components/EventMaker/OngoingEventsMaker/OngoingEventsMaker";
import Editor from "../../components/Editor/Editor";
import DateSelector from "../../components/MatchHelper/DateSelector";
import Login from "../../Login/Login";
import './OngoingEvents.css';

function OngoingEvents(props) {

    const [eventChooserActive, setEventChooserActive] = useState(false);
    const [eventEditorActive, setEventEditorActive] = useState(false);
    const [chooseEventActive, setChooseEventActive] = useState(false);
    const [chooseOngoingEventActive, setChooseOngoingEventActive] = useState(false);
    const [editOngoingEventActive, setEditOngoingEventActive] = useState(false);
    
    const [deleteEventActive, setDeleteEventActive] = useState(false);
    const [createEventActive, setCreateEventActive] = useState(false);
    
    const [dateSelected, setDateSelected] = useState(''); // здесь хранится выбраная дата
    const [dateEndSelected, setDateEndSelected] = useState(''); // здесь хранится выбраная дата
    const [eventSelected, setEventSelected] = useState('Выберите турнир'); // здесь хранится выбраный турнир

    const [valueStartDate, setValueStartDate] = useState(''); // Это для даты выбранного матча
    const [valueEndDate, setValueEndDate] = useState(''); // Это для даты выбранного матча

    const [dateSelectorActive, setDateSelectorActive] = useState(false); // открыт/закрыт календарь
    const [dateEndSelectorActive, setDateEndSelectorActive] = useState(false); // открыт/закрыт календарь
    const [eventSelectorActive, setEventSelectorActive] = useState(false); 
    const [countrySelectorActive, setCountrySelectorActive] = useState(false); 
    const [citySelectorActive, setCitySelectorActive] = useState(false); 

    const [citySelected, setCitySelected] = useState('Выберите город'); // здесь хранится выбраный турнир
    const [valueCity, setValueCity] = useState('Выберите город'); //Для селектора страны

    const [countrySelected, setCountrySelected] = useState('Выберите страну'); // здесь хранится выбраный турнир
    const [valueCountry, setValueCountry] = useState('Выберите страну'); //Для селектора страны

    const [valuePrize, setValuePrize] = useState(''); //Для селектора страны
    const [valueFee, setValueFee] = useState(''); //Для селектора страны
    const [selectedPrize, setSelectedPrize] = useState('Укажите приз'); //Для селектора страны
    const [selectedFee, setSelectedFee] = useState('Укажите взнос'); //Для селектора страны

    const [selectedFormat, setSelectedFormat] = useState('Выберите формат'); // формат (bo1 и тп)
    const [valueFormat, setValueFormat] = useState('Выберите формат'); // формат (bo1 и тп)
    const [formatSelectorActive, setFormatSelectorActive] = useState(false);

    const [selectedType, setSelectedType] = useState('Выберите тип'); // тип (Лан/Онлайн)
    const [valueType, setValueType] = useState('Выберите тип'); // тип (Лан/Онлайн)
    const [typeSelectorActive, setTypeSelectorActive] = useState(false);

    const [valuePath, setValuePath] = useState('Выберите путь до файла'); // тип (Лан/Онлайн)
    const [selectedPath, setSelectedPath] = useState('Выберите путь до файла'); // тип (Лан/Онлайн)

    const [valueDecription, setValueDecription] = useState('Тут какое-то описание, туда-сюда'); // тип (Лан/Онлайн)
    const [selectedValueDecription, setSelectedValueDecription] = useState('Введите формат игр/описание'); // тип (Лан/Онлайн)

    const [valueName, setValueName] = useState(''); // тип (Лан/Онлайн)
    const [selectedName, setSelectedName] = useState('Укажите название'); // тип (Лан/Онлайн)

    const [valueDiskLink, setValueDiskLink] = useState('Укажите ссылку на диск с фото'); // тип (Лан/Онлайн)
    const [selectedDiskLink, setSelectedDiskLink] = useState('Укажите ссылку на диск с фото'); // тип (Лан/Онлайн)

    const [valueMaxTeams, setValueMaxTeams] = useState(''); // тип (Лан/Онлайн)
    const [selectedMaxTeams, setSelectedMaxTeams] = useState('Укажите макс. команд'); // тип (Лан/Онлайн)

    const [valueMap, setValueMap] = useState(['Выберите карту 1', 'Выберите карту 2', 'Выберите карту 3', 'Выберите карту 4', 'Выберите карту 5', 'Выберите карту 6', 'Выберите карту 7']); //Для селектора команды
    const [selectorMapActive, setSelectorMapActive] = useState([false, false, false, false, false, false, false]); // состояния селектора

    const [mapsActive, setMapsActive] = useState([false, false, false, false, false, false, false]); // состояния команд - выбрана ли команда(чтоб блокировать ее)

    const [selectorActive, setSelectorActive] = useState([false, false, false]); // состояния селектора
    const [valueTeam, setValueTeam] = useState(['Выберите команду', 'Выберите команду', 'Выберите команду']); //Для селектора команды
    const [teamsActive, setTeamsActive] = useState([false, false, false]); // состояния команд - выбрана ли команда(чтоб блокировать ее)

    const countries =[
        {name: "Россия", flagPath: "img/flags/mini/Russia.svg", cities: ["Пугачёв", "Самара", "Саратов", "Сызрань", "Балаково", "Тольятти"]},
        {name: "Остров Мэн", flagPath: "img/flags/mini/IsleOfMan.svg", cities: ["Дуглас", "Рамси", "Пил", "Каслтаун", "Лакси", "Онкан"]},
        {name: "Албания", flagPath: "img/flags/mini/Albania.svg", cities: ["Берат", "Буррели", "Влёра", "Гирокастра", "Грамши", "Дуррес"]},
        {name: "Испания", flagPath: "img/flags/mini/Spain.svg", cities: ["Барселона", "Мадрид", "Валенсия", "Севилья", "Мурсия", "Пальма"]},
        {name: "Белиз", flagPath: "img/flags/mini/Belize.svg", cities: ["Белиз Сити", "Сан-Игнасио", "Бельмопан", "Сан-Педро", "Коросаль", "Дангрига"]},
        {name: "Косово", flagPath: "img/flags/mini/Kosovo.svg", cities: ["Витина", "Вучитрн", "Глоговац", "Гнилане", "Дечани", "Джяковица"]}
    ]

    const eventMapPool = [
        "Anubis", "Mirage", "Overpass", "Nuke", "Vertigo", "Ancient", "Inferno"
    ]

    const genMinDate = () =>{
        const date = new Date();
        let day = date.getDate();
        day = day < 10 ? ("0" + day) : day;
  
        let month = date.getMonth() + 1;
        month = month < 10 ? ("0" + month) : month;
  
        return (day + "." + month + "." + date.getFullYear());
    }

    const teams = [
        {name: "Tamada", src: "img/players/Tamada.png", team: "Amfier", teamsrc: "img/teams_logo/Amfier.png", status: "", type: "player"},
        {name: "rusttle", src: "img/players/rusttle.png", team: "", teamsrc: "", status: "", type: "player"},
        {name: "Walhalla", src: "img/teams_logo/Walhalla.png", status: "", type: "team"}
    ]

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

    const toggleEndDate = () => { 
        setDateEndSelectorActive(!dateEndSelectorActive);
        setDateSelectorActive(false);
    };

    const toggleEvent = () => { 
        setEventSelectorActive(!eventSelectorActive)
    };

    const toggleFormat = () => {
        setFormatSelectorActive(!formatSelectorActive);
    }
  
    const toggleType = () => {
        setTypeSelectorActive(!typeSelectorActive);
    }

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

    const togglePrizePlace = (id) => { // функция toggle для селектора
        let temp = [];
        for(let i = 0; i < selectorActive.length; ++i){
          temp.push(false);
        }
        if(id !== "all"){
          temp[id] = !selectorActive[id];
        }
        setSelectorActive(temp);
    };

    const getElemByCountry = (country) => {
        for(let i = 0; i < countries.length; ++i){
            if(countries[i].name === country){
                return countries[i];
            }
        }
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
                  <div className="text_field_half_select" onClick={() => togglePrizePlace(i)}>
                    <p className={valueTeam[i] === "Выберите команду" ? "onStart" : "choosed"}>{valueTeam[i]}</p>
                    <img src="../img/arrow.svg" className={selectorActive[i] ? 'rotate' : null} alt="arrow"/>
                  </div>
                  <ul className={ selectorActive[i] ? 'select_list' : 'select_list hide'}>
                    {teams.map((team) =>
                      <li className={teamsActive[indexOf(team.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setTeamValue(i, team.name); setTeam(indexOf(team.name), valueTeam[i]); togglePrizePlace(i)}}>
                        <div className="list_logo">
                          <img src={"../" + team.src} alt={team.name}/>
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

    return(
        <div>
            <div className="events_header">
                <div className="row_center_5px">
                    <p>Текущие турниры</p>
                    {props.isAdmin ? <Editor size="15px" depth={1} onClick={() => setChooseOngoingEventActive(true)}/> : <></>}
                </div>
            </div>
            <div className="events_spacer">
                <div className="events_upcoming">
                    <OngoingEventsMaker events={props.ongoing}/>
                </div>
            </div>
            
            <div className="events_header">
                <div className="row_center_5px">
                    <p>Будущие турниры</p>
                    {props.isAdmin ? <Editor size="15px" depth={1} onClick={() => setEventChooserActive(true)}/> : <></>}
                </div>
            </div>
            <div className="events_spacer">
                {props.featured.map((month)=>
                    <div className="events_date_wrapper">
                        <div className="events_date"><p>{month.date}</p></div>
                        <div className="events_upcoming">
                            <OngoingEventsMaker events={month.events}/>
                        </div>
                    </div>
                )}
            </div>

            <Login active={eventChooserActive} setActive={setEventChooserActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Что Вы хотите сделать?</p>
                </div>
                <div className="buttons_wrapper">
                  <div className="dark_button">
                    <input type="submit" value="Изменить турнир" onClick={() => {setEventChooserActive(false); setChooseEventActive(true); setDateSelected("Выберите дату"); setEventSelected("Выберите турнир")}}/>
                  </div>
                  <div className="full_grey_button" style={{margin: 0}}>
                    <input type="submit" value="Создать турнир" onClick={() => {setEventChooserActive(false); setCreateEventActive(true)}}/>
                  </div>
                </div>
            </Login>

            <Login active={chooseEventActive} setActive={setChooseEventActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside">
                        <DateSelector toggleDate={toggleDate} dateSelected={dateSelected} valueDate={"Выберите дату"} dateSelectorActive={dateSelectorActive} setDate={setDateSelected} minDate={genMinDate()}/>
                        {dateSelected !== "Выберите дату" ?
                            <div className="text-field_selector">
                                <div className="text_field_select" onClick={() => toggleEvent()}>
                                    <p className={eventSelected === "Выберите турнир" ? "onStart" : "choosed"}>{eventSelected}</p>
                                    <img src="../img/arrow.svg" id="arrowIcon" className={eventSelectorActive ? 'rotate' : null} alt="arrow"/>
                                </div>
                                <ul className={ eventSelectorActive ? 'select_list_full' : 'select_list_full hide'} style={{width: "464px"}}>
                                {props.ongoing.map((ev) =>
                                    <li className='text_field_options' onClick={() => {setEventSelected(ev.event); toggleEvent()}} style={{width: "464px"}}>
                                    <div className="row_center_5px">
                                        <div className="list_logo">
                                            <img src={"../" + ev.eventSrc} alt={ev.series}/>
                                        </div>
                                        <p>{ev.event}</p>
                                    </div>
                                    </li>
                                )}
                                </ul>
                            </div>
                        :
                            <></>
                        }
                    </div>
                    {eventSelected !== "Выберите турнир" ?
                        <div className="full_grey_button">
                            <input type="submit" value="Подтвердить" onClick={() => {setEventEditorActive(true); setChooseEventActive(false); setValueStartDate("04.05.2023"); setValueEndDate("05.05.2023"); setDateSelected("04.05.2023"); setDateEndSelected("05.05.2023"); setValueCountry("Россия"); setCountrySelected("Россия"); setCitySelected("Пугачёв"); setValueCity("Пугачёв"); setValuePrize("20.000p"); setSelectedPrize("20.000p"); setValueFee("1.000p"); setSelectedFee("1.000p"); setSelectedFormat("5x5"); setValueFormat("5x5"); setSelectedType("Lan"); setValueType("Lan"); setValueDecription("Тут какое-то описание, туда-сюда"); setSelectedValueDecription("Тут какое-то описание, туда-сюда"); setSelectedName("Zasada Gamer League"); setValueName("Zasada Gamer League"); setSelectedMaxTeams("16"); setValueMaxTeams("16")}}/>
                        </div>
                    :
                        <></>
                    }
                </div>
            </Login>

            <Login active={eventEditorActive} setActive={setEventEditorActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside scroll" style={{gap: "30px"}}>
                        <div className="col_center_gap10">
                            <DateSelector toggleDate={toggleDate} dateSelected={dateSelected} valueDate={valueStartDate} dateSelectorActive={dateSelectorActive} setDate={setDateSelected} minDate={genMinDate()}/>
                            <DateSelector toggleDate={toggleEndDate} dateSelected={dateEndSelected} valueDate={valueEndDate} dateSelectorActive={dateEndSelectorActive} setDate={setDateEndSelected} minDate={genMinDate()}/>
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
                                        <p className={selectedFormat === valueFormat ? "onStart" : "choosed"}>{selectedFormat}</p>
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
                                        <p className={selectedType === valueType ? "onStart" : "choosed"}>{selectedType}</p>
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
                            <div className="description_field">
                                <textarea type="text" placeholder="Введите формат игр/описание" style={{width: "434px", color: selectedValueDecription === valueDecription ? "var(--white70)" : "white", fontSize: "16px", height: "65px"}} onChange={e => {setSelectedValueDecription(e.target.value)}}>{selectedValueDecription}</textarea>
                            </div>
                            <div className="row_center_6">
                                <div className="text-field_half">
                                    <div className="text-field_half_selector">
                                        <label for="file-input">
                                            <div className="text_field_half_select">
                                                <p className={selectedPath === valuePath ? "onStart" : "choosed"}>{selectedPath}</p>
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
                                                <p className={selectedPath === valuePath ? "onStart" : "choosed"}>{selectedPath}</p>
                                                <img src="../img/Add.svg" alt="Add" style={{width: "15px"}}/>
                                            </div>
                                        </label>
                                        <input id="file-input" type="file" style={{all: "unset", width: "0px", height: "0px"}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row_center_6">
                                <div className="text-field_half">
                                    <input className="text-field_half input" style={{color: selectedName === valueName ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedName} placeholder="Укажите название" onChange={e => {setSelectedName(e.target.value)}}/>
                                </div>
                                <div className="text-field_half">
                                    <input className="text-field_half input" style={{color: selectedMaxTeams === valueMaxTeams ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedMaxTeams} placeholder="Укажите макс. команд" onChange={e => {setSelectedMaxTeams(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className="col_center_gap10">
                            <div className="info_text" style={{padding: "0px"}}>
                                <p>Пул карт</p>
                            </div>
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
                        <div className="col_center_gap10">
                            <div className="info_text" style={{padding: "0px"}}>
                                <p>Призовые места</p>
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
                    </div>
                    <div className="col_center_gap_20">
                        <div className="full_grey_button">
                            <input type="submit" value="Подтвердить" onClick={() => eventEditorActive ? setEventEditorActive(false) : null}/>
                        </div>
                        <div className="red_button">
                            <input type="submit" value="Удалить матч" onClick={() => {setEventEditorActive(false); setDeleteEventActive(true)}}/>
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

            <Login active={createEventActive} setActive={setCreateEventActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside scroll" style={{gap: "30px"}}>
                        <div className="col_center_gap10">
                            <DateSelector toggleDate={toggleDate} dateSelected={dateSelected} valueDate={valueStartDate} dateSelectorActive={dateSelectorActive} setDate={setDateSelected} minDate={genMinDate()}/>
                            <DateSelector toggleDate={toggleEndDate} dateSelected={dateEndSelected} valueDate={valueEndDate} dateSelectorActive={dateEndSelectorActive} setDate={setDateEndSelected} minDate={genMinDate()}/>
                            <div className="row_center_6" style={{alignItems: "flex-start", width: "464px", zIndex: 2}}>
                                <div className="text-field_half">
                                    <div className="text-field_half_selector">
                                        <div className="text_field_half_select" onClick={() => toggleCountry()}>
                                            <p className={countrySelected === "Выберите страну" ? "onStart" : "choosed"}>{countrySelected}</p>
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
                                                <p className={citySelected === "Выберите город" ? "onStart" : "choosed"}>{citySelected}</p>
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
                                    <input className="text-field_half input" style={{color: selectedPrize === "Укажите приз" ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedPrize} placeholder="Укажите приз" onChange={e => {setSelectedPrize(e.target.value)}}/>
                                </div>
                                <div className="text-field_half">
                                    <input className="text-field_half input" style={{color: selectedFee === "Укажите взнос" ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedFee} placeholder="Укажите взнос" onChange={e => {setSelectedFee(e.target.value)}}/>
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
                            <div className="description_field">
                                <textarea type="text" placeholder="Введите формат игр/описание" style={{width: "434px", color: selectedValueDecription === "Введите формат игр/описание" ? "var(--white70)" : "white", fontSize: "16px", height: "65px"}} onChange={e => {setSelectedValueDecription(e.target.value)}}>{selectedValueDecription}</textarea>
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
                            <div className="row_center_6">
                                <div className="text-field_half">
                                    <input className="text-field_half input" style={{color: selectedName === "Укажите название" ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedName} placeholder="Укажите название" onChange={e => {setSelectedName(e.target.value)}}/>
                                </div>
                                <div className="text-field_half">
                                    <input className="text-field_half input" style={{color: selectedMaxTeams === "Укажите макс. команд" ? "var(--white70)" : "white"}} type="text" name="prize" value={selectedMaxTeams} placeholder="Укажите макс. команд" onChange={e => {setSelectedMaxTeams(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className="col_center_gap10">
                            <div className="info_text" style={{padding: "0px"}}>
                                <p>Пул карт</p>
                            </div>
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
                        <div className="col_center_gap10">
                            <div className="info_text" style={{padding: "0px"}}>
                                <p>Призовые места</p>
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
                    </div>
                    <div className="col_center_gap_20">
                        <div className="full_grey_button">
                            <input type="submit" value="Подтвердить" onClick={() => createEventActive ? setCreateEventActive(false) : null}/>
                        </div>
                        <div className="green_button">
                            <input type="submit" value="Создать матч" onClick={() => createEventActive ? setCreateEventActive(false) : null}/>
                        </div>
                    </div>
                </div>
            </Login>

            <Login active={chooseOngoingEventActive} setActive={setChooseOngoingEventActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="text-field_selector" style={{zIndex: 2}}>
                        <div className="text_field_select" onClick={() => toggleEvent()}>
                            <p className={eventSelected === "Выберите турнир" ? "onStart" : "choosed"}>{eventSelected}</p>
                            <img src="../img/arrow.svg" id="arrowIcon" className={eventSelectorActive ? 'rotate' : null} alt="arrow"/>
                        </div>
                        <ul className={ eventSelectorActive ? 'select_list_full' : 'select_list_full hide'} style={{width: "464px"}}>
                            {props.ongoing.map((ev) =>
                                <li className='text_field_options' onClick={() => {setEventSelected(ev.event); toggleEvent()}} style={{width: "464px"}}>
                                    <div className="row_center_5px">
                                        <div className="list_logo">
                                            <img src={"../" + ev.eventSrc} alt={ev.series}/>
                                        </div>
                                        <p>{ev.event}</p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>

                    {eventSelected !== "Выберите турнир" ?
                        <div className="full_grey_button">
                            <input type="submit" value="Подтвердить" onClick={() => {setEditOngoingEventActive(true); setChooseOngoingEventActive(false); setValuePrize("20.000p"); setSelectedPrize("20.000p"); setSelectedName("Zasada Gamer League"); setValueName("Zasada Gamer League");}}/>
                        </div>
                    :
                        <></>
                    }
                </div>
            </Login>

            <Login active={editOngoingEventActive} setActive={setEditOngoingEventActive}>
                <div className="header_splash_window">
                    <div className="logo_splash_window"></div>
                </div>
                <div className="info_text">
                    <p>Укажите информацию о турнире</p>
                </div>
                <div className="col_center_gap30">
                    <div className="inside scroll" style={{gap: "30px"}}>
                        <div className="col_center_gap10">
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
                                                <p className={selectedPath === "Выберите путь до файла" ? "onStart" : "choosed"}>{selectedPath}</p>
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
                                                <p className={selectedPath === "Выберите путь до файла" ? "onStart" : "choosed"}>{selectedPath}</p>
                                                <img src="../img/Add.svg" alt="Add" style={{width: "15px"}}/>
                                            </div>
                                        </label>
                                        <input id="file-input" type="file" style={{all: "unset", width: "0px", height: "0px"}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-field">
                                <input className="text-field_input" type="text" style={{color: selectedDiskLink === valueDiskLink ? "var(--white70)" : "white"}} name="diskLink" placeholder="Ссылка на диск с фото" value={selectedDiskLink} onChange={e => {setSelectedDiskLink(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="col_center_gap10">
                            <div className="info_text" style={{padding: "0px"}}>
                                <p>Призовые места</p>
                            </div>
                            {generateSelectors()}
                        </div>
                    </div>
                    <div className="col_center_gap_20">
                        <div className="full_grey_button">
                            <input type="submit" value="Подтвердить" onClick={() => editOngoingEventActive ? setEditOngoingEventActive(false) : null}/>
                        </div>
                        <div className="red_button">
                            <input type="submit" value="Удалить матч" onClick={() => {setEditOngoingEventActive(false); setDeleteEventActive(true)}}/>
                        </div>
                    </div>
                </div>
            </Login>
        </div>
    );
}

export default OngoingEvents;