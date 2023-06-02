import React from "react";
import { NavLink } from "react-router-dom";
import FlagName from "../../FlagName/FlagName";
import { fillSpaces } from "../../Helper/Helper";
import './OngoingEventsMaker.css'

function OngoingEventsMaker(props) {
    const getname = (type, country, city) =>{
        if(type === "Lan"){
            if(city === ""){
                return country;
            }
            return city;
        }
        return country;
    }

    const getEventName = (event, type) =>{
        if(type === "Lan"){
            return event;
        }
        return event + " (" + type +")"
    }


    return(
        <div className="events_block">
            {props.events.map((event)=>
            <NavLink to={"/event/" + fillSpaces(event.event)} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
                <div>
                    <div className="event_img_header">
                        <div className="crop_event"><img src={"../" + event.headerSrc} alt={event.series}/></div>
                    </div>
                    <div className="event_desc">
                        <div className="info_loc_wrapper">
                            <p>{getEventName(event.event, event.type)}</p>
                            <div className="event_sub_info">
                                <FlagName flagPath={event.flagPath} country={event.country} name={getname(event.type, event.country, event.city)} height="10px"/>
                                <p>|</p>
                                <p>{event.date}</p>
                                <p>|</p>
                                <p>{event.format}</p>
                            </div>
                        </div>
                        <div className="dev_line"></div>
                        <div className="main_event_info">
                            <div className="main_event_info_wrapper">
                                <p>{event.registred}/{event.total}</p>
                                <div className="main_sub_info"><p>Команд</p></div>
                            </div>
                            <div className="main_event_info_wrapper">
                                <p>{event.prize}</p>
                                <div className="main_sub_info"><p>Приз</p></div>
                            </div>
                                <div className="main_event_info_wrapper">
                                <p>{event.fee}</p>
                                <div className="main_sub_info"><p>Взнос</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>    
            )}
        </div>
    );
}

export default OngoingEventsMaker;