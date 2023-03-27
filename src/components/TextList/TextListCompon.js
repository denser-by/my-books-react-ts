import React, { useState, useEffect } from 'react';
import './TextListCompon.css'

export function TextListEditItem({ item, selectionsList, setSelectionsList, notifySelectUpdated, idx }) {

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
        if (notifySelectUpdated != null)
            notifySelectUpdated(newArr);
    };

    return (
        ("" + item).length > 0
            ?
            <span key={"textListItemKey_" + idx}
                className={"textListEditItem" + (stateActive ? " selected" : "")} onClick={(e) => onEditActivate({ item })}>{item}</span>
            :
            <span />
    );
};

export function TextListEdit({ text, className, notifySelectUpdated }) {

    var listItems = [].concat(text.split("\n")).filter(item => item.length > 0);

    const [selectionsList, setSelectionsList] = React.useState([]);

    return (
        <span className={className + ' mainWidth'}>
            <span className='textListEdit'>
                {
                    listItems.map((item, idx) => {
                        return (
                            <TextListEditItem item={item} selectionsList={selectionsList} setSelectionsList={setSelectionsList}
                                notifySelectUpdated={notifySelectUpdated} idx={idx} />
                        );
                    })
                }
            </span>
        </span>
    );
};

export function TextListView({ text, arIds, lnkPage, onClick }) {

    var listItems = [].concat(text.split("\n")).filter(item => item.length > 0);

    return (
        <ul className='textList'>
            {
                listItems.map((item, idx) => {
                    const link = lnkPage + arIds[idx];
                    return (
                        <li className='textListItem' key={'listItemKey' + idx}>{idx + 1})&nbsp;<strong id={link} onClick={onClick}>{item}</strong></li>
                    );
                })
            }
        </ul>
    );
}