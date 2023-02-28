const ADD_AUTHOR = "ADD_AUTHOR"
const DEL_AUTHOR = "DEL_AUTHOR"
const SET_AUTHORS = "SET_AUTHORS"
const SET_COUNT = "SET_COUNT"

const defaultState = {
    items: [],
    isFetching: true,
    count: 0
}

export default function authorsReducer(state=defaultState, action) {
    switch(action.type) {
        case ADD_AUTHOR:
            return state.concat([action.authorId]);
        case DEL_AUTHOR:
            return state.filter(author => author.authorId !== action.authorId);
    
        case SET_AUTHORS:
            return {
                ...state,
                items: action.payload.items
            }

        case SET_COUNT:
            return {
                ...state,
                count: action.payload
            }


        default:
            return state
    }
}

export const setAuthors = (authors) => ({type: SET_AUTHORS, payload:authors})
export const setCount = (count) => ({type:SET_COUNT, payload:count})