import React from "react";
import { Link } from "react-router-dom";
import { fillSpaces } from "../Helper/Helper";
import "./Trophies.css"

function Trophies(props){
    return (
        <div className="trophies_container">
            <div id="trophies">
                {props.items !== null ?
                props.items.map((item) => 
                    <Link to={"/event/" + fillSpaces(item.alt)} style={{textDecoration: "none"}}>
                        <img key={item.alt} src={item.src} alt={item.alt}/>
                    </Link>
                )
                :
                    <></>
                }
            </div>
        </div>
    );
}
export default Trophies;
