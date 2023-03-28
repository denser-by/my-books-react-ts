import React, { useState } from "react";
import './mainpage.css';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import BookPage from '../BookPage/BookPage';
import BooksListPage from '../BooksListPage/BooksListPage';
import ConfirmationPage from '../ConfirmationPage/ConfirmationPage';
import AuthorPage from '../AuthorPage/AuthorPage';
import AuthorsListPage from '../AuthorsListPage/AuthorsListPage';
import ContactsPage from '../ContactsPage/ContactsPage';
import OrderPage from '../OrderPage/OrderPage';
import InfoPage from '../InfoPage/InfoPage';
import SearchPage from '../SearchPage/SearchPage';
import UserPage from '../UserPage/UserPage';
import BookStatPage from '../BookStatPage/BookStatPage';
import AuthorStatPage from '../AuthorStatPage/AuthorStatPage';
import LocationPage from '../LocationPage/LocationPage';
import UsersListPage from '../UsersListPage/UsersListPage';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = ({ selectedItem, setSelectedItem, navigator }) => {
    const [pageRef, setPageRef] = useState("")

    function displayCurrent(sel) {
        let result = "undef"
        navigator.map(item =>
            result = ((sel == item.icon) ? item.text : result)
        )
        return result;
    }

    function getOps(sel, booksOps, authorsOps, searchOps, aboutOps) {
        let first = navigator.filter(item => sel == item.icon)[0];
        return first.text == "Books" ? booksOps : (first.text == "About" ? aboutOps : (first.text != "Search" ? authorsOps : searchOps));
    }

    const contextOpsBooks = [
        { icon: "anchor", key: "k41", href: "/viewBooksAll", name: "All Books" },
        { icon: "anchor", key: "k42", href: "/createBook?", name: "Create Book" },
        { icon: "anchor", key: "k43", href: "/eraseAllBooks", name: "Erase All" },
        { icon: "anchor", key: "k45", href: "/bookStat", name: "Analytics Online" }
    ]

    const contextOpsAuthors = [
        { icon: "anchor", key: "k11", href: "/viewAuthorsAll", name: "All Authors" },
        { icon: "anchor", key: "k12", href: "/createAuthor?", name: "Create Author" },
        { icon: "anchor", key: "k15", href: "/eraseAllAuthors", name: "Erase All" },
        { icon: "anchor", key: "k14", href: "/authorStat", name: "Analytics Online" }
    ]

    const contextOpsSearch = [
        { icon: "anchor", key: "k21", href: "/search", name: "Filter" },
        { icon: "anchor", key: "k22", href: "/searchWall", name: "Wall" },
        { icon: "anchor", key: "k23", href: "/maps", name: "Location" }
    ]

    const contextOpsAbout = [
        { icon: "anchor", key: "k31", href: "/contacts", name: "Contacts" },
        { icon: "anchor", key: "k32", href: "/order", name: "Order" },
        { icon: "anchor", key: "k33", href: "/info", name: "Info" },
        { icon: "anchor", key: "k34", href: "/setup", name: "Settings" },
        { icon: "anchor", key: "k35", href: "/viewUsersAll", name: "All Users" },
    ]

    function getId(ref) {
        if (ref != null) {
            var text = "" + ref
            if (text.length >= 1) {
                var idx = text.indexOf("?id=");
                if (idx >= 0)
                    return text.substring(idx + "?id=".length);
            }
        }
        return "";
    }

    function requestCheck(ref, pattern) {
        if (ref.startsWith(pattern + "?id="))
            return true;
        if (ref.startsWith(pattern + "?"))
            return true;
        return false;
    }

    function getDeleteBookMsg(bookId) {
        if (bookId != null && ("" + bookId).length > 0) {
            let first = {
                name: ''
            };
            /*
            console.log(' book to GET ' + bookId);
            axios.get('http://localhost:3001/books/' + bookId).then(res => {
                console.log(' book GET complete ' + JSON.stringify(res));
                first = res.data;
                if (first != null && first.name != null && first.name.length > 0) {
                    let message = "Are you sure? Delete \"" + first.name + "\" book.";
                    return message;
                }
            });
            */
            let message = "Are you sure? Delete book item.";
            return message;
        }
    }

    function getDeleteAuthorMsg(authorId) {
        if (authorId != null && ("" + authorId).length > 0) {
            let first = {
                name: ''
            };
            /*
            console.log(' author to GET ' + authorId);
            axios.get('http://localhost:3001/authors/' + authorId).then(res => {
                console.log(' author GET complete ' + JSON.stringify(res));
                first = res.data;
                if (first != null && first.name != null && first.name.length > 0) {
                    let message = "Are you sure? Delete \"" + first.name + "\" author.";
                    return message;
                }
            });
            */
            let message = "Are you sure? Delete author record.";
            return message;
        }
    }


    function deleteBookOk(bookId) {
        console.log(' book to DELETE ' + bookId);
        axios.delete('http://localhost:3001/books/' + bookId).then(res => {
            toast("Book record " + res.data.name + " has been deleted successfully.");
            console.log(' book DELETE complete ' + JSON.stringify(res));
        });
        setPageRef(contextOpsBooks[0].href);
    }

    function deleteAuthorOk(authorId) {
        console.log(' author to DELETE ' + authorId);
        axios.delete('http://localhost:3001/authors/' + authorId).then(res => {
            toast("Author record " + res.data.name + " has been deleted.");
            console.log(' author DELETE complete ' + JSON.stringify(res));
        });
        setPageRef(contextOpsAuthors[0].href);
    }

    function deleteBookCancel() {
        setPageRef(contextOpsBooks[0].href);
    }

    function deleteAuthorCancel() {
        setPageRef(contextOpsAuthors[0].href);
    }

    function getDeleteAllBooksMsg() {
        let message = "Are you sure? Delete all books items.";
        return message;
    }

    function getDeleteAllAuthorsMsg() {
        let message = "Are you sure? Delete all books items.";
        return message;
    }

    function deleteAllBooksOk() {
        console.log('All Books delete start');
        axios.delete('http://localhost:3001/books').then(res => {
            console.log('All Books delete complete ' + JSON.stringify(res));
        });
        console.log('All Books delete After start');
        setPageRef(contextOpsBooks[0].href);
    }

    function deleteAllAuthorsOk() {
        console.log('All Authors delete start');
        axios.delete('http://localhost:3001/authors').then(res => {
            console.log('All Authors delete complete ' + JSON.stringify(res));
        });
        console.log('All Authors delete After start');
        setPageRef(contextOpsAuthors[0].href);
    }

    function bookEditorClose() {
        setPageRef(contextOpsBooks[0].href);
    }

    function authorEditorClose() {
        setPageRef(contextOpsAuthors[0].href);
    }

    function userEditorClose() {
        const item = contextOpsAbout.filter(item => item.key == "k35");
        setPageRef(item.href);
    }

    function deleteAllBooksCancel() {
        setPageRef(contextOpsBooks[0].href);
    }

    function deleteAllAuthorsCancel() {
        setPageRef(contextOpsAuthors[0].href);
    }

    function refPage() {
        return "" + pageRef;
    }

    return (
        <div className="mainPage">
            <h4>{displayCurrent(selectedItem)}</h4>
            <div className='commonLayout'>
                <ContextMenu operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)}
                    setPageRef={setPageRef} />

                <span className={requestCheck(pageRef, "/createBook") ? "pageVisible" : "pageHidden"}><BookPage setPageRef={setPageRef} pr={refPage()} create={true} edit={true} closeProc={bookEditorClose} /></span>
                <span className={requestCheck(pageRef, "/viewBook") ? "pageVisible" : "pageHidden"}><BookPage setPageRef={setPageRef} pr={refPage()} bookId={getId(pageRef)} edit={false} closeProc={bookEditorClose} /></span>
                <span className={requestCheck(pageRef, "/editBook") ? "pageVisible" : "pageHidden"}><BookPage setPageRef={setPageRef} pr={refPage()} bookId={getId(pageRef)} edit={true} closeProc={bookEditorClose} /></span>

                <span className={requestCheck(pageRef, "/createAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage setPageRef={setPageRef} pr2={refPage()} create={true} edit={true} closeProc={authorEditorClose} /></span>
                <span className={requestCheck(pageRef, "/viewAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage setPageRef={setPageRef} pr2={refPage()} authorId={getId(pageRef)} edit={false} closeProc={authorEditorClose} /></span>
                <span className={requestCheck(pageRef, "/editAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage setPageRef={setPageRef} pr2={refPage()} authorId={getId(pageRef)} edit={true} closeProc={authorEditorClose} /></span>

                <span className={requestCheck(pageRef, "/createUser") ? "pageVisible" : "pageHidden"}><UserPage setPageRef={setPageRef} pr2={refPage()} create={true} edit={true} closeProc={userEditorClose} /></span>
                <span className={requestCheck(pageRef, "/viewUser") ? "pageVisible" : "pageHidden"}><UserPage setPageRef={setPageRef} pr2={refPage()} userId={getId(pageRef)} edit={false} closeProc={userEditorClose} /></span>
                <span className={requestCheck(pageRef, "/editUser") ? "pageVisible" : "pageHidden"}><UserPage setPageRef={setPageRef} pr2={refPage()} userId={getId(pageRef)} edit={true} closeProc={userEditorClose} /></span>

                <span className={pageRef == "/viewBooksAll" ? "pageVisible" : "pageHidden"}><BooksListPage setPageRef={setPageRef} pr={refPage()} /></span>
                <span className={pageRef == "/viewAuthorsAll" ? "pageVisible" : "pageHidden"}><AuthorsListPage setPageRef={setPageRef} pr={refPage()} /></span>

                <span className={requestCheck(pageRef, "/deleteBook") ? "pageVisible" : "pageHidden"}><ConfirmationPage pr={refPage()} question={getDeleteBookMsg(getId(pageRef))} answerYesProc={deleteBookOk} answerNoProc={deleteBookCancel} param={getId(pageRef)} btnLabels={['Ok', 'Cancel']} /></span>
                <span className={pageRef == "/eraseAllBooks" ? "pageVisible" : "pageHidden"}><ConfirmationPage pr={refPage()} question={getDeleteAllBooksMsg()} answerYesProc={deleteAllBooksOk} answerNoProc={deleteAllBooksCancel} btnLabels={['Yes', 'No']} /></span>
                <span className={requestCheck(pageRef, "/deleteAuthor") ? "pageVisible" : "pageHidden"}><ConfirmationPage pr={refPage()} question={getDeleteAuthorMsg(getId(pageRef))} answerYesProc={deleteAuthorOk} answerNoProc={deleteAuthorCancel} param={getId(pageRef)} btnLabels={['Ok', 'Cancel']} /></span>
                <span className={pageRef == "/eraseAllAuthors" ? "pageVisible" : "pageHidden"}><ConfirmationPage pr={refPage()} question={getDeleteAllAuthorsMsg()} answerYesProc={deleteAllAuthorsOk} answerNoProc={deleteAllAuthorsCancel} btnLabels={['Yes', 'No']} /></span>

                <span className={pageRef == "/search" ? "pageVisible" : "pageHidden"}><SearchPage /></span>
                <span className={pageRef == "/maps" ? "pageVisible" : "pageHidden"}><LocationPage pr={refPage()} /></span>

                <span className={pageRef == "/contacts" ? "pageVisible" : "pageHidden"}><ContactsPage /></span>
                <span className={pageRef == "/order" ? "pageVisible" : "pageHidden"}><OrderPage /></span>
                <span className={pageRef == "/info" ? "pageVisible" : "pageHidden"}><InfoPage /></span>
                <span className={pageRef == "/viewUsersAll" ? "pageVisible" : "pageHidden"}><UsersListPage setPageRef={setPageRef} pr={refPage()} /></span>

                <span className={pageRef == "/bookStat" ? "pageVisible" : "pageHidden"}><BookStatPage pr={refPage()} /></span>
                <span className={pageRef == "/authorStat" ? "pageVisible" : "pageHidden"}><AuthorStatPage pr={refPage()} /></span>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MainPage;