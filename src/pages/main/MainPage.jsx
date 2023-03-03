import React, { useState } from 'react';
import './mainpage.css'
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
        { icon: "anchor", href: "/viewBooksAll", name: "All Books" },
        { icon: "anchor", href: "/createBook?", name: "Create Book" },
        { icon: "anchor", href: "/eraseAllBooks", name: "Erase All" },
        { icon: "anchor", href: "/generate20Books", name: "Generate 20" }
    ]

    const contextOpsAuthors = [
        { icon: "anchor", href: "/viewAuthorsAll", name: "All Authors" },
        { icon: "anchor", href: "/createAuthor?", name: "Create Author" },
        { icon: "anchor", href: "/generate20Authors", name: "Generate 20" }
    ]

    const contextOpsSearch = [
        { icon: "anchor", href: "/search", name: "Search" },
    ]

    const contextOpsAbout = [
        { icon: "anchor", href: "/contacts", name: "Contacts" },
        { icon: "anchor", href: "/order", name: "Order" },
        { icon: "anchor", href: "/info", name: "Info" }
    ]

    function getNewBook() {
        const bookNewItems = [
            { id: 1, name: "", authors: [], info: "", year: "", cover_img: "" },
        ]
        var newBook = bookNewItems[0];
        newBook.id = BooksProvider.size() + 1;
        // newBook.id = book2Items.length + 1;
        return newBook;
    }

    function getBook(idx) {
        if (("" + idx).length >= 1 && idx > 0)
            return BooksProvider.byIndex(idx - 1);
        // return book2Items[idx - 1];
        return BooksProvider.byIndex(0);
        // return book2Items[0];
    }

    function getNewAuthor() {
        const authorNewItems = [
            { id: 1, name: "", info: "", age: "", photo: "" },
        ]
        var newAuthor = authorNewItems[0];
        newAuthor.id = AuthorsProvider.size() + 1;
        // newAuthor.id = author2Items.length + 1;
        return newAuthor;
    }

    function getAuthor(idx) {
        if (("" + idx).length >= 1 && idx > 0)
            return AuthorsProvider.byIndex(idx - 1);
        // return author2Items[idx - 1];
        return AuthorsProvider.byIndex(0);
        // return author2Items[0];
    }

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
            // let first = book2Items.filter(book => bookId == book.id)[0];
            let first = BooksProvider.find(bookId);
            let message = "Are you sure? Delete \"" + first.name + "\" book.";
            return message;
        }
        return "";
    }

    function deleteBookOk(bookId) {
        alert('deleteBookOk' + bookId)
    }

    function deleteBookCancel() {
        setPageRef(contextOpsBooks[0].href)
    }

    function getDeleteAllBooksMsg() {
        let message = "Are you sure? Delete all " + BooksProvider.size() + " books items.";
        // let message = "Are you sure? Delete all " + book2Items.length + " books items.";
        return message;
    }

    function deleteAllBooksOk() {
        alert('deleteAllBooksOk')
    }

    function deleteAllBooksCancel() {
        setPageRef(contextOpsBooks[0].href)
    }

    return (
        <div className="mainPage">
            <h4>{displayCurrent(selectedItem)}</h4>
            <ContextMenu selectedItem={selectedItem} operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)}
                pageRef={pageRef} setPageRef={setPageRef} />

            <span className={requestCheck(pageRef, "/createBook") ? "pageVisible" : "pageHidden"}><BookPage book={getNewBook()} edit={true} /></span>
            <span className={requestCheck(pageRef, "/viewBook") ? "pageVisible" : "pageHidden"}><BookPage book={getBook(getId(pageRef))} edit={false} /></span>
            <span className={requestCheck(pageRef, "/editBook") ? "pageVisible" : "pageHidden"}><BookPage book={getBook(getId(pageRef))} edit={true} /></span>

            <span className={requestCheck(pageRef, "/createAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage author={getNewAuthor()} edit={true} /></span>
            <span className={requestCheck(pageRef, "/viewAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage author={getAuthor(getId(pageRef))} edit={false} /></span>
            <span className={requestCheck(pageRef, "/editAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage author={getAuthor(getId(pageRef))} edit={true} /></span>

            <span className={pageRef == "/viewBooksAll" ? "pageVisible" : "pageHidden"}><BooksListPage pageRef={pageRef} setPageRef={setPageRef} /></span>
            <span className={pageRef == "/viewAuthorsAll" ? "pageVisible" : "pageHidden"}><AuthorsListPage pageRef={pageRef} setPageRef={setPageRef} /></span>

            <span className={requestCheck(pageRef, "/deleteBook") ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getDeleteBookMsg(getId(pageRef))} answerYesProc={deleteBookOk} answerNoProc={deleteBookCancel} param={getId(pageRef)} btnLabels={['Ok', 'Cancel']} /></span>
            <span className={pageRef == "/eraseAllBooks" ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getDeleteAllBooksMsg()} answerYesProc={deleteAllBooksOk} answerNoProc={deleteAllBooksCancel} btnLabels={['Yes', 'No']} /></span>

            <span className={pageRef == "/search" ? "pageVisible" : "pageHidden"}><SearchPage /></span>

            <span className={pageRef == "/contacts" ? "pageVisible" : "pageHidden"}><ContactsPage /></span>
            <span className={pageRef == "/order" ? "pageVisible" : "pageHidden"}><OrderPage /></span>
            <span className={pageRef == "/info" ? "pageVisible" : "pageHidden"}><InfoPage /></span>
        </div>
    );
};

export default MainPage;