import React from "react";
import "./TeamRow.css"

function TeamRow({team}){
    function teamColor(side){
        if (side == "ct")
            return "rgba(28, 188, 255, 0.7)";
        else return "rgba(244, 78, 28, 0.7)";
    }
    return(
        <div className="team_row" style={{background: teamColor(team.side)}}>
            <div className="team_row_name">
                <img src={team.logo} style={{width: "23px", height: "23px", marginTop: "1px"}}></img>
                <p>{team.name}</p>
            </div>
            <div className="states">
                <img src="/img/scrollLog/accessories/Cart.svg"></img>
                <img src="/img/scrollLog/accessories/HP.svg"></img>
                <img src="/img/scrollLog/accessories/Assaultsuit.svg"></img>
                <div className="money">$</div>
            </div>
            <div className="kda_block">
                <div className="kda">
                    <p>У</p>
                    <p>П</p>
                    <p>С</p>
                </div>
                <div className="cyp">
                    <p>СУР</p>
                </div>
            </div>
        </div>
    )
}

export default TeamRow;