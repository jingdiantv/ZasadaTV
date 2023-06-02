import React from "react";
import "./Map.css"

function Map(props){
    const maps = ["Ancient", "Anubis", "Cache", "Cobblestone", "Dust", "Dust2", 
    "Inferno", "Mirage", "Nuke", "Overpass", "Train", "Vertigo"];

    const isFound = (inputMap) => {
        return maps.some(map => map === inputMap);
    }

    return(
            <img src= {"../../img/map_preview/" + (isFound(props.map) ? props.map : "TBA") + ".png"} alt={props.map}/>     
    );
}

export default Map;