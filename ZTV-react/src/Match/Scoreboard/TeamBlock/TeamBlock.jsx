import React from "react";
import "./TeamBlock.css"
import TeamRow from "./TeamRow/TeamRow";
import PlayerRow from "./PlayerRow/PlayerRow";

function TeamBlock({team,map}){
    
    return(
        <div className="team_block" >
            <TeamRow team={team}/>
            {team.players.map((item) => 
                <PlayerRow props={item} team={team}/>
            )}
            
        </div>
    )
}

export default TeamBlock;