import React from "react";
import { useState } from "react";
import "./DatePicker.css";

function DatePicker(props) {
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", 
    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const [curMonth, setCurMonth] = useState(new Date().getMonth());
    const [curYear, setCurYear] = useState(new Date().getFullYear());


    const minDate = props.minDate;
    const maxDate = props.maxDate;

    const [selectedDate, setSelectedDate] = useState(null);

    const getNumberOfDaysInMonth = (year, month) =>{
        return new Date(year, month + 1, 0).getDate();
    }

    const getSortedDays = (year, month) =>{
        const dayIndex = new Date(year, month, 0).getDay();
        const firstHalf = dayNames.slice(dayIndex);
        return [...firstHalf, ...dayNames.slice(0, dayIndex)];
    }

    const range = (start, end) =>{
        const len = Math.abs((end - start) / 1);
        const { result } = Array.from({length: len}).reduce(
            ({ result, current }) => ({
                result: [...result, current],
                current: current + 1,
            }),
            { result: [], current: start }
        );

        return result;
    }

    const nextMonth = () =>{
        if(curMonth < 11) {
            setCurMonth(prev => prev + 1);
        } else {
            setCurMonth(0);
            setCurYear(prev => prev + 1);
        }
    }
    
    const nextYear = () => { 
        setCurYear(prev => prev + 1);
    }

    const prevMonth = () =>{
        if(curMonth > 0) {
            setCurMonth(prev => prev - 1);
        } else {
            setCurMonth(11);
            setCurYear(prev => prev - 1);
        }
    }

    const prevYear = () =>{
        setCurYear(prev => prev - 1);
    }

    const selectionHandler = (event) => {
        if (event.target.id === "day"){
            setSelectedDate(new Date(curYear, curMonth, event.target.getAttribute("data-day")))
        }
    }

    const getTimeFromState = (year, day) => {
        return new Date(year, curMonth, day).getTime();
    }

    const checkMinMaxDate = (day) => {
        return selectedDate?.getTime() === getTimeFromState(curYear, day) && minDate <= getTimeFromState(curYear, day + 1) && maxDate >= getTimeFromState(curYear, day + 1);
    }

    const setDate = () => {
        // СДЕЛАТЬ ПРОВЕРКУ НА МИНИМАЛЬНУЮ ДАТУ - ДАТУ МАТЧА НЫНЕШНЕГО
        let day = selectedDate.getDate();
        day = day < 10 ? "0" + day : day;

        let month = selectedDate.getMonth() + 1;
        month = month < 10 ? "0" + month : month;

        const date = day + "." + month + "." + selectedDate.getFullYear();
        
        props.setDate(date);
    }

    return (
        <div className="picker_wrapper">
            <div className="picker_header">
                <button onClick={prevYear} disabled={minDate ? minDate > getTimeFromState(curYear - 1, 31) : null}>
                    <img src="../../img/leftArrow.svg" alt="prev year"/>
                </button>
                <button onClick={prevMonth} disabled={minDate ? minDate > getTimeFromState(curYear, 1) : null}>
                    <img src="../../img/leftArrow.svg" alt="prev month"/>
                </button>
                
                <p>{monthNames[curMonth]} {curYear}</p>
                <button onClick={nextMonth} disabled={maxDate ? maxDate < getTimeFromState(curYear, 31) : null}>
                    <img src="../../img/rightArrow.svg" alt="next month"/>
                </button>
                <button onClick={nextYear} disabled={maxDate ? maxDate < getTimeFromState(curYear + 1, 1) : null}>
                    <img src="../../img/rightArrow.svg" alt="next year"/>
                </button>
            </div>
            <div className="picker_body">
                <div className="seven_col_grid">
                    {getSortedDays(curYear, curMonth).map((day) => 
                        <span>{day}</span>
                    )}
                </div>
                <div className="seven_col_grid" onClick={selectionHandler}>
                    {range(1, getNumberOfDaysInMonth(curYear, curMonth) + 1).map((day) =>
                        <p id="day" data-day={day} className={checkMinMaxDate(day) ? "date_selected" : ""}
                        onClick={checkMinMaxDate(day) ? setDate() : null}>
                            {day}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DatePicker;