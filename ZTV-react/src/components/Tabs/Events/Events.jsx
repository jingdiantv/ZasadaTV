import React, { useState } from "react";
import {NavLink} from 'react-router-dom';
import Ended from "./Ended";
import Ongoing from "./Ongoing";
import "./Events.css"

function Events(props) {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => { // функция toggle для табов
      setToggleState(index);
    };

    const buttonText = props.type === "team" ? "Все турниры команды" : "Все турниры игрока";
    const link = props.type === "team" ? ("/team_events/" + props.param) : ("/player_events/" + props.param);

    return(
        <div className="tabcontent_tournaments">
          <div className="sub_tabs">
            <div className="sub_tabs_button_wrapper">
                <button className={toggleState === 1 ? "active_tab" : "tab"}
                onClick={() => toggleTab(1)}>Ближайшие и текущие</button>
            </div>
            <div className="sub_tabs_button_wrapper">
              <button className={toggleState === 2 ? "active_tab" : "tab"}
                onClick={() => toggleTab(2)}>Завершённые</button>
            </div>
          </div>
          <div className={toggleState === 1 ? "content active_content" : "content"}>
            <div className="tournaments_wrapper">
              {props.ongoing !== null ?
                props.ongoing.map((ev) =>
                  <Ongoing event={ev}/>
                )
              :
                <></>
              }
            </div>
          </div>
          <div className={toggleState === 2 ? "content active_content" : "content"}>
            <div className="tournaments_wrapper">
              {props.ended !== null ?
                props.ended.map((ev) =>
                  <Ended event={ev}/>
                )
              :
                <></>
              }
            </div>
            <div className="full_grey_button_gap15">
              <NavLink to={link} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
                  <input type="submit" id="loginsubmit" value={buttonText}/>
              </NavLink>
            </div>
          </div>
        </div>
    );
}

export default Events;