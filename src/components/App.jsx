import React from "react";
import './app.less';
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";

const App = () => {
    const dispatch = useDispatch()

    return (
        <BrowserRouter>

            <div className="container">
                <Route path="/" component={Main} />

            </div>
   
        </BrowserRouter>

    )
}

export default App;