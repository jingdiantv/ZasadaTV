import React from "react";
import './HalfMatchSideT.css'
import RoundIcon from "../RoundIcon/RoundIcon";

function HalfMatchSideT(){
    return(
        <div className="round_history_line_sideT">
        {/*1 раунд */}  <RoundIcon props={"BombExploded"}/>
                        <RoundIcon props={"SkullT"}/>
                        <RoundIcon />
                        <RoundIcon />
        {/*5 раунд */}  <RoundIcon />
                        <RoundIcon />
                        <RoundIcon />
                        <RoundIcon props={"BombExploded"}/>
                        <RoundIcon props={"SkullT"}/>
        {/*10 раунд */} <RoundIcon props={"SkullT"}/>
                        <RoundIcon props={"SkullT"}/>
                        <RoundIcon />
                        <RoundIcon />
                        <RoundIcon />
                        <RoundIcon />
        </div>    
    )
}

export default HalfMatchSideT;