import React from "react";
import "./PlayerRow.css";

function PlayerRow({props, team}){
    function teamColor(side){
        if (side == "ct")
            return "rgba(28, 188, 255, 0.4)";
        else return "rgba(244, 78, 28, 0.4)";
    }
    function weaponImg(weapon){
        return "/img/scrollLog/weapons/" + weapon + ".svg"
    }
    function armorImg(armor){
         return "/img/scrollLog/accessories/"+ armor + ".svg"
    }
    function hp_bar_color(hp){
        if (hp <= 100 && hp >= 40) return "var(--hp-high)";
        else {
            if(hp <= 39 && hp >= 21) return "var(--hp-medium)";
            else {
                if(hp <= 20 && hp >= 1) return "var(--hp-low)";
            }
        }
    }
    function hp_bar_width(hp){
        return hp*40/100;
    }
    return(
        <div className="player_row" style={{background: teamColor(team.side), opacity: props.hp==0 ? "0.4" : "1"}}>
            <div className="player_row_nick"><p>{props.nick}</p></div>
            <img className="defuse_kit" src={(props.defusekit && team.side=="ct") ? "/img/scrollLog/accessories/Defusekit.svg" : null} style={{opacity: props.hp==0 ? "0" : "1"}}/>
            <div className="weapon" style={{opacity: props.hp==0 ? "0" : "1"}}>
                <img src={weaponImg(props.weapon)} />
            </div>
            <div className="HP_block">
                <div className="HP" style={{width: hp_bar_width(props.hp)+"px", background: hp_bar_color(props.hp)}}></div>
                <p>{props.hp}</p>
            </div>
            <img className="armor" src={armorImg(props.armor)} style={{opacity: (props.hp==0 || props.armor == null)? "0" : "1"}}/>
            <div className="player_money">
                <p>${props.money}</p>
            </div>
            <div className="player_stats">
                <div className="player_kills">
                    <p>{props.kills}</p>
                </div>
                <div className="player_assists">
                    <p>{props.assists}</p>
                </div>
                <div className="player_deaths">
                    <p>{props.deaths}</p>
                </div>
                <div className="player_cyp">
                    <p>{props.cyp}</p>
                </div>
            </div>
        </div>
    )
}

export default PlayerRow;