import React, { useState } from 'react';
import './bookslistpage.css'
import './../../components/ContextMenu/contextmenu.css'

const BooksListPage = ({ bookItems, pageRef, setPageRef }) => {
    const [aboutSelect, setAboutSelect] = useState("")
    const [curSelect, setCurSelect] = useState("")

    function mouseOver(e) {
        setAboutSelect(e.target)
    }

    function mouseOut() {
        setAboutSelect("")
    }

    function mouseClick(e) {
        setCurSelect(e.target)
        setPageRef(e.target.id)
    }

    return (
        <span className='booksList'>
            {bookItems.map(book =>
                <div className='booksListItem'>
                    <span className='booksInfoItem'>Name: {book.name}</span>
                    <span className='booksInfoSpace'>&nbsp;</span>
                    <span className='booksInfoItem'>Published: {book.year}</span>

                    <span id={"/viewBook?id=" + book.id}
                        className={curSelect.id == "/viewBook?id=" + book.id ? "contextOp selected" : (aboutSelect.id == "/viewBook?id=" + book.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>View</span>

                    <span id={"/editBook?id=" + book.id}
                        className={curSelect.id == "/editBook?id=" + book.id ? "contextOp selected" : (aboutSelect.id == "/editBook?id=" + book.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>Edit</span>

                    <span id={"/deleteBook?id=" + book.id}
                        className={curSelect.id == "/deleteBook?id=" + book.id ? "contextOp selected" : (aboutSelect.id == "/deleteBook?id=" + book.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>Delete</span>
                </div>
            )}
        </span>
    );
};

export default BooksListPage;