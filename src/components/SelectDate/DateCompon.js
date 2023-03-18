import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './DateCompon.css'
import 'react-calendar/dist/Calendar.css';

function DateCompon({ dateSelected, onDateSelect, caption, datePick }) {

    return (
        <span className={(datePick ? "above" : "hidden") + " date-compon-dialog"}>
            <span className="date-compon-caption">
                {caption}
            </span>
            <Calendar onChange={onDateSelect} value={dateSelected} />
        </span>
    )
}

export default DateCompon;