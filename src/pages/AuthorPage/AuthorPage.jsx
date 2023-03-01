import React, { useState } from 'react';
import './authorpage.css'

const AuthorPage = ({ author }) => {

    return (
        <form action="/authorSave" type="get">

            <span className="authorShape">
                <span className='authorShapeHeader'>
                    <span className="material-icons picture">anchor</span>
                    <span className="icons-right">
                        <span className="author-info">
                            <span className="author-info-label">Name:</span>
                            <input id="authorName" name="authorName" type="text" value={author.name} />
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Since:</span>
                            <input id="authorYear" name="authorYear" type="text" value={author.year} />
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">List of books:</span>
                            <input id="authorBooks" name="authorBooks" type="text" value={author.books} />
                        </span>
                    </span>
                </span>
                <div className="author-info">
                    <span className="author-info-label">Biography:</span>
                    <textarea id="authorInfo" name="authorInfo" rows="4" cols="12">
                        {author.info}
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

export default AuthorPage;