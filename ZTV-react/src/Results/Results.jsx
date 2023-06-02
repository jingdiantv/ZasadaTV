import React from "react";
import ResultMaker from "../components/ResultMaker/ResultMaker";
import "./Results.css";

function Results() {

    const results = [
        {date: "15.03.2023", matches: [
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Walhalla", leftTeamSrc: "img/teams_logo/Walhalla.png", rightTeam: "Amfier", rightTeamSrc: "img/teams_logo/Amfier.png", leftScore: 16, rightScore: 8, tier: 5, tierSrc: "img/Top_star.svg", map: "nuke"},
            {series: "BLAST", event: "BLAST Summer Cup", eventSrc: "img/event_logo/BLAST.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftScore: 9, rightScore: 16, tier: 0, tierSrc: "img/Top_star.svg", map: "trn"},
            {series: "Zasada2", event: "Zasada Summer Cup by Tamada", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftScore: 22, rightScore: 20, tier: 4, tierSrc: "img/Top_star.svg", map: "cbble"}
        ]},
        {date: "17.03.2023", matches: [
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftScore: 16, rightScore: 8, tier: 1, tierSrc: "img/Top_star.svg", map: "dust 2"},
            {series: "BLAST", event: "BLAST Cup", eventSrc: "img/event_logo/BLAST.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftScore: 9, rightScore: 16, tier: 3, tierSrc: "img/Top_star.svg", map: "anb"},
            {series: "Zasada2", event: "Zasada Summer Cup", eventSrc: "img/event_logo/Zasada2.svg", leftTeam: "Amfier", leftTeamSrc: "img/teams_logo/Amfier.png", rightTeam: "Walhalla", rightTeamSrc: "img/teams_logo/Walhalla.png", leftScore: 2, rightScore: 0, tier: 4, tierSrc: "img/Top_star.svg", map: "bo3"}
        ]}
    ]

    return(
        <div>
            <div className="results_header"><p>Результаты</p></div>
            <div className="results">
                {results.map((day) =>
                    <ResultMaker day={day}/>
                )}
            </div>
        </div>
    );
}

export default Results;