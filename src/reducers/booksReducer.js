const SET_BOOKS = "SET_BOOKS"

const defaultState = {
    items: [],
    isFetching: true,
}

export default function booksReducer(state=defaultState, action) {
    switch(action.type) {
        case SET_BOOKS:
            return {
                ...state,
                items: action.payload.items
            }
        default:
            return state
    }
}

export const setBooks = (books) => ({type: SET_BOOKS, payload:books})