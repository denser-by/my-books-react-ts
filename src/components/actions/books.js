import axios from 'axios'
import {setBooks} from "../../reducers/booksReducer";

export const getBooks = (bookSearchFilter = "Authors:") => {
    return async(dispatch) => {
        const response = await axios.get(`http://localhost:3000/search/books?q=${bookSearchFilter}&sort=year`)
        dispatch(setBooks(response.data))
    }
}