import React from "react";
import './author.less';

const Author = (props) => {
    const author = props.author 

    return (
        <div className="author">
            <div className="author-header">
                <div className="author-header-name">{author.name}</div>
                <div className="author-header-books">{author.books}</div>
            </div>
            <div className="author-info">{author.info}</div>
            <div className="author-year">{author.year}</div>
            <a href={author.url_view} className="author-link"><image src={author.photo_img} />View author</a>
            <a href={author.url_edit} className="author-link"><image src={author.photo_img} />Edit author</a>
            <a href={author.url_delete} className="author-link"><image src={author.photo_img} />Delete author</a>
        </div>
    );
};

export default Author;