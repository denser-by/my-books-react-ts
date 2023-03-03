import React, { useState } from 'react';
import './authorpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import AuthorsProvider from '../../model/AuthorsProvider.js';

const AuthorPage = ({ authorId, edit, create }) => {

    var author2 = AuthorsProvider.newAuthor();

    function getAuthor(authorId) {
        if (("" + authorId).length >= 1 && authorId > 0)
            return AuthorsProvider.find(authorId);
        return AuthorsProvider.anyFirst();
    }

    let author = (authorId != null && ("" + authorId).length > 0) ? getAuthor(authorId) : author2;

    const [stateName, setStateName] = useState('');
    const [stateAge, setStateAge] = useState('');
    const [stateBooks, setStateBooks] = useState('');
    const [stateInfo, setStateInfo] = useState('');

    const [state, setState] = useState({
        name: author.name,
        age: author.age,
        books: author.books,
        info: author.info
    })

    function handleNameChange(event) {
        setStateName(event.target.value);
        setState({ name: event.target.value });
    }

    function handleAgeChange(event) {
        setStateAge(event.target.value);
        setState({ age: event.target.value });
    }

    function handleBooksChange(event) {
        setStateBooks(event.target.value);
        setState({ books: event.target.value });
    }

    function handleInfoChange(event) {
        setStateInfo(event.target.value);
        setState({ info: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        // author.name = state.name;
        // author.age = state.age;
        // author.books = state.books;
        // author.info = state.info;

        author.name = stateName;
        author.age = stateAge;
        author.books = stateBooks;
        author.info = stateInfo;

        author2.name = stateName;
        author2.age = stateAge;
        author2.books = stateBooks;
        author2.info = stateInfo;

        console.log(' save ' + JSON.stringify(author) + ' ' + JSON.stringify(author2));

        if(create) {
            AuthorsProvider.create(author2);
            console.log(' create complete ');
        } else if(edit) {
            AuthorsProvider.update(author);
            console.log(' update complete ');
        }
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
                    <Button type="submit">{create ? "Create" : "Save"}</Button>
                </span>
            </span>
        </Form>
    );
};

export default AuthorPage;