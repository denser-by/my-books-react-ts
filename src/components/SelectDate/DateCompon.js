import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './DateCompon.css'
import 'react-calendar/dist/Calendar.css';

export function YearCompon({ dateSelected, onDateSelect, caption, datePick, setDatePick, notifyYearChosen }) {

    const [clickNum, setClickNum] = React.useState(0);
    const [clickStory, setClickStory] = React.useState([]);

    const clickProc = (e) => {
        if (notifyYearChosen != null && ('' + notifyYearChosen).length > 0 && e != null && e != undefined) {
            let story = clickStory;
            let idx = clickNum + 1;
            story[idx] = e;
            setClickNum(idx);
            setClickStory(story);
        }
    };

    useEffect(() => {
        if (notifyYearChosen != null && ('' + notifyYearChosen).length > 0 && clickNum > 0) {
            const story = clickStory;
            const selYear = '' + new Date(story[clickNum]).getFullYear();
            notifyYearChosen(selYear);
        }
    }, [clickNum]);

    return (
        <span className={(datePick ? "above" : "hidden") + " date-compon-dialog"}>
            <span className="date-compon-caption">
                <span className="cap-text">{caption}</span><span className="cap-exit" onClick={() => { setDatePick(false); }}>X</span>
            </span>
            <Calendar
                defaultView='decade'
                maxDetail='decade'
                minDetail='year'
                onClickWeekNumber={clickProc}
                onClickYear={clickProc}
                onClickMonth={clickProc}
                onClickDecade={clickProc}
                onClickDay={clickProc}
                onChange={onDateSelect} value={dateSelected} />
        </span>
    )
}

export function MonthCompon({ dateSelected, onDateSelect, caption, datePick, setDatePick, notifyMonthChosen }) {

    const [clickNum, setClickNum] = React.useState(0);
    const [clickStory, setClickStory] = React.useState([]);

    const clickProc = (e) => {
        if (notifyMonthChosen != null && ('' + notifyMonthChosen).length > 0 && e != null && e != undefined) {
            let story = clickStory;
            let idx = clickNum + 1;
            story[idx] = e;
            setClickNum(idx);
            setClickStory(story);
        }
    };

    useEffect(() => {
        if (notifyMonthChosen != null && ('' + notifyMonthChosen).length > 0 && clickNum > 0) {
            const story = clickStory;
            const selMonthNumber = '' + (new Date(story[clickNum]).getMonth() + 1);
            notifyMonthChosen(selMonthNumber);
        }
    }, [clickNum]);

    return (
        <span className={(datePick ? "above" : "hidden") + " date-compon-dialog"}>
            <span className="date-compon-caption">
                <span className="cap-text">{caption}</span><span className="cap-exit" onClick={() => { setDatePick(false); }}>X</span>
            </span>
            <Calendar
                defaultView='year'
                maxDetail='year'
                minDetail='month'
                onClickWeekNumber={clickProc}
                onClickYear={clickProc}
                onClickMonth={clickProc}
                onClickDecade={clickProc}
                onClickDay={clickProc}
                onChange={onDateSelect} value={dateSelected} />
        </span>
    )
}

function DateCompon({ dateSelected, onDateSelect, caption, datePick, setDatePick }) {

    return (
        <span className={(datePick ? "above" : "hidden") + " date-compon-dialog"}>
            <span className="date-compon-caption">
                <span className="cap-text">{caption}</span><span className="cap-exit" onClick={() => { setDatePick(false); }}>X</span>
            </span>
            <Calendar onChange={onDateSelect} value={dateSelected} />
        </span>
    )
}

export default DateCompon;