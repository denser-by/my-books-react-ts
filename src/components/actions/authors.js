import axios from 'axios';
import {setAuthors, setIsFetching} from "../../reducers/authorsReducer";

export const getAuthors = (authorSearchFilter = "Books:", currentPage, perPage) => {
    if(authorSearchFilter == "") {
        authorSearchFilter = "Books:";
    }
    return async(dispatch) => {
        dispatch(setIsFetching(true))
        const response = await axios.get(`http://localhost:3000/search/authors?q=${authorSearchFilter}&sort=amount&per_page=${perPage}&page=${currentPage}`)
        dispatch(setBooks(response.data))
    }
}