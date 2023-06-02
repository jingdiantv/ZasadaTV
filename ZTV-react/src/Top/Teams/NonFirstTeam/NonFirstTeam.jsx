import React from "react";
import "./NonFirstTeam.css"
import "../../../components/ResultMaker/ResultMaker.css"

function NonFirstTeam(props){

    const color = props.changedPosition > 0 ? "green" : props.changedPosition < 0 ? "red" : "var(--base-08)";
    const posChanged = props.changedPosition > 0 ? ("+" + props.changedPosition) : props.changedPosition < 0 ? props.changedPosition : "-";

    return(
        <div className="rectangle_50px_top">
          <div className="row_center_6">
            <div className="rectangle_50px_top_text"><p>#{props.topPosition}</p></div>
            <div className="row_center_gap3">
            <div className="tournament_logo"><img src={props.logo} alt={props.name}/></div>
              <div className="col_right_gap3">
                <div className="rectangle_50px_top_text"><p>{props.name}</p></div>
                <div className="row_center_6">
                  {props.players.map((item) => 
                    <div className="rectangle_50px_top_nick">
                      <p>{item.nick}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="rectangle_50px_top_text"><p style={{color: color}}>{posChanged}</p></div>
        </div>
    )
}

export default NonFirstTeam;