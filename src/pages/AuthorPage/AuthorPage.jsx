import React, { useState } from 'react';
import './authorpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import AuthorsProvider from '../../model/AuthorsProvider.js';
import ImageUploading from 'react-images-uploading';

const AuthorPage = ({ setPageRef, pr, authorId, edit, create, closeProc }) => {
    if (pr.indexOf("Book") !== -1) return;
    // console.log('AUTHOR_PAGE<'+ authorId +'><'+ edit+'><'+ create+'>'+pr);

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

    const [nameModified, setNameModified] = React.useState(false);
    const [ageModified, setAgeModified] = React.useState(false);
    const [booksModified, setBooksModified] = React.useState(false);
    const [infoModified, setInfoModified] = React.useState(false);

    const [state, setState] = useState({
        name: '',
        age: '',
        books: '',
        info: ''
    })

    function handleNameChange(event) {
        setStateName(event.target.value);
        setState({ name: event.target.value });
        setNameModified(true);
    }

    function handleAgeChange(event) {
        setStateAge(event.target.value);
        setState({ age: event.target.value });
        setAgeModified(true);
    }

    function handleBooksChange(event) {
        setStateBooks(event.target.value);
        setState({ books: event.target.value });
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
        if (imageUploaded)
            author.photo = myImage;

        if (nameModified)
            author2.name = stateName;
        if (ageModified)
            author2.age = stateAge;
        if (booksModified)
            author2.books = stateBooks;
        if (infoModified)
            author2.info = stateInfo;
        if (imageUploaded)
            author2.photo = myImage;

        if (create) {
            AuthorsProvider.create(author2);
            console.log(' create complete ');
        } else if (edit) {
            AuthorsProvider.update(author);
            console.log(' update complete ');
        }

        setStateName('');
        setState({ name: '' });
        setNameModified(false);
        setStateAge('');
        setState({ age: '' });
        setAgeModified(false);
        setStateBooks('');
        setState({ books: '' });
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

    const onAuthorsPhotoChange = (imageList, addUpdateIndex) => {
        // console.log('start <' + images.length + '>');
        imageList.map(ii => {
            setMyImage(ii.data_url);
            setImageUploaded(true);
            console.log('keep posted <' + addUpdateIndex + '>');
        });
    };

    function isPhotoDefined() {
        return author.photo != null && author.photo.length > 0;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <span className="authorShape" id="idAuthorPage" name="idAuthorPage">
                <span className='authorShapeHeader'>
                    <span className="picture">
                        <ImageUploading
                            multiple
                            onChange={onAuthorsPhotoChange}
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
                                    src={imageUploaded ? myImage : (isPhotoDefined() ? author.photo : myImage)} />
                            )}
                        </ImageUploading>
                    </span>
                    <span className="icons-right">
                        <span className="author-info">
                            <span className="author-info-label">Name</span>
                            <Input type="textarea" id="authorName" name="authorName" readOnly={!edit} placeholder="Author name"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={nameModified ? stateName : author.name} onChange={handleNameChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{author.name}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Born</span>
                            <Input type="textarea" id="authorAge" name="authorAge" readOnly={!edit} placeholder="Born in"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={ageModified ? stateAge : author.age} onChange={handleAgeChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{author.age}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Publications</span>
                            <Input type="textarea" id="authorBooks" name="authorBooks" readOnly={!edit} placeholder="List of published books"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={booksModified ? stateBooks : author.books} onChange={handleBooksChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{author.books}</span>
                        </span>
                    </span>
                </span>
                <div className="author-info">
                    <span className="author-info-label">Biography</span>
                    <Input type="textarea" id="authorInfo" name="authorInfo" readOnly={!edit} placeholder="Short books related description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={infoModified ? stateInfo : author.info} onChange={handleInfoChange} />
                    <div className={create || edit ? "ctrlHidden" : "fieldCurrent"}>{author.info}</div>
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