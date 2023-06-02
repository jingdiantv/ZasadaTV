import React from "react";

import TeamBlock from "./TeamBlock/TeamBlock";
import HalfMatchSideCT from "./HalfMatchSideCT/HalfMatchSideCT";
import HalfMatchSideT from "./HalfMatchSideT/HalfMatchSideT";
import "./Scoreboard.css"

function Scoreboard({props, map}){
    const firstTeam = {
        name: props.NameFirst,
        side: props.SideFirst,
        logo: props.LogoFirst,
        players: [
            {nick: "Frost", defusekit: true, weapon: "M4A4", hp: 100, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
            {nick: "X_UndeR", defusekit: true, weapon: "USP-S", hp: 50, armor: "Assaultsuit", money: 3021, kills: 7, assists: 1, deaths: 0, cyp: 12.2},
            {nick: "игрок3", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
            {nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 15, assists: 0, deaths: 10, cyp: 3},
            {nick: "игрок5", defusekit: false, weapon: "AWP", hp: 3, armor: null, money: 0, kills: 0, assists: 0, deaths: 99, cyp: 2}
        ]
    }
    const secondTeam = {
        name: props.NameSecond,
        side: props.SideSecond,
        logo: props.LogoSecond,
        players: [
            {nick: "Tamada", defusekit: false, weapon: "AWP", hp: 100, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
            {nick: "ugly4", defusekit: false, weapon: "AK-47", hp: 34, armor: "Assaultsuit", money: 3021, kills: 7, assists: 1, deaths: 0, cyp: 12.2},
            {nick: "muzyr", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
            {nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 15, assists: 0, deaths: 10, cyp: 3},
            {nick: "s1mple", defusekit: false, weapon: "AWP", hp: 63, armor: null, money: 0, kills: 0, assists: 0, deaths: 99, cyp: 2}
        ]
    }
    return(
        <div className="scoreboard" style={{backgroundImage: "url(../../img/maps/scoreboard/"+ map.mapName +".png)"}}>
            <div className="scoreboard_score_block">
                <div className="scoreboard_score">
                    <div className="t_score">{props.SideFirst == "t" ? map.scoreFirst : map.scoreSecond}</div>
                    <p>:</p>
                    <div className="ct_score">{props.SideFirst == "t" ? map.scoreSecond : map.scoreFirst}</div>
                    
                </div>
            </div> 

            <div className="round">
                Round: 26 - {map.mapName}
            </div>
            <div style={{display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "0px",
                        gap: "10px",
                        position: "absolute",
                        width: "630px",
                        height: "416px",
                        left: "9px",
                        top: "49px",
                        }}>
                <TeamBlock team={firstTeam} map={map}/>
                
                <div className="rounds_history">
                        <div className="rounds_first_half">
                            <HalfMatchSideCT />
                            <HalfMatchSideT />
                        </div>
                        <div className="rounds_second_half">
                            <HalfMatchSideCT />
                            <HalfMatchSideT />
                        </div>
                </div>
                <TeamBlock team={secondTeam} map={map}/>
            </div>
        </div>
    )
}

export default Scoreboard;