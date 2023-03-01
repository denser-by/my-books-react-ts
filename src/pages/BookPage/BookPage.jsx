import React, { useState } from 'react';
import './bookpage.css'

const BookPage = ({ book, edit }) => {
    return (
        <span className="bookShape">
            <span className='bookShapeHeader'>
                <span className="picture">
                    <img src={book.cover_img} />
                </span>
                <span className="icons-right">
                    <span className="book-info">
                        <span className="book-info-label">Book title:</span>
                        <textarea id="bookName" name="bookName" readOnly={!edit} />
                        <span className="fieldCurrent">{book.name}</span>
                    </span>
                    <span className="book-info">
                        <span className="book-info-label">Year of publication:</span>
                        <textarea id="bookYear" name="bookYear" readOnly={!edit} />
                        <span className="fieldCurrent">{book.year}</span>
                    </span>
                    <span className="book-info">
                        <span className="book-info-label">Authors:</span>
                        <textarea id="bookAuthors" name="bookAuthors" readOnly={!edit} />
                        <span className="fieldCurrent">{book.authors}</span>
                    </span>
                </span>
            </span>
            <div className="book-info">
                <span className="book-info-label">Book description:</span>
                <textarea id="bookInfo" name="bookInfo" readOnly={!edit} />
                <div className="fieldCurrent">{book.info}</div>
            </div>
            <input type={edit ? "submit" : "hidden"} value="Save" />
        </span>
    );
};

export default BookPage;