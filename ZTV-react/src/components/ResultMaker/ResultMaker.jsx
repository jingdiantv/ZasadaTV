import React from "react";
import { Link } from "react-router-dom";
import { matchUrlMaker } from "../Helper/Helper";
import "../Tabs/Match/Match.css";
import "./ResultMaker.css";

function ResultMaker(props) {
    const setTier = (tier, tierSrc) =>{
        let content = [];
        for(let i = 0; i < 5; ++i){
            if (i < tier){
                content.push(
                    <img src={tierSrc} alt="star"/>
                );
            }
            else{
                content.push(
                    <img src={tierSrc} style={{opacity: 0.3}} alt="faded_star"/>
                );
            }
        }
        return content;
    }
    
    return(
        <div className="col_center_gap10">
            <div className="results_date"><p>{"Результаты за " + props.day.date}</p></div>
            {props.day.matches.map((match) =>
                <Link to={"/match/" + matchUrlMaker(match.matchId, match.leftTeam, match.rightTeam, match.event, props.day.date)} style={{textDecoration: "none"}}>
                    <div className="match_rect_full">
                        <div className="match">

                            <div className="match_team" style={{opacity: match.leftScore < match.rightScore ? 0.3 : 1}}>
                                <div className="left_team_tag"><p>{match.leftTag}</p></div>
                                <img src={match.leftTeamSrc} alt={match.leftTeam}/>
                            </div>

                            <div className="row_center_gap3">
                                <div className="left_team_score"><p style={{opacity: match.leftScore < match.rightScore ? 0.3 : 1, color: match.rightScore < match.leftScore ? "green" : "white"}}>{match.leftScore}</p></div>
                                <p>:</p>
                                <div className="right_team_score"><p style={{opacity: match.rightScore < match.leftScore ? 0.3 : 1, color: match.leftScore < match.rightScore ? "green" : "white"}}>{match.rightScore}</p></div>
                            </div>

                            <div className="match_team" style={{opacity: match.rightScore < match.leftScore ? 0.3 : 1}}>
                                <img src={match.rightTeamSrc} alt={match.rightTeam}/>
                                <div className="right_team_tag"><p id="right_match_team">{match.rightTag}</p></div>
                            </div>
                        </div>
                        <div className="row_center_gap3">
                            <div className="tournament_logo"><img src={match.eventSrc} alt={match.event}/></div>
                            <div className="tournament_name"><p>{match.event}</p></div>
                        </div>
                        <div className="top_tier">
                            <div className="row_center_gap3">
                                {setTier(match.tier, match.tierSrc)}
                            </div>
                            {match.maps.length === 1 ? <p>{match.maps[0].mapName}</p> : <p>{"bo" + match.maps.length}</p>}
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default ResultMaker;
