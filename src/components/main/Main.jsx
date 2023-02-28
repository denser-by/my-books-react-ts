import React, { useEffect } from "react";
import './main.less'
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../actions/books";
import Book from "./book/Book";

const Main = () => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books.items)

    useEffect(() => {
        dispatch(getBooks)
    }, [])

    return (
        <div>
            {books.map(book =>
                <Book book={book} />
            )}
        </div>
    );
};

export default Main;