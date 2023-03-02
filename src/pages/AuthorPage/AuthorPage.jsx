import React, { useState } from 'react';
import './authorpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';

const AuthorPage = ({ author, edit }) => {

    function handleSubmit(event) {
        alert('form submited: ' + this.state.value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
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
                <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                    <input type="submit" value="Save" />
                </span>
            </span>
        </form>
    );
};

export default AuthorPage;