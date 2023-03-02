import React, { useState } from 'react';
import './bookpage.css'
import { Form, Input, Button } from 'reactstrap';



const BookPage = ({ book, edit }) => {

//    const [publishYear, setPublishYear] = useState(book.year)
    const [state, setState] = useState({
        name: book.name,
        year: book.year,
        info:"3"
    })

    function handleYearChange(event) {
        setPublishYear(event.target.value)
    }

    return (
        <form>
        <span className="bookShape">
            <span className='bookShapeHeader'>
                <span className="picture">
                    <img src={book.cover_img} />
                </span>
                <span className="icons-right">
                    <span className="book-info">
                        <span className="book-info-label">Book title:</span>

                        {/* <Input id="bookName" name="bookName" type="search" readOnly={!edit} className="mr-3" placeholder="Book name with short description" /> */}
                        <input type="text" value={state.name} readOnly={!edit} />

                        <textarea id="bookName" name="bookName" readOnly={!edit} />
                        <span className="fieldCurrent">{book.name}</span>
                    </span>
                    <span className="book-info">
                        <span className="book-info-label">Year of publication:</span>

                        <input type="text" value={state.year} readOnly={!edit} />

                        <textarea id="bookYear" name="bookYear" readOnly={!edit} />
                        <span className="fieldCurrent">{book.year}</span>

                    </span>
                    <span className="book-info">
                        <span className="book-info-label">Authors:</span>
                        <textarea id="bookAuthors" name="bookAuthors" readOnly={!edit} />
                        <span className="fieldCurrent">{book.authors}</span>
                    </span>
                </span>
            </span>
            <div className="book-info">
                <span className="book-info-label">Book description:</span>

                <input type="text" value={state.info} readOnly={!edit} />

                <textarea id="bookInfo" name="bookInfo" readOnly={!edit} />
                <div className="fieldCurrent">{book.info}</div>
            </div>
            <input type={edit ? "submit" : "hidden"} value="Save" />
        </span>
        </form>
    );
};

export default BookPage;