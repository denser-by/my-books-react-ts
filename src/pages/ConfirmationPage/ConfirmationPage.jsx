import { useState } from 'react';
import './confirmationpage.css';

const ConfirmationPage = ({ pr, question, answerYesProc, answerNoProc, param, btnLabels }) => {
    if (pr.indexOf("deleteBook") < 1 && pr.indexOf("eraseAllBooks") < 1 && pr.indexOf("generate20Books") < 1 && pr.indexOf("generate20Authors") < 1) return;

    const [above, setAbove] = useState("");

    function mouseOver(e) {
        setAbove(e.target);
    }

    function mouseOut() {
        setAbove("");
    }

    function mouseClickYes(e) {
        answerYesProc(param);
    }

    function mouseClickNo() {
        answerNoProc();
    }

    return (
        <span className="confirmShape">
            <div className="confirmMessage">
                {question}
            </div>
            <div>
                <span className="confirmActions">
                    <span id={"yesButton"}
                        className={above.id == "yesButton" ? "contextOpYes above" : "contextOpYes"}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClickYes}>
                        {btnLabels[0]}
                    </span>
                    <span id={"noButton"}
                        className={above.id == "noButton" ? "contextOpNo above" : "contextOpNo"}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClickNo}>
                        {btnLabels[1]}
                    </span>
                </span>
            </div>
        </span>
    );
};

export default ConfirmationPage;