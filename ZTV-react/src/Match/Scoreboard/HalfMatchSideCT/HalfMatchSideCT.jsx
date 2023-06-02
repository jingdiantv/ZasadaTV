import React from "react";
import './HalfMatchSideCT.css'
import RoundIcon from "../RoundIcon/RoundIcon";

function HalfMatchSideCT(){
    return(
        <div className="round_history_line_sideCT">
        {/*1 раунд */}  <RoundIcon />
                        <RoundIcon />
                        <RoundIcon props={"BombDefused"}/>
                        <RoundIcon props={"SkullCT"}/>
        {/*5 раунд */}  <RoundIcon props={"SkullCT"}/>
                        <RoundIcon props={"Timer"}/>
                        <RoundIcon props={"Timer"}/>
                        <RoundIcon />
                        <RoundIcon />
        {/*10 раунд */} <RoundIcon />
                        <RoundIcon />
                        <RoundIcon props={"SkullCT"}/>
                        <RoundIcon props={"SkullCT"}/>
                        <RoundIcon props={"Timer"}/>
                        <RoundIcon props={"BombDefused"}/>
        </div>    
    )
}

export default HalfMatchSideCT;