import React from "react";
import FlagName from "../../components/FlagName/FlagName"
import "./Streams.css"

function Streams(props){
    return (
    <div className="stream">
        <FlagName flagPath={props.flagPath} country={props.country} name={props.name} height="15px"/>
        {/* <div className="inline_block">
            <img src={props.flagPath} className="stream_country" />
            <p>{props.name}</p>
        </div> */}
        <div className="stream_viewers">
            <p>{props.viewers}</p>
            <a href={props.link}></a>
        </div>
    </div>
    )
    
}

export default Streams;