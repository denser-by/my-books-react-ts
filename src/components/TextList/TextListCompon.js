import React, { useState, useEffect } from 'react';
import './TextListCompon.css'

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