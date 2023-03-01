import React, { useState } from 'react';
import './authorslistpage.css'
import './../../components/ContextMenu/contextmenu.css'

const AuthorsListPage = ({ authorItems }) => {
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
        <span className='authorsList'>
            {authorItems.map(author =>
                <div className='authorsListItem'>
                    <span className='authorsInfoItem'>Name: {author.name}</span>
                    <span className='authorsInfoSpace'>&nbsp;</span>
                    <span className='authorsInfoItem'>Since: {author.age}</span>
                    <span className='authorsInfoSpace'>&nbsp;</span>
                    <span className='authorsInfoItem'>Amount of books: {author.numOfBooks}</span>

                    <span id={"/viewAuthor?" + author.id}
                        className={curSelect.id == "/viewAuthor?" + author.id ? "contextOp selected" : (aboutSelect.id == "/viewAuthor?" + author.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>View</span>

                    <span id={"/editAuthor?" + author.id}
                        className={curSelect.id == "/editAuthor?" + author.id ? "contextOp selected" : (aboutSelect.id == "/editAuthor?" + author.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>Edit</span>

                    <span id={"/deleteAuthor?" + author.id}
                        className={curSelect.id == "/deleteAuthor?" + author.id ? "contextOp selected" : (aboutSelect.id == "/deleteAuthor?" + author.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>Delete</span>
                </div>
            )}
        </span>
    );
};

export default AuthorsListPage;