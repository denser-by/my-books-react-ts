import React from 'react';
import './multilineinfo.css';

type MultilineInfoProps = {
    text: string;
};

function MultilineInfo({ text }: MultilineInfoProps) {

    const listItems = text.split("\n");

    return (
        <ul className='textList'>
            {
                listItems.map((item, idx) => {
                    return (
                        <li className='multyInfoItem' key={'listItemKey' + idx}>{item}</li>
                    );
                })
            }
        </ul>
    );
}

export default MultilineInfo;