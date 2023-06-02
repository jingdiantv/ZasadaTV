import React from "react";
import './TeamRow.css'

function TeamRow({team}){
    
    return(
        <div className="statistic_team_row">
            <div className="statistic_team_row_name">
                <img src={team.logo} style={{width: "23px", height: "23px", marginTop: "1px"}}></img>
                <p>{team.name}</p>
            </div>
            <div className="statistic_team_row_stats">
                <p>У-С</p>
                <p>+/-</p>
                <p>СУР</p>
                <p>У/С</p>
            </div>
        </div>
    )
}

export default TeamRow;