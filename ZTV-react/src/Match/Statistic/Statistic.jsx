import React from "react";
import "./Statistic.css"
import TeamBlock from "./TeamBlock/TeamBlock";
import { useState } from "react";

function Statistic({props,map}){
    const firstTeam = {
        name: props.NameFirst,
        side: props.SideFirst,
        logo: props.LogoFirst,
        maps: [
            {players: [
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "Frost", defusekit: true, weapon: "M4A4", hp: 100, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "X_UndeR", defusekit: true, weapon: "USP-S", hp: 50, armor: "Assaultsuit", money: 3021, kills: 7, assists: 1, deaths: 0, cyp: 12.2},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок3", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 15, assists: 0, deaths: 10, cyp: 3},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок5", defusekit: false, weapon: "AWP", hp: 3, armor: null, money: 0, kills: 0, assists: 0, deaths: 99, cyp: 2}
            ]},
            {players: [
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "Frost", defusekit: true, weapon: "M4A4", hp: 100, armor: "Kevlar", money: 666, kills: 3, assists: 411, deaths: 21, cyp: 121},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "X_UndeR", defusekit: true, weapon: "USP-S", hp: 50, armor: "Assaultsuit", money: 3021, kills: 13, assists: 90, deaths: 111, cyp: 32},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок3", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 54, assists: 33, deaths: 23, cyp: 10.121},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 115, assists: 11, deaths: 108, cyp: 3},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок5", defusekit: false, weapon: "AWP", hp: 3, armor: null, money: 0, kills: 0, assists: 0, deaths: 99, cyp: 2}
            ]},
            {players: [
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "Frost", defusekit: true, weapon: "M4A4", hp: 100, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "X_UndeR", defusekit: true, weapon: "USP-S", hp: 50, armor: "Assaultsuit", money: 3021, kills: 7, assists: 1, deaths: 0, cyp: 12.2},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок3", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 15, assists: 0, deaths: 10, cyp: 3},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок5", defusekit: false, weapon: "AWP", hp: 3, armor: null, money: 0, kills: 43, assists: 21, deaths: 99, cyp: 505}
            ]}
        ]
        
    }
    const secondTeam = {
        name: props.NameSecond,
        side: props.SideSecond,
        logo: props.LogoSecond,
        maps: [
            {players: [
                {country: "Russia", firstName: "Кирилл", lastName: "Симовин", nick: "Tamada", defusekit: false, weapon: "AWP", hp: 100, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Александр", lastName: "Федякин", nick: "ugly4", defusekit: false, weapon: "AK-47", hp: 34, armor: "Assaultsuit", money: 3021, kills: 7, assists: 1, deaths: 0, cyp: 12.2},
                {country: "Russia", firstName: "Иван", lastName: "Музырев", nick: "muzyr", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 15, assists: 0, deaths: 10, cyp: 3},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "s1mple", defusekit: false, weapon: "AWP", hp: 63, armor: null, money: 0, kills: 0, assists: 0, deaths: 99, cyp: 2}
            ]},
            {players: [
                {country: "Russia", firstName: "Кирилл", lastName: "Симовин", nick: "Tamada", defusekit: false, weapon: "AWP", hp: 100, armor: "Kevlar", money: 666, kills: 234, assists: 234, deaths: 12, cyp: 432},
                {country: "Russia", firstName: "Александр", lastName: "Федякин", nick: "ugly4", defusekit: false, weapon: "AK-47", hp: 34, armor: "Assaultsuit", money: 3021, kills: 432, assists: 543, deaths: 12, cyp: 2.2},
                {country: "Russia", firstName: "Иван", lastName: "Музырев", nick: "muzyr", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 65, assists: 9, deaths: 34, cyp: 22},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 54, assists: 4, deaths: 88, cyp: 3.44},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "s1mple", defusekit: false, weapon: "AWP", hp: 63, armor: null, money: 0, kills: 1, assists: 5, deaths: 34, cyp: 2}
            ]},
            {players: [
                {country: "Russia", firstName: "Кирилл", lastName: "Симовин", nick: "Tamada", defusekit: false, weapon: "AWP", hp: 100, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Александр", lastName: "Федякин", nick: "ugly4", defusekit: false, weapon: "AK-47", hp: 34, armor: "Assaultsuit", money: 3021, kills: 7, assists: 1, deaths: 0, cyp: 12.2},
                {country: "Russia", firstName: "Иван", lastName: "Музырев", nick: "muzyr", defusekit: false, weapon: "AWP", hp: 0, armor: "Kevlar", money: 666, kills: 10, assists: 2, deaths: 3, cyp: 32},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "игрок4", defusekit: false, weapon: "Five-Seven", hp: 14, armor: "Kevlar", money: 1002, kills: 15, assists: 0, deaths: 10, cyp: 3},
                {country: "Russia", firstName: "Имя", lastName: "Фамилия", nick: "s1mple", defusekit: false, weapon: "AWP", hp: 63, armor: null, money: 0, kills: 0, assists: 0, deaths: 99, cyp: 2}
            ]}
        ]
        
    }
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => { // функция toggle для табов
      setToggleState(index);
    };
    return(
        <div className="statistic">
            <div className="statistic_maps">
                <div className="tab_map">
                    <button className={toggleState === 1 ? "active_tab" : "tab"}
                    onClick={() => toggleTab(1)}>Все карты</button>
                </div>
                <div className="tab_map">
                    <button className={toggleState === 2 ? "active_tab" : "tab"}
                    onClick={() => toggleTab(2)}>Overpass</button>
                </div>
                <div className="tab_map">
                    <button className={toggleState === 3 ? "active_tab" : "tab"}
                    onClick={() => toggleTab(3)}>Anubis</button>
                </div>
            </div>
            <div className={toggleState === 1 ? "statictic_content active_statictic_content" : "statictic_content"}>
                <TeamBlock team={firstTeam} players={firstTeam.maps[0]} map={map}/>
                <TeamBlock team={secondTeam} players={secondTeam.maps[0]} map={map}/>
            </div>
            <div className={toggleState === 2 ? "statictic_content active_statictic_content" : "statictic_content"}>
                <TeamBlock team={firstTeam} players={firstTeam.maps[1]} map={map}/>
                <TeamBlock team={secondTeam} players={secondTeam.maps[1]} map={map}/>
            </div>
            <div className={toggleState === 3 ? "statictic_content active_statictic_content" : "statictic_content"}>
                <TeamBlock team={firstTeam} players={firstTeam.maps[2]} map={map}/>
                <TeamBlock team={secondTeam} players={secondTeam.maps[2]} map={map}/>
            </div>
        </div>
    )
}

export default Statistic;