import React, { useState, useEffect } from 'react';
import './TextListCompon.css'

export function TextListEdit({ text, className }) {

    var listItems = [].concat(text.split("\n"));

    return (
        <span className={className + ' mainWidth'}>
            <span className='textListEdit'>
                {
                    listItems.map(item => {
                        return (
                            ("" + item).length > 0
                                ?
                                <span className='textListEditItem'>{item}</span>
                                :
                                <span />
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