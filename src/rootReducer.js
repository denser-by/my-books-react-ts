import React from 'react';
import axios from 'axios';
// import bodyParser from 'body-parser';
import { useDispatch, useSelector } from 'react-redux';

// const dispatch = useDispatch();
// const notifies = useSelector(state => state.notifies.notifies);
// const page_size = useSelector(state => state.page_size.page_size);
// const lang = useSelector(state => state.lang.lang);
// const logout_timeout = useSelector(state => state.logout_timeout.logout_timeout);

// export { dispatch, notifies, page_size, lang, logout_timeout };

const SET_NOTIFIES = "SET_NOTIFIES"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_LANG = "SET_LANG"
const SET_TIMEOUT = "SET_TIMEOUT"

const defaultState = {
    notifies: true,
    page_size: 5,
    lang: 'en',
    logout_timeout: 15,
}

export default function rootReducer(state = defaultState, action) {
    switch (action.type) {

        case SET_NOTIFIES:
            return {
                ...state,
                notifies: action.payload
            }

        case SET_PAGE_SIZE:
            return {
                ...state,
                page_size: action.payload
            }

        case SET_LANG:
            return {
                ...state,
                lang: action.payload
            }

        case SET_TIMEOUT:
            return {
                ...state,
                logout_timeout: action.payload
            }

        default:
            return state
    }
}

export const setNotifies = (notifies) => ({ type: SET_NOTIFIES, payload: notifies })
export const setPagesNum = (page_size) => ({ type: SET_PAGE_SIZE, payload: page_size })
export const setLang = (lang) => ({ type: SET_LANG, payload: lang })
export const setLogoutTimeout = (logout_timeout) => ({ type: SET_TIMEOUT, payload: logout_timeout })