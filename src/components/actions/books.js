import axios from 'axios'
import {setBooks, setIsFetching} from "../../reducers/booksReducer";

export const getBooks = (bookSearchFilter = "Authors:", currentPage, perPage) => {
    if(bookSearchFilter == "") {
        bookSearchFilter = "Authors:";
    }
    return async(dispatch) => {
        dispatch(setIsFetching(true))
        const response = await axios.get(`http://localhost:3000/search/books?q=${bookSearchFilter}&sort=year&per_page=${perPage}&page=${currentPage}`)
        dispatch(setBooks(response.data))
    }
}