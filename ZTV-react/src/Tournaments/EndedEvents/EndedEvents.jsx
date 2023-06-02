import React from "react";
import EndedEventsMaker from "../../components/EventMaker/EndedEventsMaker/EndedEventsMaker";
import './EndedEvents.css';
import "../OngoingEvents/OngoingEvents.css";

function EndedEvents(props) {


    return(
        <div className="events_past">
            {props.ended.map((month) =>
                <div className="events_date_wrapper">
                    <div className="events_date"><p>{month.date}</p></div>
                    <EndedEventsMaker events={month.events}/>
                </div>
            )}
        </div>
    );
}

export default EndedEvents;