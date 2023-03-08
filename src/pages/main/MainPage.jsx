// import { useState } from 'react';
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
import BooksProvider from '../../model/BooksProvider';
import AuthorsProvider from '../../model/AuthorsProvider';
import { PieChart } from 'react-minimal-pie-chart';
import React, { useState } from "react";
import { Chart } from "react-google-charts";
import BookStatPage from '../BookStatPage/BookStatPage';
import AuthorStatPage from '../AuthorStatPage/AuthorStatPage';
import LocationPage from '../LocationPage/LocationPage';

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
        { icon: "anchor", key: "k44", href: "/generate20Books", name: "Generate 20" },
        { icon: "anchor", key: "k45", href: "/bookStat", name: "Analytics" }
    ]

    const contextOpsAuthors = [
        { icon: "anchor", key: "k11", href: "/viewAuthorsAll", name: "All Authors" },
        { icon: "anchor", key: "k12", href: "/createAuthor?", name: "Create Author" },
        { icon: "anchor", key: "k13", href: "/generate20Authors", name: "Generate 20" },
        { icon: "anchor", key: "k14", href: "/authorStat", name: "Analytics" }
    ]

    const contextOpsSearch = [
        { icon: "anchor", key: "k21", href: "/search", name: "Filter" },
        { icon: "anchor", key: "k22", href: "/searchWall", name: "Wall" },
        { icon: "anchor", key: "k23", href: "/maps", name: "Location" }
    ]

    const contextOpsAbout = [
        { icon: "anchor", key: "k31", href: "/contacts", name: "Contacts" },
        { icon: "anchor", key: "k32", href: "/order", name: "Order" },
        { icon: "anchor", key: "k33", href: "/info", name: "Info" }
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
            let first = BooksProvider.find(bookId);
            if (first != null && first.length > 0) {
                let message = "Are you sure? Delete \"" + first.name + "\" book.";
                return message;
            }
        }
        return "";
    }

    function deleteBookOk(bookId) {
        BooksProvider.delete(bookId);
        setPageRef(contextOpsBooks[0].href);
    }

    function deleteBookCancel() {
        setPageRef(contextOpsBooks[0].href);
    }

    function getDeleteAllBooksMsg() {
        let message = "Are you sure? Delete all " + BooksProvider.size() + " books items.";
        return message;
    }

    function getGenerateMsg(req) {
        var message;
        if(req === "20Authors")
            message = "Are you sure? Generate 20 additional authors.";
        else
            message = "Are you sure? Generate 20 additional books.";
        return message;
    }

    function generate20BooksOk() {
        BooksProvider.generate20Books();
        setPageRef(contextOpsBooks[0].href);
    }

    function generate20BooksCancel() {
        setPageRef(contextOpsBooks[0].href);
    }

    function generate20AuthorsOk() {
        AuthorsProvider.generate20Authors();
        setPageRef(contextOpsAuthors[0].href);
    }

    function generate20AuthorsCancel() {
        setPageRef(contextOpsAuthors[0].href);
    }

    function deleteAllBooksOk() {
        const oneByOneDelete = false;
        if (oneByOneDelete) {
            let booksAll = BooksProvider.all();
            booksAll.map(book => BooksProvider.delete(book.id));
        }
        BooksProvider.deleteAll();
        setPageRef(contextOpsBooks[0].href);
    }

    function bookEditorClose() {
        setPageRef(contextOpsBooks[0].href);
    }

    function authorEditorClose() {
        setPageRef(contextOpsAuthors[0].href);
    }

    function deleteAllBooksCancel() {
        setPageRef(contextOpsBooks[0].href);
    }

    return (
        <div className="mainPage">
            <h4>{displayCurrent(selectedItem)}</h4>
            <div className='commonLayout'>
                <ContextMenu operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)}
                    setPageRef={setPageRef} />

                <span className={requestCheck(pageRef, "/createBook") ? "pageVisible" : "pageHidden"}><BookPage setPageRef={setPageRef} pr={"" + pageRef} create={true} edit={true} closeProc={bookEditorClose} /></span>
                <span className={requestCheck(pageRef, "/viewBook") ? "pageVisible" : "pageHidden"}><BookPage setPageRef={setPageRef} pr={"" + pageRef} bookId={getId(pageRef)} edit={false} closeProc={bookEditorClose} /></span>
                <span className={requestCheck(pageRef, "/editBook") ? "pageVisible" : "pageHidden"}><BookPage setPageRef={setPageRef} pr={"" + pageRef} bookId={getId(pageRef)} edit={true} closeProc={bookEditorClose} /></span>

                <span className={requestCheck(pageRef, "/createAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage setPageRef={setPageRef} pr={"" + pageRef} create={true} edit={true} closeProc={authorEditorClose} /></span>
                <span className={requestCheck(pageRef, "/viewAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage setPageRef={setPageRef} pr={"" + pageRef} authorId={getId(pageRef)} edit={false} closeProc={authorEditorClose} /></span>
                <span className={requestCheck(pageRef, "/editAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage setPageRef={setPageRef} pr={"" + pageRef} authorId={getId(pageRef)} edit={true} closeProc={authorEditorClose} /></span>

                <span className={pageRef == "/viewBooksAll" ? "pageVisible" : "pageHidden"}><BooksListPage setPageRef={setPageRef} /></span>
                <span className={pageRef == "/viewAuthorsAll" ? "pageVisible" : "pageHidden"}><AuthorsListPage setPageRef={setPageRef} /></span>

                <span className={requestCheck(pageRef, "/deleteBook") ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getDeleteBookMsg(getId(pageRef))} answerYesProc={deleteBookOk} answerNoProc={deleteBookCancel} param={getId(pageRef)} btnLabels={['Ok', 'Cancel']} /></span>
                <span className={pageRef == "/eraseAllBooks" ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getDeleteAllBooksMsg()} answerYesProc={deleteAllBooksOk} answerNoProc={deleteAllBooksCancel} btnLabels={['Yes', 'No']} /></span>

                <span className={pageRef == "/generate20Books" ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getGenerateMsg} answerYesProc={generate20BooksOk} answerNoProc={generate20BooksCancel} btnLabels={['Yes', 'No']} /></span>
                <span className={pageRef == "/generate20Authors" ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getGenerateMsg('20Authors')} answerYesProc={generate20AuthorsOk} answerNoProc={generate20AuthorsCancel} btnLabels={['Yes', 'No']} /></span>

                <span className={pageRef == "/search" ? "pageVisible" : "pageHidden"}><SearchPage /></span>
                <span className={pageRef == "/maps" ? "pageVisible" : "pageHidden"}><LocationPage /></span>

                <span className={pageRef == "/contacts" ? "pageVisible" : "pageHidden"}><ContactsPage /></span>
                <span className={pageRef == "/order" ? "pageVisible" : "pageHidden"}><OrderPage /></span>
                <span className={pageRef == "/info" ? "pageVisible" : "pageHidden"}><InfoPage /></span>

                <span className={pageRef == "/bookStat" ? "pageVisible" : "pageHidden"}><BookStatPage /></span>
                <span className={pageRef == "/authorStat" ? "pageVisible" : "pageHidden"}><AuthorStatPage /></span>
            </div>
        </div>
    );
};

export default MainPage;