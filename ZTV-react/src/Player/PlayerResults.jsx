import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ResultMaker from "../components/ResultMaker/ResultMaker";
import { request } from "../components/MyAxios/MyAxios";
import { applHeaders } from "../components/Helper/Helper";
import "../Results/Results.css";

function PlayerResults() {

    const [results, setResults] = useState(null);

    const params = useParams();

    function getResults(){
        request("GET", "/getPlayerResults/" + params.id, {}, applHeaders).then((resp) =>{
            for (let i = 0; i < resp.data.length; ++i){
                let date = resp.data[i];

                for (let j = 0; j < date.matches.length; ++j){
                    let match = date.matches[j];
                    request("GET", "/getImage/" + match["leftTeam"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        match["leftTeamSrc"] = URL.createObjectURL(response.data);
                    });
                    request("GET", "/getImage/" + match["rightTeam"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        match["rightTeamSrc"] = URL.createObjectURL(response.data);
                    });
                    request("GET", "/getImage/" + match["event"] + "/test", {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                        match["eventSrc"] = URL.createObjectURL(response.data);
                    });
                    date.matches[j] = match;
                }
                resp.data[i] = date;
                setResults(resp.data);
            }
        });
    }

    useEffect(() => {
        getResults();
    }, []);

    return(
        <div>
            <div className="results_header"><p>{"Результаты игрока " + params.id}</p></div>
            <div className="results">
                {results !== null ?
                    results.map((day) =>
                        <ResultMaker day={day}/>
                    )
                :
                    <></>
                }
            </div>
        </div>
    );
}

export default PlayerResults;