import React, { useState } from 'react';
import './contextmenu.css'

const ContextMenu = ({ selectedItem, operations }) => {

    const [aboutSelect, setAboutSelect] = useState("")

    function mouseOver(e) {
        setAboutSelect(e.target)
    }

    function mouseOut() {
        setAboutSelect("")
    }

    return (
        <span className="leftPanel">
            <ul>
                {operations.map(op =>
                    <li id={op.name} className={aboutSelect.id == op.name ? "contextOp above" : "contextOp"} onMouseOver={mouseOver} onMouseOut={mouseOut}>{op.name}</li>
                )}
            </ul>
        </span>
    );
};

export default ContextMenu;