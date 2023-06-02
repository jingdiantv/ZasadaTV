import React, { useState } from "react";
import AchievmentsMaker from "./AchievmentsMaker";
import "./Achievments.css"
import "../Events/Events.css";

function Achievments(props) {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => { // функция toggle для табов
      setToggleState(index);
    };

    return(
        <div className="tabcontent_tournaments">
            <div className="sub_tabs">
            <div className="sub_tabs_button_wrapper">
                <button className={toggleState === 1 ? "active_tab" : "tab"}
                onClick={() => toggleTab(1)}>Lan</button>
            </div>
            <div className="sub_tabs_button_wrapper">
                <button className={toggleState === 2 ? "active_tab" : "tab"}
                onClick={() => toggleTab(2)}>Online</button>
            </div>
            </div>
            <div className={toggleState === 1 ? "content active_content" : "content"}>
                <div className="achievements_col">
                    {props.lan !== null ? <p>Место</p> : <></>}
                    {props.lan !== null ? <p>Турнир</p> : <></>}
                </div>
                <div className="tournaments_wrapper">
                    {props.lan !== null ?
                        props.lan.map((ev) =>
                            <AchievmentsMaker event={ev}/>
                        )
                    :
                        <></>
                    }
                </div>
            </div>
            <div className={toggleState === 2 ? "content active_content" : "content"}>
                <div className="achievements_col">
                    {props.online !== null ? <p>Место</p> : <></>}
                    {props.online !== null ? <p>Турнир</p> : <></>}
                </div>
                <div className="tournaments_wrapper">
                    {props.online !== null ?
                        props.online.map((ev) =>
                            <AchievmentsMaker event={ev}/>
                        )
                    :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default Achievments;