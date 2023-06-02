import React from "react";
import {Routes, Route, NavLink, Navigate} from 'react-router-dom'
import EndedEvents from "./EndedEvents/EndedEvents";
import OngoingEvents from "./OngoingEvents/OngoingEvents";
import './Tournaments.css'

function Tournaments() {
    const isAdmin = true;

    const ongoing_events = [
        {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", eventSrc:"img/event_logo/Zasada2.svg", event: "Zasada Super Cup", flagPath: "img/flags/mini/Russia.svg", country: "Россия", city: "Пугачёв", date: "3.05.23 - 4.05.23", format: "2x2", type: "Online", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
        {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", eventSrc:"img/event_logo/Zasada2.svg", event: "Zasada Cup", flagPath: "img/flags/mini/Albania.svg", country: "Албания", city: "", date: "3.05.23 - 4.05.23", format: "2x2", type: "Lan", registred: 0, total: 16, fee: "500p", prize: "2.000p"},
        {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", eventSrc:"img/event_logo/Zasada2.svg", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
        {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", eventSrc:"img/event_logo/Zasada2.svg", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
    ]

    const featured_events = [
        {date: "Апрель 2023", events:[
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Super Cup", flagPath: "img/flags/mini/Russia.svg", country: "Россия", city: "Пугачёв", date: "3.05.23 - 4.05.23", format: "2x2", type: "Online", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Cup", flagPath: "img/flags/mini/Albania.svg", country: "Албания", city: "", date: "3.05.23 - 4.05.23", format: "2x2", type: "Lan", registred: 0, total: 16, fee: "500p", prize: "2.000p"},
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"}
        ]},

        {date: "Март 2023", events:[
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Super Cup", flagPath: "img/flags/mini/Russia.svg", country: "Россия", city: "Пугачёв", date: "3.05.23 - 4.05.23", format: "2x2", type: "Online", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Cup", flagPath: "img/flags/mini/Albania.svg", country: "Албания", city: "", date: "3.05.23 - 4.05.23", format: "2x2", type: "Lan", registred: 0, total: 16, fee: "500p", prize: "2.000p"},
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {headerSrc: "img/event_logo/IEMHeader.png", series: "IEM", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"}
        ]},
    ]

    const ended_events = [
        {date: "Апрель 2023", events:[
            {src: "img/event_logo/Zasada2.svg", series: "Zasada", event: "Zasada Super Cup", flagPath: "img/flags/mini/Russia.svg", country: "Россия", city: "Пугачёв", date: "3.05.23 - 4.05.23", format: "2x2", type: "Online", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {src: "img/event_logo/BLAST.svg", series: "BLAST", event: "BLAST Cup", flagPath: "img/flags/mini/Albania.svg", country: "Албания", city: "", date: "3.05.23 - 4.05.23", format: "2x2", type: "Lan", registred: 0, total: 16, fee: "500p", prize: "2.000p"},
            {src: "img/event_logo/Zasada2.svg", series: "Zasada", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {src: "img/event_logo/Zasada2.svg", series: "Zasada", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"}
        ]},
        {date: "Март 2023", events:[
            {src: "img/event_logo/Zasada2.svg", series: "Zasada", event: "Zasada Super Cup", flagPath: "img/flags/mini/Russia.svg", country: "Россия", city: "Пугачёв", date: "3.05.23 - 4.05.23", format: "2x2", type: "Online", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {src: "img/event_logo/BLAST.svg", series: "BLAST", event: "BLAST Cup", flagPath: "img/flags/mini/Albania.svg", country: "Албания", city: "", date: "3.05.23 - 4.05.23", format: "2x2", type: "Lan", registred: 0, total: 16, fee: "500p", prize: "2.000p"},
            {src: "img/event_logo/Zasada2.svg", series: "Zasada", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "3.05 - 4.05", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"},
            {src: "img/event_logo/Zasada2.svg", series: "Zasada", event: "Zasada Super Cup", flagPath: "img/flags/mini/Spain.svg", country: "Испания", city: "Мадрид", date: "08.09 - 18.09", format: "5x5", type: "Lan", registred: 3, total: 16, fee: "22.000p", prize: "1.000.000p"}
        ]}
    ]

    return(
        <div>
            <ul className="tab_wrapper">
                <li className="tab_button">
                    <NavLink to="ongoing" style={({ isActive }) => ({  // если активна, то текст белый
                        color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                        Текущие и будущие
                    </NavLink>
                </li>
                <li className="tab_link">
                    <NavLink to="ended" style={({ isActive }) => ({  // если активна, то текст белый
                        color: isActive ? 'var(--text-01)' : 'var(--text-02)'})}>
                        Прошедшие
                    </NavLink>
                </li>
            </ul>
            <Routes>
                <Route index element={<Navigate replace to="/tournaments/ongoing" />}/>
                <Route path="ongoing" element={<OngoingEvents ongoing={ongoing_events} featured={featured_events} isAdmin={isAdmin}/>}/>
                <Route path="ended" element={<EndedEvents ended={ended_events}/>}/>
            </Routes>
        </div>
    );
}

export default Tournaments;