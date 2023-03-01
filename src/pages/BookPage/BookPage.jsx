import React, { useState } from 'react';
import './bookpage.css'

const BookPage = ({ book }) => {

    return (
        <form action="/bookSave" type="get">
            <span className="bookShape">
                <span className='bookShapeHeader'>
                    <span className="material-icons picture">anchor</span>
                    <span className="icons-right">
                        <span className="book-info">
                            <span className="book-info-label">Title:</span>
                            <input id="bookName" name="bookName" type="text" value={book.name} />
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Year:</span>
                            <input id="bookYear" name="bookYear" type="text" value={book.year} />
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Authors:</span>
                            <input id="bookAuthors" name="bookAuthors" type="text" value={book.authors} />
                        </span>
                    </span>
                </span>
                <div className="book-info">
                    <span className="book-info-label">Description:</span>
                    <textarea id="bookInfo" name="bookInfo" rows="4" cols="12">
                        {book.info}
                    </textarea>
                </div>

                {/* <a href={book.url_view} className="book-link"><image src={book.cover_img} />View book</a>
                <a href={book.url_edit} className="book-link"><image src={book.cover_img} />Edit book</a>
                <a href={book.url_delete} className="book-link"><image src={book.cover_img} />Delete book</a> */}
                <input type="submit" value="Save" />
            </span>
        </form>
    );
};

export default BookPage;