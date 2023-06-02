import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultMaker from "../components/ResultMaker/ResultMaker";
import { request } from "../components/MyAxios/MyAxios";
import { applHeaders, unFillSpaces } from "../components/Helper/Helper";
import "../Results/Results.css";

function TeamResults() {

    const [results, setResults] = useState(null);

    // const results = [
    //     {date: "15.03.2023", matches: [
    //         {series: "Zasada2", event: "Zasada Summer Cup Major", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Walhalla", rightTeam: "Amfier", rightTeamSrc: "img/teams_logo/Amfier.png", leftTeamSrc: "img/teams_logo/Walhalla.png", leftScore: 16, rightScore: 8, tier: 5, map: "nuke", tierSrc: "img/Top_star.svg"},
    //         {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftTeamSrc: "img/teams_logo/Amfier.png", leftScore: 9, rightScore: 16, tier: 0, map: "trn", tierSrc: "img/Top_star.svg"},
    //         {series: "Zasada2", event: "Zasada Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftTeamSrc: "img/teams_logo/Amfier.png", leftScore: 22, rightScore: 20, tier: 4, map: "cbble", tierSrc: "img/Top_star.svg"}
    //     ]},
    //     {date: "17.03.2023", matches: [
    //         {series: "Zasada2", event: "Zasada Summer Cup Major", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Walhalla", rightTeam: "Amfier", rightTeamSrc: "img/teams_logo/Amfier.png", leftTeamSrc: "img/teams_logo/Walhalla.png", leftScore: 16, rightScore: 8, tier: 5, map: "nuke", tierSrc: "img/Top_star.svg"},
    //         {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftTeamSrc: "img/teams_logo/Amfier.png", leftScore: 9, rightScore: 16, tier: 0, map: "trn", tierSrc: "img/Top_star.svg"},
    //         {series: "Zasada2", event: "Zasada Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftTeamSrc: "img/teams_logo/Amfier.png", leftScore: 22, rightScore: 20, tier: 4, map: "cbble", tierSrc: "img/Top_star.svg"}
    //     ]}
    // ]

    const params = useParams();

    function getResults(){
        request("GET", "/getTeamResults/" + params.id, {}, applHeaders).then((resp) =>{
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
                console.log(resp.data);
                setResults(resp.data);
            }
        });
    }

    useEffect(() => {
        getResults();
    }, []);
    
    return(
        <div>
            <div className="results_header"><p>{"Результаты команды " + unFillSpaces(params.id)}</p></div>
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

export default TeamResults;