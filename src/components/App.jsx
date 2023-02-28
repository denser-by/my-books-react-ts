import React from "react";
import './app.less';
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import Main from "./main/Main";

const App = () => {
    const dispatch = useDispatch()
    const count = useSelector(state => state.authors.count)


    function onCountClick() {
        dispatch(setCount(5))
    }


    return (
        <BrowserRouter>

            <div className="container">

                <Route path="/" component={Main} />


            </div>
   
        </BrowserRouter>

    )
}

export default App;