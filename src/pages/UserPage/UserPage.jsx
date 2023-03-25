import React, { useEffect, useState } from 'react';
import './userpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { getImageUser } from './../pictureSupport.js';

const UserPage = ({ setPageRef, pr2, userId, edit, create, closeProc }) => {
    if (pr2.indexOf("createUser") < 1)
        if (pr2.indexOf("User") < 1 || pr2.indexOf("Users") >= 0 || userId == undefined || userId == null || ("" + userId).length < 1) return;

    const [pageUserState, setPageUserState] = useState({
        userId: userId,
        create: create,
        edit: edit
    });

    var user = {
        id: '1',
        name: '',
        login: '',
        email: '',
        color: '',
        city: '',
        info: '',
        photo_path: '',
        photo_data: ''
    };

    function getNameField(userRef) {
        return userRef.first_name + ' ' + userRef.last_name;
    }

    useEffect(() => {
        if (!create) {
            const request = 'http://localhost:3001/users/' + userId;
            console.log('AP=' + request);
            fetch(request)
                .then((response) => response.json())
                .then(entireBody => {
                    if (userId == entireBody.id) {
                        console.log('entUser=' + JSON.stringify(entireBody));
                        user = {
                            id: entireBody.id,
                            name: getNameField(entireBody),
                            login: entireBody.login,
                            email: entireBody.email,
                            color: entireBody.favorite_color,
                            city: entireBody.from_city,
                            info: entireBody.info,
                            photo_path: entireBody.photo_path,
                            photo_data: entireBody.photo_data
                        };
                        console.log('userObj =' + JSON.stringify(user));

                        if (!nameModified) {
                            setStateName(user.name);
                            setNameModified(true);
                        }
                        if (!loginModified) {
                            setStateLogin(user.login);
                            setLoginModified(true);
                        }
                        if (!emailModified) {
                            setStateEMail(user.email);
                            setEmailModified(true);
                        }
                        if (!colorModified) {
                            setStateColor(user.color);
                            setColorModified(true);
                        }
                        if (!cityModified) {
                            setStateCity(user.city);
                            setCityModified(true);
                        }
                        if (!stateInfo) {
                            setStateInfo(user.info);
                            setInfoModified(true);
                        }
                        if (!imageUploaded) {
                            setMyImage(getImageUser(user));
                            setImageUploaded(true);
                        }
                    }
                });
        }
    }, [pageUserState]);

    const [stateName, setStateName] = useState('');
    const [stateLogin, setStateLogin] = useState('');
    const [stateEMail, setStateEMail] = useState('');
    const [stateColor, setStateColor] = useState('');
    const [stateCity, setStateCity] = useState('');
    const [stateInfo, setStateInfo] = useState('');

    const [nameModified, setNameModified] = React.useState(false);
    const [loginModified, setLoginModified] = React.useState(false);
    const [emailModified, setEmailModified] = React.useState(false);
    const [colorModified, setColorModified] = React.useState(false);
    const [cityModified, setCityModified] = React.useState(false);
    const [infoModified, setInfoModified] = React.useState(false);

    const [state, setState] = useState({
        name: '',
        login: '',
        email: '',
        color: '',
        city: '',
        info: ''
    })

    function handleNameChange(event) {
        setStateName(event.target.value);
        setState({ name: event.target.value });
        setNameModified(true);
    }

    function handleLoginChange(event) {
        setStateLogin(event.target.value);
        setState({ login: event.target.value });
        setLoginModified(true);
    }

    function handleEMailChange(event) {
        setStateEMail(event.target.value);
        setState({ email: event.target.value });
        setEmailModified(true);
    }

    function handleColorChange(event) {
        setStateColor(event.target.value);
        setState({ color: event.target.value });
        setColorModified(true);
    }

    function handleCityChange(event) {
        setStateCity(event.target.value);
        setState({ city: event.target.value });
        setCityModified(true);
    }

    function handleInfoChange(event) {
        setStateInfo(event.target.value);
        setState({ info: event.target.value });
        setInfoModified(true);
    }

    function onUserView() {
        // alert('edit-book-press');
        setPageRef("/viewUser?id=" + userId);
    }

    function onUserEdit() {
        // alert('edit-user-press');
        setPageRef("/editUser?id=" + userId);
    }

    function onUserExport() {
        alert('export-user-press');
    }

    function onUserExit() {
        // alert('exit-user-press');
        setPageRef("/viewUsersAll");
    }

    function onImageUploadViewMode() {
        console.log('no editing');
    }

    function handleSubmit(event) {
        event.preventDefault();
        // user.name = state.name;
        // user.age = state.age;
        // user.books = state.books;
        // user.info = state.info;

        if (nameModified)
            user.name = stateName;

        if (infoModified)
            user.info = stateInfo;
        if (imageUploaded) {
            // user.photo_path = myImage;
            user.photo_data = myImage;
        }

        if (user.id != null && ('' + user.id).length > 0)
            user.id = Number.parseInt('' + user.id);
        else
            user.id = '';

        if (create) {
            console.log(' user to POST ' + JSON.stringify(user));
            axios.post('http://localhost:3001/users', user).then(res => {
                console.log(' user POST complete ' + JSON.stringify(res));
            });
            console.log(' create complete ');
        } else if (edit) {
            console.log(' user to PUT ' + JSON.stringify(user));
            axios.put('http://localhost:3001/users', user).then(res => {
                console.log(' user PUT complete ' + JSON.stringify(res));
            });
            console.log(' update complete ');
        }

        setStateName('');
        setState({ name: '' });
        setNameModified(false);
        setStateLogin('');
        setState({ login: '' });
        setLoginModified(false);
        setState({ email: '' });
        setEmailModified(false);
        setStateEMail('');
        setState({ color: '' });
        setColorModified(false);
        setStateColor('');
        setState({ city: '' });
        setCityModified(false);
        setStateCity('');
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

    const onUsersPhotoPathChange = (imageList, addUpdateIndex) => {
        // console.log('start <' + images.length + '>');
        imageList.map(ii => {
            setMyImage(ii.data_url);
            setImageUploaded(true);
            console.log('keep posted <' + addUpdateIndex + '>');
        });
    };

    function isPhotoPathDefined() {
        return user.photo_path != null && user.photo_path.length > 0;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <span className="userShape" id="idUserPage" name="idUserPage">
                <span className='userShapeHeader'>
                    <span className="picture">
                        <ImageUploading
                            multiple
                            onChange={onUsersPhotoPathChange}
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
                                    alt="Place for user's photo..."
                                    src={imageUploaded ? myImage : (isPhotoPathDefined() ? getImageUser(user) : myImage)} />
                            )}
                        </ImageUploading>
                    </span>
                    <span className="icons-right">
                        <span className="user-info">
                            <span className="user-info-label">Name</span>
                            <Input type="textarea" id="userName" name="userName" readOnly={!edit} placeholder="User name"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={nameModified ? stateName : user.name} onChange={handleNameChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent userRead"}>{nameModified ? stateName : user.name}</span>
                        </span>
                        <span className="user-info">
                            <span className="user-info-label">Login</span>
                            <Input type="textarea" id="loginName" name="loginName" readOnly={!edit} placeholder="Login"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={loginModified ? stateLogin : user.login} onChange={handleLoginChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent userRead"}>{nameModified ? stateLogin : user.login}</span>
                        </span>
                        <span className="user-info">
                            <span className="user-info-label">Mailbox</span>
                            <Input type="textarea" id="mailbox" name="mailbox" readOnly={!edit} placeholder="e-mail"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={emailModified ? stateEMail : user.email} onChange={handleEMailChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent userRead"}>{emailModified ? stateEMail : user.email}</span>
                        </span>
                        <span className="user-info">
                            <span className="user-info-label">Favorite color</span>
                            <Input type="textarea" id="color" name="color" readOnly={!edit} placeholder="favorite color"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={colorModified ? stateColor : user.color} onChange={handleColorChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent userRead"}>{colorModified ? stateColor : user.color}</span>
                        </span>
                        <span className="user-info">
                            <span className="user-info-label">City</span>
                            <Input type="textarea" id="city" name="city" readOnly={!edit} placeholder="city location"
                                className={!edit ? "ctrlHidden" : "fieldCurrent"}
                                value={cityModified ? stateCity : user.city} onChange={handleCityChange} />
                            <span className={create || edit ? "ctrlHidden" : "fieldCurrent userRead"}>{cityModified ? stateCity : user.city}</span>
                        </span>
                    </span>
                </span>
                <div className="user-info">
                    <span className="user-info-label">Introduce</span>
                    <Input type="textarea" id="userInfo" name="userInfo" readOnly={!edit} placeholder="Short books related description"
                        className={!edit ? "ctrlHidden" : "fieldCurrent"}
                        value={infoModified ? stateInfo : user.info} onChange={handleInfoChange} />
                    <div className={create || edit ? "ctrlHidden" : "fieldCurrent userRead"}>{infoModified ? stateInfo : user.info}</div>
                </div>
                <div className="buttonRow">
                    <span className={edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onUserView}>View</Button>
                    </span>
                    <span className={!edit ? "ctrlHidden" : "fieldSubmit"}>
                        <Button type="submit">{create ? "Create" : "Save"}</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onUserEdit}>Edit</Button>
                    </span>
                    <span className={!edit && !create ? "featureButton" : "ctrlHidden"}>
                        <Button type="button" onClick={onUserExport}>Export</Button>
                    </span>
                    <span className="featureButton">
                        <Button type="button" onClick={onUserExit}>Cancel</Button>
                    </span>
                </div>
            </span>
        </Form>
    );
};

export default UserPage;