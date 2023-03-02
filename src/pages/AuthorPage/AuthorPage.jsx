import React, { useState } from 'react';
import './authorpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
// import Author from './../../model/Author';

const AuthorPage = ({ author, edit }) => {

    // const author2 =  Author.findByPk(1);

    const [state, setState] = useState({
        name: author.name,
        age: author.age,
        info: author.info
    })

    function handleInfoChange(event) {
        // alert(event.target.value)
        setState({ info: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        author.info = state.info;
        // alert('Info: ' + state.info);
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
                                className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                            <span className="fieldCurrent">{author.name}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">Born in:</span>
                            <Input type="textarea" id="authorAge" name="authorAge" readOnly={!edit} placeholder="born in"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                            <span className="fieldCurrent">{author.age}</span>
                        </span>
                        <span className="author-info">
                            <span className="author-info-label">List of books:</span>
                            <Input type="textarea" id="authorBooks" name="authorBooks" readOnly={!edit} placeholder="published books list"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"} />
                            <span className="fieldCurrent">{author.books}</span>
                        </span>
                    </span>
                </span>
                <div className="author-info">
                    <span className="author-info-label">Biography:</span>
                    {/* <Input type="textarea" id="authorInfo" name="authorInfo" readOnly={!edit} placeholder="Short books related description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"} /> */}

                    <Input type="textarea" id="authorInfo" name="authorInfo" readOnly={!edit} placeholder="Short books related description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={state.info} onChange={handleInfoChange} />

                    <div className="fieldCurrent">{author.info}</div>
                </div>
                <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                    <Button type="submit">Save</Button>
                </span>
            </span>
        </Form>
    );
};

export default AuthorPage;