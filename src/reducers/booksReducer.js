const SET_BOOKS = "SET_BOOKS"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const defaultState = {
    items: [],
    isFetching: true,
}

export default function booksReducer(state=defaultState, action) {
    switch(action.type) {
        case SET_BOOKS:
            return {
                ...state,
                items: action.payload.items,
                isFetching: false
            }

        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }

        default:
            return state
    }
}

export const setBooks = (books) => ({type: SET_BOOKS, payload:books})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload:bool})
