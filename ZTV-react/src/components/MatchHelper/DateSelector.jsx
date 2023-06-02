import React from "react";
import DatePicker from "../DatePicker/DatePicker";

function DateSelector(props) {
    const toggleDate = props.toggleDate;
    const dateSelected = props.dateSelected;
    const valueDate = props.valueDate;
    const dateSelectorActive = props.dateSelectorActive;
    const setDate = props.setDate;
    const minDate = props.minDate;
    const maxDate = props.maxDate;

    return(
        <div className="text-field_selector">
            <div className="text_field_select" onClick={() => toggleDate()}>
                <p className={dateSelected === valueDate ? "onStart" : "choosed"}>{dateSelected}</p>
                <img src="../../img/arrow.svg" className={dateSelectorActive ? 'rotate' : null} alt="arrow"/>
            </div>
            <ul className={ dateSelectorActive ? 'select_date' : 'select_date hide'}>
                <li className="date_options" key="datePicker">
                    <DatePicker setDate={setDate} minDate={minDate} maxDate={maxDate}/>
                </li>
            </ul>
        </div>
    );
}

export default DateSelector;