const ADD_BOOK = "ADD_BOOK"
const DEL_BOOK = "DEL_BOOK"
const SET_BOOKS = "SET_BOOKS"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const defaultState = {
    items: [],
    isFetching: true,
    currentPage: 1,
    perPage: 5,
    totalCount: 0
}

export default function booksReducer(state=defaultState, action) {
    switch(action.type) {
        case ADD_BOOK:
            return state.concat([action.bookId]);
        case DEL_BOOK:
            return state.filter(author => author.bookId !== action.bookId);

        case SET_BOOKS:
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.totalCount,
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
