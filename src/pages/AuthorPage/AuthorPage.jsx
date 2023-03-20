import React, { useEffect, useState } from 'react';
import './authorpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import DateCompon from '../../components/SelectDate/DateCompon.js';
import { fineDateShort } from './../common.js';
import { getImageAuthor } from './../pictureSupport.js';
import { BookLookup } from '../../components/BookLookup/BookLookup.js';
import { TextListView } from '../../components/TextList/TextListCompon.js';

const AuthorPage = ({ setPageRef, pr2, authorId, edit, create, closeProc }) => {
    if (pr2.indexOf("createAuthor") < 1)
        if (pr2.indexOf("Author") < 1 || pr2.indexOf("Authors") >= 0 || authorId == undefined || authorId == null || ("" + authorId).length < 1) return;

    const [pageAuthorState, setPageAuthorState] = useState({
        authorId: authorId,
        create: create,
        edit: edit
    });
    const [pageAuthorItem, setPageAuthorItem] = useState();

    var author = {
        id: '1',
        name: '',
        age: '',
        books: [],
        bookNames: [],
        booksText: '',
        info: '',
        photo_path: '',
        photo_data: ''
    };

    useEffect(() => {
        if (!create) {
            const request = 'http://localhost:3001/authors/' + authorId;
            // console.log('AP=' + request);
            fetch(request)
                .then((response) => response.json())
                .then(entireBody => {
                    if (authorId == entireBody.id) {
                        // console.log('entAuthor=' + JSON.stringify(entireBody));
                        author = {
                            id: entireBody.id,
                            name: entireBody.name,
                            age: entireBody.age != null ? fineDateShort(new Date(entireBody.age)) : '',
                            books: entireBody.books,
                            bookNames: entireBody.bookNames,
                            booksText: makeBooksText(entireBody.bookNames),
                            info: entireBody.info,
                            photo_path: entireBody.photo_path,
                            photo_data: entireBody.photo_data
                        };
                        // console.log('authorObj =' + JSON.stringify(author));
                        if (!ageSelectedModified) {
                            setAgeSelected(new Date(author.age));
                            setAgeSelectedModified(true);
                        }
                        if (!nameModified) {
                            setStateName(author.name);
                            setNameModified(true);
                        }
                        if (!ageModified) {
                            setStateAge(author.age);
                            setAgeModified(true);
                        }
                        if (!stateBooks) {
                            setStateBooks(author.booksText);
                            setBooksModified(true);
                        }
                        if (!stateInfo) {
                            setStateInfo(author.info);
                            setInfoModified(true);
                        }
                        if (!imageUploaded) {
                            setMyImage(getImageAuthor(author));
                            setImageUploaded(true);
                        }
                    }
                });
        }
        setPageAuthorItem(author);
    }, [pageAuthorState]);

    const [stateName, setStateName] = useState('');
    const [stateAge, setStateAge] = useState('');
    const [stateBooks, setStateBooks] = useState('');
    const [stateInfo, setStateInfo] = useState('');

    const [nameModified, setNameModified] = React.useState(false);
    const [ageModified, setAgeModified] = React.useState(false);
    const [booksModified, setBooksModified] = React.useState(false);
    const [infoModified, setInfoModified] = React.useState(false);

    const [state, setState] = useState({
        name: '',
        age: '',
        books: [],
        info: ''
    })

    function handleNameChange(event) {
        setStateName(event.target.value);
        setState({ name: event.target.value });
        setNameModified(true);
    }

    function handleAgeChange(event) {
        let age = event.target.value;
        console.log('change age: ' + age);
        setStateAge(age);
        setState({ age });
        setAgeModified(true);
    }

    function makeBooksText(bookNames) {
        var text = "";
        bookNames.map(name => {
            if (text.length < 1)
                text += name;
            else
                text += '\n' + name;
        });
        return text;
    }

    function handleBooksChange(newBookId, newBookName) {
        author.books.push(newBookId);
        author.bookNames.push(newBookName);

        setStateBooks(makeBooksText(author.bookNames));
        setState({ books: author.books });
        setBooksModified(true);
    }

    function handleInfoChange(event) {
        setStateInfo(event.target.value);
        setState({ info: event.target.value });
        setInfoModified(true);
    }

    function onAuthorView() {
        // alert('edit-book-press');
        setPageRef("/viewAuthor?id=" + authorId);
    }

    function onAuthorEdit() {
        // alert('edit-author-press');
        setPageRef("/editAuthor?id=" + authorId);
    }

    function onAuthorExport() {
        alert('export-author-press');
    }

    function onAuthorExit() {
        // alert('exit-author-press');
        setPageRef("/viewAuthorsAll");
    }

    function onImageUploadViewMode() {
        console.log('no editing');
    }

    function handleSubmit(event) {
        event.preventDefault();
        // author.name = state.name;
        // author.age = state.age;
        // author.books = state.books;
        // author.info = state.info;

        if (nameModified)
            author.name = stateName;
        if (ageModified)
            author.age = stateAge;
        if (booksModified)
            author.books = stateBooks;
        if (infoModified)
            author.info = stateInfo;
        if (imageUploaded) {
            // author.photo_path = myImage;
            author.photo_data = myImage;
        }

        if (author.id != null && ('' + author.id).length > 0)
            author.id = Number.parseInt('' + author.id);
        else
            author.id = '';

        if (create) {
            console.log(' author to POST ' + JSON.stringify(author));
            axios.post('http://localhost:3001/authors', author).then(res => {
                console.log(' author POST complete ' + JSON.stringify(res));
            });
            console.log(' create complete ');
        } else if (edit) {
            console.log(' author to PUT ' + JSON.stringify(author));
            axios.put('http://localhost:3001/authors', author).then(res => {
                console.log(' author PUT complete ' + JSON.stringify(res));
            });
            console.log(' update complete ');
        }

        setStateName('');
        setState({ name: '' });
        setNameModified(false);
        setStateAge('');
        setState({ age: '' });
        setAgeModified(false);
        setStateBooks('');
        setState({ books: [] });
        setBooksModified(false);
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

    const onAuthorsPhotoPathChange = (imageList, addUpdateIndex) => {
        // console.log('start <' + images.length + '>');
        imageList.map(ii => {
            setMyImage(ii.data_url);
            setImageUploaded(true);
            console.log('keep posted <' + addUpdateIndex + '>');
        });
    };

    function isPhotoPathDefined() {
        return author.photo_path != null && author.photo_path.length > 0;
    }

    const [agePick, setAgePick] = React.useState(false);
    const [ageSelected, setAgeSelected] = React.useState();
    const [ageSelectedModified, setAgeSelectedModified] = React.useState(false);

    const [bookPick, setBookPick] = React.useState(false);
    const [bookSelected, setBookSelected] = React.useState([]);
    const [bookSelectedModified, setBookSelectedModified] = React.useState(false);

    function onAgeSelect(res) {
        setAgePick(false);
        let evt = {
            target: {
                value: '' + fineDateShort(new Date(res)),
            },
        };
        handleAgeChange(evt);
        setAgeSelectedModified(false);
    }

    function onBookSelected(bookId, bookName) {
        setBookPick(false);
        handleBooksChange(bookId, bookName);
    }

    function onAuthorAgeToogle() {
        if (bookPick)
            setBookPick(false);
        setAgePick(!agePick);
    }

    function onAuthorBookToogle() {
        if (agePick)
            setAgePick(false);
        setBookPick(!bookPick);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <span className="authorShape" id="idAuthorPage" name="idAuthorPage">
                <span className='authorShapeHeader'>
                    <span className="picture">
                        <ImageUploading
                            multiple
                            onChange={onAuthorsPhotoPathChange}
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
                                    alt="Place for author's photo..."
                                    src={imageUploaded ? myImage : (isPhotoPathDefined() ? getImageAuthor(author) : myImage)} />
                            )}
                        </ImageUploading>
                    </span>
                    <span className="icons-right">
                        <span className="author-info">
                            <span className="author-info-label">Name</span>
                            <Input type="textarea" id="authorName" name="authorName" readOnly={!edit} placeholder="Author name"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={nameModified ? stateName : author.name} onChange={handleNameChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{nameModified ? stateName : author.name}</span>
                        </span>
                        <span className="author-info">
                            <DateCompon dateSelected={ageSelected} onDateSelect={onAgeSelect}
                                caption={"Select author's birthday"} datePick={agePick}
                                setDatePick={setAgePick}
                            />
                            <span className="author-info-label">Born</span>
                            <span className={create || edit ? "bookSelector withContextBtn" : "bookSelector ctrlHidden"}>
                                <Input type="textarea" id="authorAge" name="authorAge" readOnly={!edit} placeholder="Born in"
                                    className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                    value={ageModified ? stateAge : author.age} onChange={handleAgeChange}
                                />
                                <span className={!edit ? "ctrlHidden" : "contextBtn"}>
                                    <Button type="button" onClick={onAuthorAgeToogle}><strong>&lt;..&gt;</strong></Button>
                                </span>
                            </span>
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{ageModified ? stateAge : author.age}</span>
                        </span>
                        <span className={create || edit ? "author-info high" : "author-info"}>
                            <BookLookup
                                bookSelected={bookSelected}
                                onBookSelected={onBookSelected}
                                caption={"Looking for this author's book"}
                                bookPick={bookPick}
                                setBookPick={setBookPick}
                            />
                            <span className="author-info-label">Publications</span>
                            <span className={create || edit ? "authorSelector withContextBtn" : "authorSelector ctrlHidden"}>
                                <Input type="textarea" id="authorBooks" name="authorBooks" readOnly={!edit} placeholder="List of published books"
                                    className={!edit ? "ctrlHidden hight" : "fieldCurrent"}
                                    value={booksModified ? stateBooks : author.booksText} onChange={handleBooksChange} />
                                <span className='contextBtn'>
                                    <Button type="button" onClick={onAuthorBookToogle}><strong>&lt;..&gt;</strong></Button>
                                </span>
                            </span>
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>
                                <TextListView text={"" + (booksModified ? stateBooks : author.booksText)} />
                            </span>
                        </span>
                    </span>
                </span>
                <div className="author-info">
                    <span className="author-info-label">Biography</span>
                    <Input type="textarea" id="authorInfo" name="authorInfo" readOnly={!edit} placeholder="Short books related description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={infoModified ? stateInfo : author.info} onChange={handleInfoChange} />
                    <div className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{infoModified ? stateInfo : author.info}</div>
                </div>
                <div className="buttonRow">
                    <span className={edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onAuthorView}>View</Button>
                    </span>
                    <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                        <Button type="submit">{create ? "Create" : "Save"}</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onAuthorEdit}>Edit</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onAuthorExport}>Export</Button>
                    </span>
                    <span className="featureButton">
                        <Button type="button" onClick={onAuthorExit}>Cancel</Button>
                    </span>
                </div>
            </span>
        </Form>
    );
};

export default AuthorPage;