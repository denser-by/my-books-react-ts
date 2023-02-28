import React, { useEffect, useState } from "react";
import './main.less'
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../actions/books";
import Book from "./book/Book";
import Author from "./author/Author";

const Main = () => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books.items)
    const authors = useSelector(state => state.authors.items)
    const isFetching = useSelector(state => state.books.isFetching)
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        dispatch(getBooks)
    }, [])

    function searchBooksHandler() {
        dispatch(getBooks(searchValue))
    }

    return (
        <div>

            <div>
                <div className="search">
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Input book name" className="search-input" />
                    <button onClick={()=>searchBooksHandler()} className="search-btn">Search</button>
                </div>

                {
                isFetching === false
                ?
                books.map(book =>
                    <Book book={book} />)
                :
                <div className="fetching">

                </div>
                }
            </div>
            

            <div>
                {authors.map(author => <Author author={author} />)}
            </div>



            <button onClick={()=>onCountClick()}>Count</button>
            
            <div>{count}</div>
        
        </div>


    );
};

export default Main;