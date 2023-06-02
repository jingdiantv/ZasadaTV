import React from "react";
import "./Player.css"

function Player(props){
    return(
        <div className="player_top">
            <div className="players_background">
                <div className="crop">
                    <img src={props.photo} alt={props.nick} />
                </div>
            </div>
            <div className="nick">
                <img src={props.flagPath} alt={props.country} />
                <p>{props.nick}</p>
            </div>
        </div>
    )
}

export default Player;