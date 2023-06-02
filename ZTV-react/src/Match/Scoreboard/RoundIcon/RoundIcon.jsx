import React from "react";
import './RoundIcon.css'

function RoundIcon({props}){
    
    function resRound(props){
        return "/img/scoreboard/" + props + ".svg";
    }
    return(
        <div className="roundIcon" style={{opacity: props != null || props != undefined ? "1" : "0"}}>
            <img src={props != null ? resRound(props) : null}></img>
        </div>
    )
}

export default RoundIcon;