import React from "react";
import "../../Matches/Matches.css";
import "../Tabs/Match/Match.css"
import "../ResultMaker/ResultMaker.css"
import { Link } from "react-router-dom";
import { matchUrlMaker } from "../Helper/Helper";

function CurrentMatchMaker(props){
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

    const leftUpperColor = props.rightUpperScore < props.leftUpperScore ? "var(--base-11)" : props.rightUpperScore > props.leftUpperScore ? "red" : "white";
    const rightUpperColor = props.leftUpperScore < props.rightUpperScore ? "var(--base-11)" : props.leftUpperScore > props.rightUpperScore ? "red" : "white";
    const leftSubColor = props.rightSubScore < props.leftSubScore ? "var(--base-11)" : props.rightSubScore > props.leftSubScore ? "red" : "var(--white40)";
    const rightSubColor = props.leftSubScore < props.rightSubScore ? "var(--base-11)" : props.leftSubScore > props.rightSubScore ? "red" : "var(--white40)";

    const leftSubOpacity = leftSubColor === "var(--white40)" ? 1 : 0.9;
    const rightSubOpacity = rightSubColor === "var(--white40)" ? 1 : 0.9;

    return(
        <Link to={"/match/" + matchUrlMaker(props.leftTeam, props.rightTeam, props.event, props.date)} style={{textDecoration: "none"}}>
            <div className="match_frame">
            <div className="status_match_wrapper">
                <div className="live"><p>LIVE</p></div>
                <div className="matches_frame">
                    <div className="row_center_gap3">
                        <div className="left_team_tag"><p>{props.leftTeam}</p></div>
                        <img src={"../" + props.leftTeamSrc} alt={props.leftTeam}/>
                    </div>
                    <div className="match_score">
                        <div className="upper_score">
                            <div className="left_upper_score"><p style={{color: leftUpperColor}}>{props.leftUpperScore}</p></div>
                            <p>:</p>
                            <div className="right_upper_score"><p style={{color: rightUpperColor}}>{props.rightUpperScore}</p></div>
                        </div>
                        <div className="sub_score">
                            <div className="left_sub_score"><p>(<span style={{color: leftSubColor, opacity: leftSubOpacity}}>{props.leftSubScore}</span>)</p></div>
                            <div className="right_sub_score"><p>(<span style={{color: rightSubColor, opacity: rightSubOpacity}}>{props.rightSubScore}</span>)</p></div>
                        </div>
                    </div>
                    <div className="row_center_gap3">
                        <img src={"../" + props.rightTeamSrc} alt={props.rightTeam}/>
                        <div className="right_team_tag"><p>{props.rightTeam}</p></div>
                    </div>
                </div>
            </div>
            <div className="row_center_gap3">
                <div className="tournament_logo">
                    <img src={"../" + props.eventSrc} alt={props.series}/>
                </div>
                <div className="event">
                    <p>{props.event}</p>
                </div>
            </div>
            <div className="match_tier">
                <div className="row_center_gap3">
                    {setTier(props.tier, props.tierSrc)}
                </div>
                <p>{props.map}</p>
            </div>
            </div>
        </Link>
        
    );
}

export default CurrentMatchMaker;