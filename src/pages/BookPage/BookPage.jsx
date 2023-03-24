import React, { useEffect, useState } from 'react';
import './bookpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { YearCompon, MonthCompon } from '../../components/SelectDate/DateCompon.js';
import { getImageBook } from './../pictureSupport.js';
import { AuthorsLookup } from '../../components/AuthorsLookup/AuthorsLookup.js';
import { TextListEdit, TextListView } from '../../components/TextList/TextListCompon.js';

const BookPage = ({ setPageRef, pr, bookId, edit, create, closeProc }) => {
    if (pr.indexOf("createBook") < 1)
        if (pr.indexOf("Book") < 1 || pr.indexOf("Books") >= 0 || bookId == undefined || bookId == null || ("" + bookId).length < 1) return;

    const [pageBookState, setPageBookState] = useState({
        bookId: bookId,
        create: create,
        edit: edit
    });

    var book = {
        id: '1',
        name: '',
        year: '',
        authors: [],
        authorNames: [],
        authorsText: '',
        info: '',
        cover_img_path: '',
        cover_img_data: ''
    };

    useEffect(() => {
        if (!create) {
            const apiUrl = 'http://localhost:3001/books/' + bookId;
            // console.log('BP=' + apiUrl);
            fetch(apiUrl)
                .then((response) => response.json())
                .then(entireBody => {
                    if (bookId == entireBody.id) {
                        // console.log('ENTIRE=' + JSON.stringify(entireBody));
                        book = {
                            id: entireBody.id,
                            name: entireBody.name,
                            year: entireBody.year != null ? entireBody.year : '',
                            authors: entireBody.authors,
                            authorNames: entireBody.authorNames,
                            authorsText: makeAuthorsText(entireBody.authorNames),
                            info: entireBody.info,
                            cover_img_path: entireBody.cover_img_path,
                            cover_img_data: entireBody.cover_img_data
                        };
                        // console.log('bookObj =' + JSON.stringify(book));
                        if (!dateSelectedModified) {
                            setDateSelected(new Date('' + book.year + '-01-01'));
                            setDateSelectedModified(true);
                        }
                        if (!nameModified) {
                            setStateName(book.name);
                            setNameModified(true);
                        }
                        if (!yearModified) {
                            setStateYear(book.year);
                            setYearModified(true);
                        }
                        if (!authorsModified) {
                            setStateAuthors(book.authorsText);
                            setAuthorsModified(true);
                        }
                        if (!infoModified) {
                            setStateInfo(book.info);
                            setInfoModified(true);
                        }
                        if (!imageUploaded) {
                            setMyImage(getImageBook(book));
                            setImageUploaded(true);
                        }
                    }
                });
        }
    }, [pageBookState]);

    const [stateName, setStateName] = useState('');
    const [stateYear, setStateYear] = useState('');
    const [stateAuthors, setStateAuthors] = useState('');
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
        setStateYear(year);
        setState({ year: year });
        setYearModified(true);
    }

    function makeAuthorsText(authorNames) {
        var text = "";
        authorNames.map(name => {
            if (text.length < 1)
                text += name;
            else
                text += '\n' + name;
        });
        return text;
    }

    function handleAuthorsChange(newAuthorId, newAuthorName) {
        if (book.authors.indexOf(newAuthorId) <0) {
            book.authors.push(newAuthorId);
            book.authorNames.push(newAuthorName);
            book.authorsText = makeAuthorsText(book.authorNames);
        }

        setStateAuthors(book.authorsText);
        setState({ authors: book.authors });
        setAuthorsModified(true);
    }

    function onBookAuthorDelete(e) {
        if(deleteSelection != null && deleteSelection.length > 0) {
            var delSel = deleteSelection;
            deleteSelection.map(delItem => {
                let delIdx = book.authorNames.indexOf(delItem);
                if (delIdx >-1) {
                    book.authors.splice(delIdx,1);
                    book.authorNames.splice(delIdx,1);
                }
            });
            delSel.splice(0, delSel.length);
            setDeleteSelection(delSel);
            book.authorsText = makeAuthorsText(book.authorNames);
        }

        setStateAuthors(book.authorsText);
        setState({ authors: book.authors });
        setAuthorsModified(true);
    }

    function onBookAuthorClear(e) {
        book.authors.splice(0, book.authors.length);
        book.authorNames.splice(0, book.authorNames.length);
        book.authorsText = makeAuthorsText(book.authorNames);

        setStateAuthors(book.authorsText);
        setState({ authors: book.authors });
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

    function transferAuthorsState() {
        book.authors = state.authors;
        book.authorNames = ("" + stateAuthors).split("\n");
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
            transferAuthorsState();
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
        setStateAuthors('');
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

    const [datePick, setDatePick] = React.useState(false);
    const [dateSelected, setDateSelected] = React.useState();
    const [dateSelectedModified, setDateSelectedModified] = React.useState(false);

    const [authorPick, setAuthorPick] = React.useState(false);
    const [authorsSelected, setAuthorsSelected] = React.useState([]);

    function onDateSelect(res) {
        setDatePick(false);
        let evt = {
            target: {
                value: '' + new Date(res).getFullYear(),
            },
        };
        handleYearChange(evt);
    }

    function onAuthorsSelected(authorId, authorName) {
        setAuthorPick(false);
        handleAuthorsChange(authorId, authorName);
    }

    function onBookYearToogle() {
        if (authorPick)
            setAuthorPick(false);
        setDatePick(!datePick);
    }

    function onBookCreateAuthor() {
        console.log('oosidijfowfy9u9ew8ufw98uef98ufw988euf98uw9efhwehifuy2982u9fw9e8fu9sd8u98vu98uf9we8u9f8wue9fuw9euf9weuf9uwe9fuweiufbuyw2ewgfuysvsuhweofjouhfiusdh');
    }

    function onBookAuthorToogle() {
        if (datePick)
            setDatePick(false);
        setAuthorPick(!authorPick);
    }

    function yearSelectedNotify(selYear) {
        console.log('selected year: ' + selYear);
    }

    function monthSelectedNotify(selMonth) {
        console.log('selected month: ' + selMonth);
    }

    const [deleteSelection, setDeleteSelection] = React.useState([]);

    function relatedAuthorsSelectionUpdated(selectedItems) {
        setDeleteSelection(selectedItems);
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
                                    src={imageUploaded ? myImage : (isCoverImageDefined() ? getImageBook(book) : myImage)} />
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
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent bookRead"}>{nameModified ? stateName : book.name}</span>
                        </span>
                        <span className="book-info">
                            <YearCompon
                                notifyYearChosen={yearSelectedNotify}
                                dateSelected={dateSelected}
                                onDateSelect={onDateSelect}
                                caption={'Choose year of publication'} datePick={datePick}
                                setDatePick={setDatePick}
                            />
                            <span className="book-info-label">Year</span>
                            <span className={create || edit ? "authorSelector withContextBtn" : "authorSelector ctrlHidden"}>
                                <Input type="textarea" id="bookYear" name="bookYear" readOnly={!edit} placeholder="Year of publication"
                                    className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                    value={yearModified ? stateYear : book.year} onChange={handleYearChange}
                                />
                                <span className={!edit ? "ctrlHidden" : "contextBtnsColumn"}>
                                    <Button type="button" className='contextSameBtn' onClick={onBookYearToogle}><strong>&lt;..&gt;</strong></Button>
                                </span>
                            </span>
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent bookRead"}>{yearModified ? stateYear : book.year}</span>
                        </span>
                        <span className={create || edit ? "book-info high" : "book-info"}>
                            <AuthorsLookup
                                authorsSelected={authorsSelected}
                                onAuthorsSelected={onAuthorsSelected}
                                caption={"Looking for this book's authors"}
                                authorPick={authorPick}
                                setAuthorPick={setAuthorPick}
                            />
                            <span className="book-info-label">Authors</span>
                            <span className={create || edit ? "authorSelector withContextBtn" : "authorSelector ctrlHidden"}>
                                <TextListEdit text={"" + (authorsModified ? stateAuthors : book.authorsText)} className={!edit ? "ctrlHidden hight" : "fieldCurrent"}
                                    notifySelectUpdated={relatedAuthorsSelectionUpdated} />
                                <span className='contextBtnsColumn'>
                                    <Button type="button" className='contextSameBtn ctrlHidden' onClick={onBookCreateAuthor}>Create</Button>
                                    <Button type="button" className='contextSameBtn' onClick={onBookAuthorToogle}><strong>&lt;..&gt;</strong></Button>
                                    <Button type="button"
                                        className={"contextSameBtn" + (("" + (authorsModified ? stateAuthors : book.authorsText)).length < 1 ? " disabled" : "")}
                                        onClick={onBookAuthorClear}>Clear</Button>
                                    <Button type="button" 
                                        className={"contextSameBtn" + (!(deleteSelection != null && deleteSelection.length > 0) ? " disabled" : "")} 
                                        onClick={onBookAuthorDelete}>Delete</Button>
                                </span>
                            </span>
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>
                                <TextListView text={"" + (authorsModified ? stateAuthors : book.authorsText)} />
                            </span>
                        </span>
                    </span>
                </span>
                <div className="book-info">
                    <span className="book-info-label">Description</span>
                    <Input type="textarea" id="bookInfo" name="bookInfo" readOnly={!edit} placeholder="Short content description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={infoModified ? stateInfo : book.info} onChange={handleInfoChange} />
                    <div className={create || edit ? "ctrlHidden" : "fieldCurrent bookRead"}>{infoModified ? stateInfo : book.info}</div>
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