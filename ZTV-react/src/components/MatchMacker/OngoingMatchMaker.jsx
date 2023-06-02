import React from "react";
import "../../Matches/Matches.css";
import "../Tabs/Match/Match.css"
import "../ResultMaker/ResultMaker.css"
import { Link } from "react-router-dom";
import { matchUrlMaker } from "../Helper/Helper";

function OngoingMatchMaker(props){
    const setTier = (tier, tierSrc) =>{
        let content = [];
        for(let i = 0; i < 5; ++i){
            if (i < tier){
                content.push(
                    <img src={"../" + tierSrc} alt="star"/>
                );
            }
            else{
                content.push(
                    <img src={"../" + tierSrc} style={{opacity: 0.3}} alt="faded_star"/>
                );
            }
        }
        return content;
    }

    return(
        <div className="col_center_gap10">
            <div className="results_date"><p>Матчи {props.date}</p></div>
            {props.matches.map((match) =>
                <Link to={"/match/" + matchUrlMaker(match.leftTeam, match.rightTeam, match.event, props.date)} style={{textDecoration: "none"}}>
                    <div className="match_frame">
                        <div className="status_match_wrapper">
                            <div className="ongoing"><p>{match.time}</p></div>
                            <div className="matches_frame">
                                <div className="match_team">
                                    <div className="left_team_tag"><p>{match.leftTeam}</p></div>
                                    <img src={"../" + match.leftTeamSrc} alt={match.leftTeam}/>
                                </div>
                                <div className="match_score">
                                </div>
                                <div className="match_team">
                                    <img src={"../" + match.rightTeamSrc} alt={match.rightTeam}/>
                                    <div className="right_team_tag"><p>{match.rightTeam}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="row_center_gap3">
                            <div className="tournament_logo">
                                <img src={"../" + match.eventSrc} alt={match.series}/>
                            </div>
                            <div className="event">
                                <p>{match.event}</p>
                            </div>
                        </div>
                        <div className="match_tier">
                            <div className="row_center_gap3">
                                {setTier(match.tier, match.tierSrc)}
                            </div>
                            <p>{match.map}</p>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default OngoingMatchMaker;