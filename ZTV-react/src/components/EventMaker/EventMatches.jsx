import React from "react";
import "../../Matches/Matches.css";
import CurrentMatchMaker from "../MatchMacker/CurrentMatchMaker";
import OngoingMatchMaker from "../MatchMacker/OngoingMatchMaker";

function EventMatches(props) {
    return(
        <div>
        <div className="matches_header"><p>Текущие матчи</p></div>
            <div className="matches">
                <div className="col_center_gap10">
                    {props.current_matches.map((match) =>
                        <CurrentMatchMaker {...match}/>
                    )}
                </div>
            </div>

            <div className="matches_header"><p>Ближайшие матчи</p></div>
            <div className="matches">
                {props.ongoing_matches.map((day) =>
                    <OngoingMatchMaker {...day}/>
                )}
            </div>
        </div>
    );
}

export default EventMatches;