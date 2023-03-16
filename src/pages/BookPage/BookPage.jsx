import React, { useState } from 'react';
import './bookpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import ImageUploading from 'react-images-uploading';
import BookImage1 from './../../images/1.jpg';
import BookImage2 from './../../images/2.jpg';
import BookImage3 from './../../images/3.jpg';
import BookImage4 from './../../images/4.jpg';
import BookImage5 from './../../images/5.jpg';
import BookImage6 from './../../images/6.jpg';
import BookImage7 from './../../images/7.jpg';
import BookImage8 from './../../images/8.jpg';
import BookImage9 from './../../images/9.jpg';
import BookImage10 from './../../images/10.jpg';
import BookImage11 from './../../images/11.jpg';
import BookImage12 from './../../images/12.jpg';
import BookImage13 from './../../images/13.jpg';
import BookImage14 from './../../images/14.jpg';
import BookImage15 from './../../images/15.jpg';
import BookImage16 from './../../images/16.jpg';
import BookImage17 from './../../images/17.jpg';
import BookImage18 from './../../images/18.jpg';
import BookImage19 from './../../images/19.jpg';
import BookImage20 from './../../images/20.jpg';
import axios from 'axios';

const BookPage = ({ setPageRef, pr, bookId, edit, create, closeProc }) => {
    if (pr.indexOf("createBook") < 1)
        if (pr.indexOf("Book") < 1 || pr.indexOf("Books") >= 0 || bookId == undefined || bookId == null || ("" + bookId).length < 1) return;

    var book = {
        id: '1',
        name: '',
        year: '',
        authors: [],
        info: '',
        cover_img_path: '',
        cover_img_data: ''
    };
    if (!create) {
        const apiUrl = 'http://localhost:3001/books/' + bookId;
        console.log('BP=' + apiUrl);
        fetch(apiUrl)
            .then((response) => response.json())
            .then(entireBody => {
                if (bookId == entireBody.id) {
                    console.log('ENTIRE=' + JSON.stringify(entireBody));
                    book = {
                        id: entireBody.id,
                        name: entireBody.name,
                        year: entireBody.year != null ? entireBody.year : '',
                        authors: entireBody.authors,
                        info: entireBody.info,
                        cover_img_path: entireBody.cover_img_path,
                        cover_img_data: entireBody.cover_img_data
                    };
                    if (!nameModified) {
                        setStateName(book.name);
                        setNameModified(true);
                    }
                    if (!yearModified) {
                        setStateYear(book.year);
                        setYearModified(true);
                    }
                    if (!authorsModified) {
                        setStateAuthors(book.authors);
                        setAuthorsModified(true);
                    }
                    if (!infoModified) {
                        setStateInfo(book.info);
                        setInfoModified(true);
                    }
                    if (!imageUploaded) {
                        setMyImage(getImage(book));
                        setImageUploaded(true);
                    }
                }
            });
    }

    const [stateName, setStateName] = useState('');
    const [stateYear, setStateYear] = useState('');
    const [stateAuthors, setStateAuthors] = useState([]);
    const [stateInfo, setStateInfo] = useState('');

    const [nameModified, setNameModified] = React.useState(false);
    const [yearModified, setYearModified] = React.useState(false);
    const [authorsModified, setAuthorsModified] = React.useState(false);
    const [infoModified, setInfoModified] = React.useState(false);

    const [state, setState] = useState({
        name: '',
        year: '',
        authors: [],
        info: ''
    })

    function handleNameChange(event) {
        // book2.name = event.target.value;
        setStateName(event.target.value);
        setState({ name: event.target.value });
        setNameModified(true);
    }

    function handleYearChange(event) {
        // book2.year = event.target.value;
        let year = event.target.value;
        console.log('change year: ' + year);
        setStateYear(year);
        setState({ year: year });
        setYearModified(true);
    }

    function handleAuthorsChange(event) {
        // book2.authors = event.target.value;
        let newAuthors = [event.target.value];
        console.log('author change ' + newAuthors);
        setStateAuthors(newAuthors);
        setState({ authors: newAuthors });
        setAuthorsModified(true);
    }

    function handleInfoChange(event) {
        // book2.info = event.target.value;
        setStateInfo(event.target.value);
        setState({ info: event.target.value });
        setInfoModified(true);
    }

    function onBookView() {
        // alert('edit-book-press');
        setPageRef("/viewBook?id=" + bookId);
    }

    function onBookEdit() {
        // alert('edit-book-press');
        setPageRef("/editBook?id=" + bookId);
    }

    function onBookExport() {
        alert('export-book-press');
    }

    function onBookDelete() {
        // alert('delete-book-press');
        setPageRef("/deleteBook?id=" + bookId);
    }

    function onBookSearch() {
        alert('search-book-press');
    }

    function onBookExit() {
        // alert('exit-book-press');
        setPageRef("/viewBooksAll");
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

        if (nameModified)
            book.name = stateName;
        if (yearModified)
            book.year = stateYear;
        if (authorsModified)
            book.authors = stateAuthors;
        if (infoModified)
            book.info = stateInfo;
        if (imageUploaded) {
            // book.cover_img_path = myImage;
            book.cover_img_data = myImage;
        }

        if (book.id != null && ('' + book.id).length > 0)
            book.id = Number.parseInt('' + book.id);
        else
            book.id = '';

        if (book.year != null && ('' + book.year).length > 0)
            book.year = Number.parseInt('' + book.year);
        else
            book.year = null;

        if (create) {
            console.log(' book to POST ' + JSON.stringify(book));
            axios.post('http://localhost:3001/books', book).then(res => {
                console.log(' book POST complete ' + JSON.stringify(res));
            });
            console.log(' create complete ');
        } else if (edit) {
            console.log(' book to PUT ' + JSON.stringify(book));
            axios.put('http://localhost:3001/books', book).then(res => {
                console.log(' book PUT complete ' + JSON.stringify(res));
            });
            console.log(' update complete ');
        }

        setStateName('');
        setState({ name: '' });
        setNameModified(false);
        setStateYear('');
        setState({ year: '' });
        setYearModified(false);
        setStateAuthors([]);
        setState({ authors: [] });
        setAuthorsModified(false);
        setStateInfo('');
        setState({ info: '' });
        setInfoModified(false);
        setImageUploaded(false);
        setMyImage('');

        closeProc();
    }

    const [images, setImages] = React.useState([]);
    const [myImage, setMyImage] = React.useState("");
    const [imageUploaded, setImageUploaded] = React.useState(false);

    const onBooksImageChange = (imageList, addUpdateIndex) => {
        console.log('start <' + images.length + '>');
        imageList.map(ii => {
            setMyImage(ii.data_url);
            setImageUploaded(true);
            console.log('keep posted <' + addUpdateIndex + '>');
        });
    };

    function isCoverImageDefined() {
        return book.cover_img_path != null && book.cover_img_path.length > 0 || book.cover_img_data != null && book.cover_img_data.length > 0;
    }

    function getImage(book) {
        if (book.cover_img_data != null && book.cover_img_data.length > 20)
            return book.cover_img_data;
        else if (book.cover_img_path != null && book.cover_img_path.length > 0) {
            if(book.cover_img_path.indexOf('/1.jpg') > -1) return BookImage1; else
            if(book.cover_img_path.indexOf('/2.jpg') > -1) return BookImage2; else
            if(book.cover_img_path.indexOf('/3.jpg') > -1) return BookImage3; else
            if(book.cover_img_path.indexOf('/4.jpg') > -1) return BookImage4; else
            if(book.cover_img_path.indexOf('/5.jpg') > -1) return BookImage5; else
            if(book.cover_img_path.indexOf('/6.jpg') > -1) return BookImage6; else
            if(book.cover_img_path.indexOf('/7.jpg') > -1) return BookImage7; else
            if(book.cover_img_path.indexOf('/8.jpg') > -1) return BookImage8; else
            if(book.cover_img_path.indexOf('/9.jpg') > -1) return BookImage9; else
            if(book.cover_img_path.indexOf('/10.jpg') > -1) return BookImage10; else
            if(book.cover_img_path.indexOf('/11.jpg') > -1) return BookImage11; else
            if(book.cover_img_path.indexOf('/12.jpg') > -1) return BookImage12; else
            if(book.cover_img_path.indexOf('/13.jpg') > -1) return BookImage13; else
            if(book.cover_img_path.indexOf('/14.jpg') > -1) return BookImage14; else
            if(book.cover_img_path.indexOf('/15.jpg') > -1) return BookImage15; else
            if(book.cover_img_path.indexOf('/16.jpg') > -1) return BookImage16; else
            if(book.cover_img_path.indexOf('/17.jpg') > -1) return BookImage17; else
            if(book.cover_img_path.indexOf('/18.jpg') > -1) return BookImage18; else
            if(book.cover_img_path.indexOf('/19.jpg') > -1) return BookImage19; else
            if(book.cover_img_path.indexOf('/20.jpg') > -1) return BookImage20;
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <span className="bookShape" id="idBookPage" name="idBookPage">
                <span className='bookShapeHeader'>
                    <span className="picture">
                        <ImageUploading
                            multiple
                            onChange={onBooksImageChange}
                            value={images}
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
                                    src={imageUploaded ? myImage : (isCoverImageDefined() ? getImage(book) : myImage)} />
                            )}
                        </ImageUploading>
                    </span>
                    <span className="icons-right">
                        <span className="book-info">
                            <span className="book-info-label">Title</span>
                            <Input type="textarea" id="bookName" name="bookName" readOnly={!edit} placeholder="Name of this fine book"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={nameModified ? stateName : book.name} onChange={handleNameChange}
                            />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{nameModified ? stateName : book.name}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Year</span>
                            <Input type="textarea" id="bookYear" name="bookYear" readOnly={!edit} placeholder="Year of publication"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={yearModified ? stateYear : book.year} onChange={handleYearChange}
                            />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{yearModified ? stateYear : book.year}</span>
                        </span>
                        <span className="book-info">
                            <span className="book-info-label">Authors</span>
                            <Input type="textarea" id="bookAuthors" name="bookAuthors" readOnly={!edit} placeholder="Authors' names"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={authorsModified ? stateAuthors : book.authors} onChange={handleAuthorsChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{authorsModified ? stateAuthors : book.authors}</span>
                        </span>
                    </span>
                </span>
                <div className="book-info">
                    <span className="book-info-label">Description</span>
                    <Input type="textarea" id="bookInfo" name="bookInfo" readOnly={!edit} placeholder="Short content description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={infoModified ? stateInfo : book.info} onChange={handleInfoChange} />
                    <div className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{infoModified ? stateInfo : book.info}</div>
                </div>
                <div className="buttonRow">
                    <span className={edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onBookView}>View</Button>
                    </span>
                    <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                        <Button type="submit">{create ? "Create" : "Save"}</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onBookEdit}>Edit</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onBookExport}>Export</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onBookDelete}>Delete</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onBookSearch}>Search</Button>
                    </span>
                    <span className="featureButton">
                        <Button type="button" onClick={onBookExit}>Cancel</Button>
                    </span>
                </div>
            </span>
        </Form>
    );
};

export default BookPage;