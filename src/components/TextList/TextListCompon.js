import React, { useState, useEffect } from 'react';
import './TextListCompon.css'


export function TextListEditItem({ item, selectionsList, setSelectionsList }) {

    const [stateActive, setStateActive] = React.useState(false);

    const onEditActivate = (e) => {
        let current = "" + e.item;
        let newArr = [];
        if (stateActive) {
            selectionsList.map(item => {
                if (item != current)
                    newArr.push(item);
            });
        } else {
            newArr.push(current);
            newArr.push(...selectionsList);
        }
        setSelectionsList(newArr);
        setStateActive(!stateActive);
    };

    return (
        ("" + item).length > 0
            ?
            <span className={"textListEditItem" + (stateActive ? " selected" : "")} onClick={(e) => onEditActivate({ item })}>{item}</span>
            :
            <span />
    );
};

export function TextListEdit({ text, className }) {

    var listItems = [].concat(text.split("\n"));

    const [selectionsList, setSelectionsList] = React.useState([]);

    return (
        <span className={className + ' mainWidth'}>
            <span className='textListEdit'>
                {
                    listItems.map(item => {
                        return (
                            <TextListEditItem item={item} selectionsList={selectionsList} setSelectionsList={setSelectionsList} />
                        );
                    })
                }
            </span>
        </span>
    );
};

export function TextListView({ text }) {

    var listItems = [].concat(text.split("\n"));
    let idx = 1;

    return (
        <ul className='textList'>
            {
                listItems.map(item => {
                    return (
                        <li className='textListItem'>{idx++})&nbsp;<strong>{item}</strong></li>
                    );
                })
            }
        </ul>
    );
}