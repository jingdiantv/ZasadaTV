import React from "react";
import { Link } from "react-router-dom";
import Player from "./Player/Player"
import { fillSpaces } from "../../../components/Helper/Helper";
import "./FirstTeam.css"
import "../../../components/ResultMaker/ResultMaker.css"

function FirstTeam(props){

  const color = props.changedPosition > 0 ? "green" : props.changedPosition < 0 ? "red" : "var(--base-08)";
  const posChanged = props.changedPosition > 0 ? ("+" + props.changedPosition) : props.changedPosition < 0 ? props.changedPosition : "-";

    return(
        <div>
          <div className="rectangle_50px_top" style={{cursor: "default", pointerEvents: "none"}}>
            <div className="row_center_6">
              <div className="rectangle_50px_top_text"><p>#{props.topPosition}</p></div>
              <div className="row_center_gap3">
                <div className="tournament_logo"><img src={props.logo} alt={props.name}/></div>
                <div className="rectangle_50px_top_text">
                  <p>{props.name}</p>
                </div>
              </div>
            </div>
            <div className="rectangle_50px_top_text"><p style={{color: color}}>{posChanged}</p></div>
          </div>
          <div className="top1_team_rectangle">
            <div className="row_left_gap20">
                {props.players.map((item) => 
                  <Link to={"/player/" + item.nick} style={{textDecoration: "none"}} >
                    <Player {...item} />
                  </Link>
                )}
            </div>
            <Link to={"/team/" + fillSpaces(props.name)}>Профиль команды</Link> 
          </div>
        </div>
    )
}

export default FirstTeam;