import React, { useState } from 'react';
import './authorpage.css'
import {Form, Input, Button} from 'reactstrap';

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
                        {/* <textarea id="authorName" name="authorName" readOnly={!edit} /> */}

                        <Input id="authorName" name="authorName" type="search" readOnly={!edit} className="mr-3" placeholder="Author name" />

                        <span className="fieldCurrent">{author.name}</span>
                    </span>
                    <span className="author-info">
                        <span className="author-info-label">Born in:</span>
                        <textarea id="authorAge" name="authorAge" readOnly={!edit} />
                        <span className="fieldCurrent">{author.age}</span>
                    </span>
                    <span className="author-info">
                        <span className="author-info-label">List of books:</span>
                        <textarea id="authorBooks" name="authorBooks" readOnly={!edit} />
                        <span className="fieldCurrent">{author.books}</span>
                    </span>
                </span>
            </span>
            <div className="author-info">
                <span className="author-info-label">Biography:</span>
                <textarea id="authorInfo" name="authorInfo" readOnly={!edit} />
                <div className="fieldCurrent">{author.info}</div>
            </div>
            <input type={edit ? "submit" : "hidden"} value="Save" />
        </span>
    );
};

export default AuthorPage;