import { combineReducers } from "redux";
import {createStore, applyMiddleware } from "redux";
import booksReducer from "./booksReducer";
import authorsReducer from "./authorsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers(
    {
        books: booksReducer,
        authors: authorsReducer,
    }
)

export const bookStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)) )