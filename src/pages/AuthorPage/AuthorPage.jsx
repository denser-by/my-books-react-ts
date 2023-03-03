import React, { useState } from 'react';
import './authorpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import AuthorsProvider from '../../model/AuthorsProvider.js';

const AuthorPage = ({ author, edit }) => {

    var author2 = AuthorsProvider.newAuthor();

    const [state, setState] = useState({
        name: author.name,
        age: author.age,
        books: author.books,
        info: author.info
    })

    function handleNameChange(event) {
        setState({ name: event.target.value });
    }

    function handleAgeChange(event) {
        setState({ age: event.target.value });
    }

    function handleBooksChange(event) {
        setState({ books: event.target.value });
    }

    function handleInfoChange(event) {
        setState({ info: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        author.name = state.name;
        author.age = state.age;
        author.books = state.books;
        author.info = state.info;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <span className="authorShape">
                <span className='authorShapeHeader'>
                    <span className="picture">
                        <img src={author.photo} />
                    </span>
                    <span className="icons-right">
                        <span className="author-info">
                            <span className="author-info-label">Author name:</span>
                            <Input type="textarea" id="authorName" name="authorName" readOnly={!edit} placeholder="Author name"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={state.name} onChange={handleNameChange} />
                            <span className="fieldCurrent">{author.name}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Born in:</span>
                            <Input type="textarea" id="authorAge" name="authorAge" readOnly={!edit} placeholder="born in"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={state.age} onChange={handleAgeChange} />
                            <span className="fieldCurrent">{author.age}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">List of books:</span>
                            <Input type="textarea" id="authorBooks" name="authorBooks" readOnly={!edit} placeholder="published books list"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={state.books} onChange={handleBooksChange} />
                            <span className="fieldCurrent">{author.books}</span>
                        </span>
                    </span>
                </span>
                <div className="author-info">
                    <span className="author-info-label">Biography:</span>
                    <Input type="textarea" id="authorInfo" name="authorInfo" readOnly={!edit} placeholder="Short books related description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={state.info} onChange={handleInfoChange} />
                    <div className="fieldCurrent">{author.info}</div>
                </div>
                <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                    <Button type="submit">Save</Button>
                </span>
            </span>
        </Form>
    );
};

export default AuthorPage;