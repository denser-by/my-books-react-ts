import React from "react";
import './book.less';

const Book = (props) => {
    const book = props.book 

    return (
        <div className="book">
            <div className="book-header">
                <div className="book-header-name">{book.name}</div>
                <div className="book-header-authors">{book.authors}</div>
            </div>
            <div className="book-info">{book.info}</div>
            <div className="book-year">{book.year}</div>
            <a href={book.url_view} className="book-link"><image src={book.cover_img} />View book</a>
            <a href={book.url_edit} className="book-link"><image src={book.cover_img} />Edit book</a>
            <a href={book.url_delete} className="book-link"><image src={book.cover_img} />Delete book</a>
        </div>
    );
};

export default Book;