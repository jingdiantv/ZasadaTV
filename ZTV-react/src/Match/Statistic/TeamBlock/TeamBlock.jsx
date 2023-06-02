import React from "react";
import './TeamBlock.css'
import PlayerRow from "./PlayerRow/PlayerRow";
import TeamRow from "./TeamRow/TeamRow";

function TeamBlock({team, players, map}){
    return(
        <div className="statistic_team_block">
            <TeamRow team={team}/>
            {players.players.map((item) => 
                <PlayerRow props={item} team={team}/>
            )}
            
        </div>
    )
}

export default TeamBlock;