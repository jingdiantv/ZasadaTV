import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { applHeaders } from "../components/Helper/Helper";
import { request } from "../components/MyAxios/MyAxios";
import AttendedEvents from "../components/AttendedEvents/AttendedEvents";
import "../components/AttendedEvents/AttendedEvents.css";

function PlayerEvents() {

    const params = useParams();

    const [events, setEvents] = useState(null); 

    function getEvents(){
        request("GET", "/getPlayerAttendedEvents/" + params.id, {}, applHeaders).then((resp) =>{
            for (let i = 0; i < resp.data.length; ++i){
                let event = resp.data[i];
                request("GET", "/getImage/" + event["event"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                    event["logo"] = URL.createObjectURL(response.data);
                });
                request("GET", "/getImage/" + event["team"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                    event["teamSrc"] = URL.createObjectURL(response.data);
                });
                resp.data[i] = event;
            }
            setEvents(resp.data);
        });
    }

    useEffect(() => {
        getEvents();
    }, []);

    return(
        <div>
            <div className="results_header"><p>Посещённые турниры</p></div>
            <div className="events_col">
                {events !== null ? <div className="events_col_date"><p>Место</p></div> : <></>}
                {events !== null ? <div className="events_col_event"><p>Турнир</p></div> : <></>}
                {events !== null ? <div className="events_col_team"><p>Команда</p></div> : <></>}
            </div>
            <div className="events">
                {events !== null ?
                    events.map((ev) =>
                        <AttendedEvents event={ev}/>
                    )
                :
                    <></>
                }
            </div>
        </div>
    );
}

export default PlayerEvents;