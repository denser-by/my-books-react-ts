import React, { useState } from 'react';
import './confirmationpage.css'

const ConfirmationPage = ({ question, answerYesProc, answerNoProc, param }) => {
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

    function mouseClickNo(e) {
        answerNoProc(param)
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
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClickYes}>Yes</span>
                    <span
                        id={"noButton"}
                        className={curSelect.id == "noButton" ? "contextOpNo selected" : (aboutSelect.id == "noButton" ? "contextOpNo above" : "contextOpNo")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClickNo}>No</span>
                </span>
            </div>
        </span>
    );
};

export default ConfirmationPage;