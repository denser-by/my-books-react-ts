import axios from 'axios'
import {setBooks, setIsFetching} from "../../reducers/booksReducer";

export const getBooks = (bookSearchFilter = "Authors:") => {
    if(bookSearchFilter == "") {
        bookSearchFilter = "Authors:";
    }
    return async(dispatch) => {
        dispatch(setIsFetching(true))
        const response = await axios.get(`http://localhost:3000/search/books?q=${bookSearchFilter}&sort=year`)
        dispatch(setBooks(response.data))
    }
}