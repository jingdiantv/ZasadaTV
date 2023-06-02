import React from "react";
import { Link } from "react-router-dom";
import { fillSpaces } from "../../../../../Helper/Helper";
import "./PlayerTrophies.css"

function PlayerTrophies(props){
    return (
        <div className="player_trophies_container">
            <div id="player_trophies">
                {props.items.trophies.map((item) => 
                    <Link to={"/event/" + fillSpaces(item.alt)} style={{textDecoration: "none"}}>
                        <img key={item.alt} src={item.src} alt={item.alt}/>
                    </Link>
                )}
            </div>
        </div>
    );
}
export default PlayerTrophies;