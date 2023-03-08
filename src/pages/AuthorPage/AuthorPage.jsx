import React, { useState } from 'react';
import './authorpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import AuthorsProvider from '../../model/AuthorsProvider.js';
import ImageUploading from 'react-images-uploading';

const AuthorPage = ({ pr, authorId, edit, create, closeProc }) => {
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

    const [state, setState] = useState({
        name: '',
        age: '',
        books: '',
        info: ''
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

    function onAuthorEdit() {
        alert('edit-author-press');
    }

    function onAuthorExport() {
        alert('export-author-press');
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

        author.name = stateName;
        author.age = stateAge;
        author.books = stateBooks;
        author.info = stateInfo;
        author.photo = myImage;

        author2.name = stateName;
        author2.age = stateAge;
        author2.books = stateBooks;
        author2.info = stateInfo;
        author2.photo = myImage;

        console.log(' save ' + JSON.stringify(author) + ' ' + JSON.stringify(author2));

        if (create) {
            AuthorsProvider.create(author2);
            console.log(' create complete ');
        } else if (edit) {
            AuthorsProvider.update(author);
            console.log(' update complete ');
        }

        setStateName('');
        setState({ name: '' });
        setStateAge('');
        setState({ age: '' });
        setStateBooks('');
        setState({ books: '' });
        setStateInfo('');
        setState({ info: '' });

        closeProc();
    }

    const [images, setImages] = React.useState([]);
    const [myImage, setMyImage] = React.useState("");
    const [imageUploaded, setImageUploaded] = React.useState(false);

    const onChange = (imageList, addUpdateIndex) => {
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
                                value={stateName} onChange={handleNameChange} />
                            <span className="fieldCurrent">{author.name}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Born</span>
                            <Input type="textarea" id="authorAge" name="authorAge" readOnly={!edit} placeholder="Born in"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={stateAge} onChange={handleAgeChange} />
                            <span className="fieldCurrent">{author.age}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Publications</span>
                            <Input type="textarea" id="authorBooks" name="authorBooks" readOnly={!edit} placeholder="List of published books"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={stateBooks} onChange={handleBooksChange} />
                            <span className="fieldCurrent">{author.books}</span>
                        </span>
                    </span>
                </span>
                <div className="author-info">
                    <span className="author-info-label">Biography</span>
                    <Input type="textarea" id="authorInfo" name="authorInfo" readOnly={!edit} placeholder="Short books related description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={stateInfo} onChange={handleInfoChange} />
                    <div className="fieldCurrent">{author.info}</div>
                </div>
                <div className="buttonRow">
                    <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                        <Button type="submit">{create ? "Create" : "Save"}</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onAuthorEdit}>Edit</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onAuthorExport}>Export</Button>
                    </span>
                </div>
            </span>
        </Form>
    );
};

export default AuthorPage;