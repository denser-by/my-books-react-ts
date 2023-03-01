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
                            <span className="author-info-label">Author name:</span>
                            <input id="authorName" name="authorName" type="text" value={author.name} />
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Born in:</span>
                            <input id="authorYear" name="authorYear" type="text" value={author.age} />
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">List of books:</span>
                            <input id="authorBooks" name="authorBooks" type="text" value={author.books} />
                        </span>
                    </span>
                </span>
                <div className="author-info">
                    <span className="author-info-label">Biography:</span>
                    <textarea id="authorInfo" name="authorInfo" rows="4" cols="12" value={author.info} />
                </div>

                <input type="submit" value="Save" />
            </span>

        </form>
    );
};

export default AuthorPage;