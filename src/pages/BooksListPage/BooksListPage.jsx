import React, { useState } from 'react';
import './bookslistpage.css'

const BooksListPage = ({ bookItems }) => {

    return (
        <span className='booksList'>
            {bookItems.map(book =>
                <div className='booksListItem'>Book item: {book.name}</div>
            )}
        </span>
    );
};

export default BooksListPage;