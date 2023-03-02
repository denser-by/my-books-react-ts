import React, { useState } from 'react';
import './confirmationpage.css';

const ConfirmationPage = ({ question, answerYesProc, answerNoProc, param, btnLabels }) => {
    const [aboutSelect, setAboutSelect] = useState("")
    const [curSelect, setCurSelect] = useState("")

    function mouseOver(e) {
        setAboutSelect(e.target)
    }

    function mouseOut() {
        setAboutSelect("")
    }

    function mouseClickYes(e) {
        answerYesProc(param)
    }

    function mouseClickNo() {
        answerNoProc()
    }

    return (
        <span className="confirmShape">
            <div className="confirmMessage">
                {question}
            </div>
            <div>
                <span className="confirmActions">
                    <span
                        id={"yesButton"}
                        className={curSelect.id == "yesButton" ? "contextOpYes selected" : (aboutSelect.id == "yesButton" ? "contextOpYes above" : "contextOpYes")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClickYes}>{btnLabels[0]}</span>
                    <span
                        id={"noButton"}
                        className={curSelect.id == "noButton" ? "contextOpNo selected" : (aboutSelect.id == "noButton" ? "contextOpNo above" : "contextOpNo")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClickNo}>{btnLabels[1]}</span>
                </span>
            </div>
        </span>
    );
};

export default ConfirmationPage;