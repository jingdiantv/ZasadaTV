import React from "react";
import { useState } from "react";
import "./TimePicker.css";

function TimePicker(props) {

    const [selectedHour, setSelectedHour] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');

    const [selectorHourActive, setSelectorHourActive] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]); // состояния селектора
    const [selectorMinuteActive, setSelectorMinuteActive] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]); // состояния селектора

    const minTime = props.minTime;
    let minHour = parseInt(minTime.substring(0, 2));
    let minMinute = parseInt(minTime.substring(3, 5));

    const handleData = (event) => {
        if(event.target.id === "hour"){
            const hour = event.target.getAttribute("data-hour");

            let temp = [...selectorHourActive];

            if(hour >= minHour){

                if(selectedHour !== ""){
                    temp[parseInt(selectedHour)] = !temp[parseInt(selectedHour)];
                }
                temp[parseInt(hour)] = !temp[parseInt(hour)];

                setSelectorHourActive(temp);
                setSelectedHour(hour);

                if(selectedMinute === ""){
                    minMinute = minMinute < 10 ? ("0" + minMinute) : minMinute;
                    props.setTime(hour + ":" + minMinute);
                } else{
                    props.setTime(hour + ":" + selectedMinute);
                }
            }

        } else if(event.target.id === "minute"){
            const minute = event.target.getAttribute("data-minute");

            let temp = [...selectorMinuteActive];

            if(minute >= minMinute){

                if(selectedMinute !== ""){
                    temp[parseInt(selectedMinute)] = !temp[parseInt(selectedMinute)];
                }
                temp[parseInt(minute)] = !temp[parseInt(minute)];

                setSelectorMinuteActive(temp);
                setSelectedMinute(minute);

                if(selectedHour === ""){
                    minHour = minHour < 10 ? ("0" + minHour) : minHour;
                    props.setTime(minHour + ":" + minute);
                } else {
                    props.setTime(selectedHour + ":" + minute);
                }
            }
        }
    }

    const hoursGenerator = () =>{
        let hours = [];
        for(let i = 0; i < 24; ++i){
            const hour = i < 10 ? ("0" + i) : i;

            hours.push(
                <li className={i >= minHour ? (selectorHourActive[i] ? "select_time_options time_selected" : "select_time_options") : "select_time_options non_selectable"} onClick={handleData}>
                    <p id="hour" data-hour={hour}>{hour}</p>
                </li>
            );
        }
        return hours;
    }

    const minutesGenerator = () =>{
        let minutes = [];
        for(let i = 0; i < 60; ++i){
            let min = i < 10 ? ("0" + i) : i;

            minutes.push(
                <li className={i >= minMinute ? (selectorMinuteActive[i] ? "select_time_options time_selected" : "select_time_options") : "select_time_options non_selectable"} onClick={handleData}>
                    <p id="minute" data-minute={min}>{min}</p>
                </li>
            );
        }
        return minutes;
    }

    return (
        <div className="display_inline">
            <ul className="select_time">
                {hoursGenerator()}
            </ul>
            <ul className="select_time">
                {minutesGenerator()}
            </ul>
        </div>
    );
}

export default TimePicker;
