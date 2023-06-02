import React from "react";
import TimePicker from "../TimePicker/TimePicker";
import DateSelector from "./DateSelector";
import "../../Matches/Matches.css";
import { request } from "../MyAxios/MyAxios";

function SetMatchInfo(props) {
    const toggleDate = props.toggleDate;
    const dateSelected = props.dateSelected;
    const valueDate = props.valueDate;
    const dateSelectorActive = props.dateSelectorActive;
    const setDateSelected = props.setDateSelected;
    const timeSelected = props.timeSelected;
    const valueTime = props.valueTime;
    const timeSelectorActive = props.timeSelectorActive;
    const setTimeSelected = props.setTimeSelected;
    const toggleTime = props.toggleTime;
    const eventSelected = props.eventSelected;
    const valueEvent = props.valueEvent;
    const eventSelectorActive = props.eventSelectorActive;
    const setEventSelected = props.setEventSelected;
    const toggleEvent = props.toggleEvent;
    const selectedLeftTeam = props.selectedLeftTeam;
    const valueLeftTeam = props.valueLeftTeam;
    const leftTeamSelectorActive = props.leftTeamSelectorActive;
    const toggleLeftTeam = props.toggleLeftTeam;
    const setSelectedLeftTeam = props.setSelectedLeftTeam;
    const setTeam = props.setTeam;
    const selectedRightTeam = props.selectedRightTeam;
    const valueRightTeam = props.valueRightTeam;
    const rightTeamSelectorActive = props.rightTeamSelectorActive;
    const toggleRightTeam = props.toggleRightTeam;
    const setSelectedRightTeam = props.setSelectedRightTeam;
    const setMatchEditorActive = props.setMatchEditorActive;
    const setDeleteMatchActive = props.setDeleteMatchActive;
    const teamsActive = props.teamsActive;
    const indexOf = props.indexOf;
    const teams = props.teams;
    const allEvents = props.allEvents;

    function onAccept(){

        if (dateSelected !== valueDate || timeSelected !== valueTime || eventSelected !== valueEvent || selectedLeftTeam !== valueLeftTeam || selectedRightTeam !== valueRightTeam){
            request("POST", "editMatchInfo/" + valueEvent + "/" + props.matchId, 
            {
                date: dateSelected,
                time: timeSelected,
                event: eventSelected,
                nameFirst: selectedLeftTeam,
                nameSecond: selectedRightTeam
            }).then((resp) => {
                console.log(resp.data);
            });
        }

        setMatchEditorActive(false);
    }

    return(
        <div>
            <div className="header_splash_window">
                <div className="logo_splash_window"></div>
            </div>
            <div className="info_text">
                <p>Укажите информацию о матче</p>
            </div>
            <div className="col_center_gap30">
                <div className="col_center_gap10">
                    <DateSelector toggleDate={toggleDate} dateSelected={dateSelected} valueDate={valueDate} dateSelectorActive={dateSelectorActive} setDate={setDateSelected} minDate={valueDate} maxDate={new Date()}/>
                    <div className="row_center_6" style={{zIndex: 2}}>
                        <div className="text-field_half">
                            <div className="text-field_half_selector">
                                <div className="text_field_half_select" onClick={() => toggleTime()}>
                                    <p className={timeSelected === valueTime ? "onStart" : "choosed"}>{timeSelected}</p>
                                    <img src="../../img/arrow.svg" id="arrowIcon" className={timeSelectorActive ? 'rotate' : null} alt="arrow"/>
                                </div>
                                <ul className={ timeSelectorActive ? 'time_list' : 'time_list hide'}>
                                    <TimePicker setTime={setTimeSelected} minTime={valueTime}/>
                                </ul>
                            </div>
                        </div>
                        <div className="text-field_half">
                            <div className="text-field_half_selector">
                                <div className="text_field_half_select" onClick={() => toggleEvent()}>
                                    <p className={eventSelected === valueEvent ? "onStart" : "choosed"}>{eventSelected}</p>
                                    <img src="../../img/arrow.svg" id="arrowIcon" className={eventSelectorActive ? 'rotate' : null} alt="arrow"/>
                                </div>
                                <ul className={ eventSelectorActive ? 'select_list' : 'select_list hide'}>
                                {allEvents.map((ev) =>
                                    <li className='text_field_half_options' onClick={() => {setEventSelected(ev.event); toggleEvent()}}>
                                    <div className="list_logo">
                                        <img src={"../../" + ev.eventSrc} alt={ev.series}/>
                                    </div>
                                    <p>{ev.event}</p>
                                    </li>
                                )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row_center_6" style={{zIndex: 1}}>
                        <div className="text-field_half">
                        <div className="text-field_half_selector">
                            <div className="text_field_half_select" onClick={() => toggleLeftTeam()}>
                            <p className={selectedLeftTeam === valueLeftTeam ? "onStart" : "choosed"}>{selectedLeftTeam}</p>
                            <img src="../../img/arrow.svg" className={leftTeamSelectorActive ? 'rotate' : null} alt="arrow"/>
                            </div>
                            <ul className={ leftTeamSelectorActive ? 'select_list' : 'select_list hide'}>
                            {teams.map((team) =>
                                <li className={teamsActive[indexOf(team.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setSelectedLeftTeam(team.name); setTeam(indexOf(team.name), selectedLeftTeam); toggleLeftTeam()}}>
                                <div className="list_logo">
                                    <img src={"../../" + team.logo} alt={team.name}/>
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
                            <p className={selectedRightTeam === valueRightTeam ? "onStart" : "choosed"}>{selectedRightTeam}</p>
                            <img src="../../img/arrow.svg" className={rightTeamSelectorActive ? 'rotate' : null} alt="arrow"/>
                            </div>
                            <ul className={ rightTeamSelectorActive ? 'select_list' : 'select_list hide'}>
                            {teams.map((team) =>
                                <li className={teamsActive[indexOf(team.name)] ? "text_field_half_options non_selectable" : "text_field_half_options"} onClick={()=>{setSelectedRightTeam(team.name); setTeam(indexOf(team.name), selectedRightTeam); toggleRightTeam()}}>
                                <div className="list_logo">
                                    <img src={"../../" + team.logo} alt={team.name}/>
                                </div>
                                <p>{team.name}</p>
                                </li>
                            )}
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col_center_gap_20">
                    <div className="full_grey_button">
                        <input type="submit" value="Подтвердить" onClick={() => {onAccept()}}/>
                    </div>
                    <div className="red_button">
                        <input type="submit" value="Удалить матч" onClick={() => {setMatchEditorActive(false); setDeleteMatchActive(true)}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetMatchInfo;