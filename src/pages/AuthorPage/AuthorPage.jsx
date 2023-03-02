import React, { useState } from 'react';
import './authorpage.css'
import './../common.css'
import { Form, Input, Button } from 'reactstrap';

const AuthorPage = ({ author, edit }) => {
    return (
        <span className="authorShape">
            <span className='authorShapeHeader'>
                <span className="picture">
                    <img src={author.photo} />
                </span>
                <span className="icons-right">
                    <span className="author-info">
                        <span className="author-info-label">Author name:</span>
                        <textarea id="authorName" name="authorName" readOnly={!edit} placeholder="Author name"
                            className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                        <span className="fieldCurrent">{author.name}</span>
                    </span>



                    <span className="author-info">
                        <span className="author-info-label">Born in:</span>
                        <textarea id="authorAge" name="authorAge" readOnly={!edit} placeholder="born in"
                            className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                        <span className="fieldCurrent">{author.age}</span>
                    </span>


                    {/* <span className="book-info">
                        <span className="book-info-label">Year of publication:</span>
                        <textarea id="bookYear" name="bookYear" readOnly={!edit} placeholder="Year of publication"
                            className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                        <span className="fieldCurrent">{book.year}</span>
                    </span> */}






                    <span className="author-info">
                        <span className="author-info-label">List of books:</span>
                        <textarea id="authorBooks" name="authorBooks" readOnly={!edit} placeholder="published books list"
                            className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                        <span className="fieldCurrent">{author.books}</span>
                    </span>
                </span>
            </span>
            <div className="author-info">
                <span className="author-info-label">Biography:</span>
                <textarea id="authorInfo" name="authorInfo" readOnly={!edit} placeholder="Short books related description"
                    className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                <div className="fieldCurrent">{author.info}</div>
            </div>
            <input type={edit ? "submit" : "hidden"} value="Save" />
        </span>
    );
};

export default AuthorPage;