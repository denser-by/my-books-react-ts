import React, { useState } from 'react';
import './contextmenu.css'

const ContextMenu = ({ operations, setPageRef }) => {
    const [above, setAbove] = useState("");
    const [curSelect, setCurSelect] = useState("");

    function mouseOver(e) {
        setAbove(e.target);
    }

    function mouseOut() {
        setAbove("");
    }

    function mouseClick(e) {
        setCurSelect(e.target);
        setPageRef(e.target.id);
    }

    return (
        <span className="leftPanel">
            <ul>
                {operations.map(op =>
                    <li key={op.key} id={op.href}
                        className={above.id == op.href ? "contextOp above" : (curSelect.id == op.href ? "contextOp selected" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>{op.name}
                    </li>
                )}
            </ul>
        </span>
    );
};

export default ContextMenu;