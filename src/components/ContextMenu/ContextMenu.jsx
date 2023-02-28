import React, { useState } from 'react';
import './contextmenu.css'

const ContextMenu = ({ selectedItem, operations }) => {

    const [aboutSelect, setAboutSelect] = useState("")
    const [curSelect, setCurSelect] = useState("")

    function mouseOver(e) {
        setAboutSelect(e.target)
    }

    function mouseOut() {
        setAboutSelect("")
    }

    function mouseClick(e) {
        setCurSelect(e.target)
    }

    return (
        <span className="leftPanel">
            <ul>
                {operations.map(op =>
                    <li id={op.name} 
                        className={curSelect.id == op.name ? "contextOp selected" : (aboutSelect.id == op.name ? "contextOp above" : "contextOp")} 
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>{op.name}</li>
                )}
            </ul>
        </span>
    );
};

export default ContextMenu;