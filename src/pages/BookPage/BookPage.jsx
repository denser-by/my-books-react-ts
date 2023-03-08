import React, { useState } from 'react';
import './bookpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import BooksProvider from '../../model/BooksProvider.js';
import ImageUploading from 'react-images-uploading';

const BookPage = ({ pr, bookId, edit, create, closeProc }) => {
    if (pr.indexOf("Author") !== -1) return;
    // console.log('BOOK_PAGE<'+ bookId +'><'+ edit+'><'+ create+'>'+pr);

    var book2 = BooksProvider.newBook();

    function getBook(bookId) {
        if (("" + bookId).length >= 1 && bookId > 0)
            return BooksProvider.find(bookId);
        return BooksProvider.anyFirst();
    }

    let book = (bookId != null && ("" + bookId).length > 0) ? getBook(bookId) : book2;

    const [stateName, setStateName] = useState('');
    const [stateYear, setStateYear] = useState('');
    const [stateAuthors, setStateAuthors] = useState('');
    const [stateInfo, setStateInfo] = useState('');

    const [state, setState] = useState({
        name: '',
        year: '',
        authors: '',
        info: ''
    })

    function handleNameChange(event) {
        // book2.name = event.target.value;
        setStateName(event.target.value);
        setState({ name: event.target.value });
    }

    function handleYearChange(event) {
        // book2.year = event.target.value;
        setStateYear(event.target.value);
        setState({ year: event.target.value });
    }

    function handleAuthorsChange(event) {
        // book2.authors = event.target.value;
        setStateAuthors(event.target.value);
        setState({ authors: event.target.value });
    }

    function handleInfoChange(event) {
        // book2.info = event.target.value;
        setStateInfo(event.target.value);
        setState({ info: event.target.value });
    }

    function onImageUploadViewMode() {
        console.log('no editing');
    }

    function handleSubmit(event) {
        event.preventDefault();
        // book.name = state.name;
        // book.year = state.year;
        // book.authors = state.authors;
        // book.info = state.info;

        book.name = stateName;
        book.year = stateYear;
        book.authors = stateAuthors;
        book.info = stateInfo;
        book.cover_img = myImage;

        book2.name = stateName;
        book2.year = stateYear;
        book2.authors = stateAuthors;
        book2.info = stateInfo;
        book2.cover_img = myImage;

        console.log(' save ' + JSON.stringify(book) + ' ' + JSON.stringify(book2));

        if (create) {
            BooksProvider.create(book2);
            console.log(' create complete ');
        } else if (edit) {
            BooksProvider.update(book);
            console.log(' update complete ');
        }

        setStateName('');
        setState({ name: '' });
        setStateYear('');
        setState({ year: '' });
        setStateAuthors('');
        setState({ authors: '' });
        setStateInfo('');
        setState({ info: '' });

        closeProc();
    }

    const [images, setImages] = React.useState([]);
    const [myImage, setMyImage] = React.useState("");
    const [imageUploaded, setImageUploaded] = React.useState(false);

    const onChange = (imageList, addUpdateIndex) => {
        console.log('start <' + images.length + '>');
        imageList.map(ii => {
            setMyImage(ii.data_url);
            setImageUploaded(true);
            console.log('keep posted <' + addUpdateIndex + '>');
        });
    };

    function isCoverImageDefined() {
        return book.cover_img != null && book.cover_img.length > 0;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <span className="bookShape" id="idBookPage" name="idBookPage">
                <span className='bookShapeHeader'>
                    <span className="picture">
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={1}
                            dataURLKey="data_url"
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <img className="pictureSrc"
                                    onClick={!edit ? onImageUploadViewMode : onImageUpload}
                                    alt="Place for book's cover image..."
                                    src={imageUploaded ? myImage : (isCoverImageDefined() ? book.cover_img : myImage)} />
                            )}
                        </ImageUploading>
                    </span>
                    <span className="icons-right">
                        <span className="book-info">
                            <span className="book-info-label">Title</span>
                            <Input type="textarea" id="bookName" name="bookName" readOnly={!edit} placeholder="Name of this fine book"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={stateName} onChange={handleNameChange}
                            />
                            <span className="fieldCurrent">{book.name}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Year</span>
                            <Input type="textarea" id="bookYear" name="bookYear" readOnly={!edit} placeholder="Year of publication"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={stateYear} onChange={handleYearChange}
                            />
                            <span className="fieldCurrent">{book.year}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Authors</span>
                            <Input type="textarea" id="bookAuthors" name="bookAuthors" readOnly={!edit} placeholder="Authors' names"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={stateAuthors} onChange={handleAuthorsChange} />
                            <span className="fieldCurrent">{book.authors}</span>
                        </span>
                    </span>
                </span>
                <div className="book-info">
                    <span className="book-info-label">Description</span>
                    <Input type="textarea" id="bookInfo" name="bookInfo" readOnly={!edit} placeholder="Short content description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={stateInfo} onChange={handleInfoChange} />
                    <div className="fieldCurrent">{book.info}</div>
                </div>
                <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                    <Button type="submit">{create ? "Create" : "Save"}</Button>
                </span>
            </span>
        </Form>
    );
};

export default BookPage;