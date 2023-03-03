import React, { useState } from 'react';
import './bookpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import BooksProvider from '../../model/BooksProvider.js';

const BookPage = ({ book, edit }) => {

    var book2 = BooksProvider.newBook();

    const [state, setState] = useState({
        name: book.name,
        year: book.year,
        authors: book.authors,
        info: book.info
    })

    function handleNameChange(event) {
        setState({ name: event.target.value });
    }

    function handleYearChange(event) {
        setState({ year: event.target.value });
    }

    function handleAuthorsChange(event) {
        setState({ authors: event.target.value });
    }

    function handleInfoChange(event) {
        setState({ info: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        book.name = state.name;
        book.year = state.year;
        book.authors = state.authors;
        book.info = state.info;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <span className="bookShape">
                <span className='bookShapeHeader'>
                    <span className="picture">
                        <img src={book.cover_img} />
                    </span>
                    <span className="icons-right">
                        <span className="book-info">
                            <span className="book-info-label">Book title:</span>
                            <Input type="textarea" id="bookName" name="bookName" readOnly={!edit} placeholder="Book name with short description"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={state.name} onChange={handleNameChange}
                            />
                            <span className="fieldCurrent">{book.name}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Year of publication:</span>
                            <Input type="textarea" id="bookYear" name="bookYear" readOnly={!edit} placeholder="Year of publication"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={state.year} onChange={handleYearChange}
                            />
                            <span className="fieldCurrent">{book.year}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Authors:</span>
                            <Input type="textarea" id="bookAuthors" name="bookAuthors" readOnly={!edit} placeholder="Authorship entry"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={state.authors} onChange={handleAuthorsChange} />
                            <span className="fieldCurrent">{book.authors}</span>
                        </span>
                    </span>
                </span>
                <div className="book-info">
                    <span className="book-info-label">Book description:</span>
                    <Input type="textarea" id="bookInfo" name="bookInfo" readOnly={!edit} placeholder="Remarkable book notes"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={state.info} onChange={handleInfoChange} />
                    <div className="fieldCurrent">{book.info}</div>
                </div>
                <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                    <Button type="submit">Save</Button>
                </span>
            </span>
        </Form>
    );
};

export default BookPage;