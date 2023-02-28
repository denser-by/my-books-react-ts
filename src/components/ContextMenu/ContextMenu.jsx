import React, { useState } from 'react';
import './contextmenu.css'

const ContextMenu = ({ selectedItem, operations, pageRef, setPageRef }) => {

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
        setPageRef(e.target.id)
    }

    return (
        <span className="leftPanel">
            <ul>
                {operations.map(op =>
                    <li id={op.href}
                        className={curSelect.id == op.href ? "contextOp selected" : (aboutSelect.id == op.name ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>{op.name}</li>
                )}
            </ul>
        </span>
    );
};

export default ContextMenu;