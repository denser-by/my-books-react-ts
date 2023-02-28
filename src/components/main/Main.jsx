import React, { useEffect, useState } from "react";
import './main.less'
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../actions/books";
import { getAuthors } from "../actions/authors";
import Book from "./book/Book";
import Author from "./author/Author";

const Main = () => {
    const dispatch = useDispatch()
    
    const booksItems = useSelector(state => state.books.items)
    const booksIsFetching = useSelector(state => state.books.isFetching)
    const booksCurrentPage = useSelector(state => state.books.currentPage)
    const booksTotalCount = useSelector(state => state.books.totalCount)
    const booksPerPage = useSelector(state => state.books.perPage)

    const authorsItems = useSelector(state => state.authors.items)
    const authorsIsFetching = useSelector(state => state.authors.isFetching)
    const authorsCurrentPage = useSelector(state => state.authors.currentPage)
    const authorsTotalCount = useSelector(state => state.authors.totalCount)
    const authorsPerPage = useSelector(state => state.authors.perPage)

    const [searchValue, setSearchValue] = useState("")

    const booksPagesCount = Math.ceil(booksTotalCount / booksPerPage)
    const booksPages = []
    createPages(booksPages, booksPagesCount, booksCurrentPage)

    const authorsPagesCount = Math.ceil(authorsTotalCount / authorsPerPage)
    const authorsPages = []
    createPages(authorsPages, authorsPagesCount, authorsCurrentPage)

    useEffect(() => {
        dispatch(getBooks(searchValue, booksCurrentPage, booksPerPage))
        dispatch(getAuthors(searchValue, authorsCurrentPage, authorsPerPage))
    }, [currentPage])

    function searchBooksHandler() {
        dispatch(setCurrentPage(1))
        dispatch(getBooks(searchValue, currentPage, perPage))
    }

    function createPages(pages, pagesCount, currentPage) {
        for(i = 0; i < pagesCount; i++)
            pages.push(i+1)
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
                booksItems.map(book =>
                    <Book book={book} />)
                :
                <div className="fetching">

                </div>
                }

                <div className="pages">
                    {pages.map((page, index) => <span
                     key={index} 
                     className={currentPage == page ? "current-page" : "page" }
                     onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
                </div>


            </div>
            

            <div>
                {authorsItems.map(author => <Author author={author} />)}
            </div>



            <button onClick={()=>onCountClick()}>Count</button>
            
            <div>{count}</div>
        
        </div>


    );
};

export default Main;