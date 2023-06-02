import React from "react";
import ResultMaker from "../../ResultMaker/ResultMaker";
import './EventResults.css';
import "../../../Results/Results.css";

function EventResults(props) {

    return(
        <div>  
            <div className="spacer"></div>
            <div className="results">
                {props.results.map((day) =>
                    <ResultMaker day={day}/>
                )}
            </div>
        </div>
    );
}

export default EventResults;