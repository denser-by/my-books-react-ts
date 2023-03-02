import React, { useState } from 'react';
import './bookpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
// import Book from './../../model/Book';

const BookPage = ({ book, edit }) => {

    // const book2 =  Book.findByPk(1);

    const [state, setState] = useState({
        name: book.name,
        year: book.year,
        info: book.info
    })

    // setState({info: book.info});

    function handleInfoChange(event) {
        // alert(event.target.value)
        setState({ info: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        book.info = state.info;
        // alert('Info: ' + state.info);
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
                                className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                            <span className="fieldCurrent">{book.name}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Year of publication:</span>
                            <Input type="textarea" id="bookYear" name="bookYear" readOnly={!edit} placeholder="Year of publication"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                            <span className="fieldCurrent">{book.year}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Authors:</span>
                            <Input type="textarea" id="bookAuthors" name="bookAuthors" readOnly={!edit} placeholder="Authorship entry"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                            <span className="fieldCurrent">{book.authors}</span>
                        </span>
                    </span>
                </span>
                <div className="book-info">
                    <span className="book-info-label">Book description:</span>
                    {/* <Input type="textarea" id="bookInfo" name="bookInfo" readOnly={!edit} placeholder="Remarkable book notes"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"} /> */}

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