import React, { useState } from 'react';
import './authorslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import AuthorsProvider from '../../model/AuthorsProvider';

const AuthorsListPage = ({ pageRef, setPageRef }) => {
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

    let authorItems = AuthorsProvider.all();

    return (
        <span className='authorsList'>
            {authorItems.map(author =>
                <div className='authorsListItem'>
                    <span className='authorsInfoItem'>Name: {author.name}</span>
                    <span className='authorsInfoSpace'>&nbsp;</span>
                    <span className='authorsInfoItem'>Since: {author.age}</span>
                    <span className='authorsInfoSpace'>&nbsp;</span>
                    <span className='authorsInfoItem'>Amount of books: {author.numOfBooks}</span>

                    <span id={"/viewAuthor?id=" + author.id}
                        className={curSelect.id == "/viewAuthor?id=" + author.id ? "contextOp selected" : (aboutSelect.id == "/viewAuthor?id=" + author.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>View</span>

                    <span id={"/editAuthor?id=" + author.id}
                        className={curSelect.id == "/editAuthor?id=" + author.id ? "contextOp selected" : (aboutSelect.id == "/editAuthor?id=" + author.id ? "contextOp above" : "contextOp")}
                        onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>Edit</span>

                </div>
            )}
        </span>
    );
};

export default AuthorsListPage;