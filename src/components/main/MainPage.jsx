import React, { useState } from 'react';
import './mainpage.css'
import ContextMenu from './../ContextMenu/ContextMenu';
import BookPage from '../../pages/BookPage/BookPage';
import BooksListPage from '../../pages/BooksListPage/BooksListPage';
import ConfirmationPage from '../../pages/ConfirmationPage/ConfirmationPage';
import AuthorPage from '../../pages/AuthorPage/AuthorPage';
import AuthorsListPage from '../../pages/AuthorsListPage/AuthorsListPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage';
import OrderPage from '../../pages/OrderPage/OrderPage';
import InfoPage from '../../pages/InfoPage/InfoPage';
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
import AuthorImage1 from './../../images/author1.gif';
import AuthorImage2 from './../../images/author2.gif';
import AuthorImage3 from './../../images/author3.gif';
import SearchPage from '../../pages/SearchPage/SearchPage';

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

    const bookItems = [
        { id: 1, name: "Book1", authors: [1, 5], info: "Book Description 1", year: 1999, cover_img: BookImage1 },
        { id: 2, name: "Book2", authors: [3, 5], info: "Book Description 2", year: 1995, cover_img: BookImage2 },
        { id: 3, name: "Book3", authors: [1, 3], info: "Book Description 3", year: 2001, cover_img: BookImage3 },
        { id: 4, name: "Book4", authors: [1], info: "Book Description 4", year: 2003, cover_img: BookImage4 },
        { id: 5, name: "Book5", authors: [3, 5], info: "Book Description 5", year: 2004, cover_img: BookImage5 },
        { id: 6, name: "Book6", authors: [1, 3, 5], info: "Book Description 6", year: 2001, cover_img: BookImage6 },
        { id: 7, name: "Book7", authors: [1, 5], info: "Book Description 7", year: 2010, cover_img: BookImage7 },
        { id: 8, name: "Book8", authors: [3, 5], info: "Book Description 8", year: 1992, cover_img: BookImage8 },
        { id: 9, name: "Book9", authors: [1, 3], info: "Book Description 9", year: 1995, cover_img: BookImage9 },
        { id: 10, name: "Book10", authors: [1, 3, 5], info: "Book Description 10", year: 2011, cover_img: BookImage10 },
        { id: 11, name: "Book11", authors: [1, 5], info: "Book Description 11", year: 1999, cover_img: BookImage11 },
        { id: 12, name: "Book12", authors: [3, 5], info: "Book Description 12", year: 1995, cover_img: BookImage12 },
        { id: 13, name: "Book13", authors: [1, 3], info: "Book Description 13", year: 2001, cover_img: BookImage1 },
        { id: 14, name: "Book14", authors: [1], info: "Book Description 14", year: 2003, cover_img: BookImage2 },
        { id: 15, name: "Book15", authors: [3, 5], info: "Book Description 15", year: 2004, cover_img: BookImage3 },
        { id: 16, name: "Book16", authors: [1, 3, 5], info: "Book Description 16", year: 2001, cover_img: BookImage4 },
        { id: 17, name: "Book17", authors: [1, 5], info: "Book Description 17", year: 2010, cover_img: BookImage5 },
        { id: 18, name: "Book18", authors: [3, 5], info: "Book Description 18", year: 1992, cover_img: BookImage6 },
        { id: 19, name: "Book19", authors: [1, 3], info: "Book Description 19", year: 1995, cover_img: BookImage7 },
        { id: 20, name: "Book20", authors: [1, 3, 5], info: "Book Description 20", year: 2011, cover_img: BookImage8 },
        { id: 21, name: "Book21", authors: [1, 5], info: "Book Description 21", year: 1999, cover_img: BookImage9 },
        { id: 22, name: "Book22", authors: [3, 5], info: "Book Description 22", year: 1995, cover_img: BookImage10 },
        { id: 23, name: "Book23", authors: [1, 3], info: "Book Description 23", year: 2001, cover_img: BookImage11 },
        { id: 24, name: "Book24", authors: [1], info: "Book Description 24", year: 2003, cover_img: BookImage12 },
        { id: 25, name: "Book25", authors: [3, 5], info: "Book Description 25", year: 2004, cover_img: BookImage1 },
        { id: 26, name: "Book26", authors: [1, 3, 5], info: "Book Description 26", year: 2001, cover_img: BookImage2 },
        { id: 27, name: "Book27", authors: [1, 5], info: "Book Description 27", year: 2010, cover_img: BookImage3 },
        { id: 28, name: "Book28", authors: [3, 5], info: "Book Description 28", year: 1992, cover_img: BookImage4 },
        { id: 29, name: "Book29", authors: [1, 3], info: "Book Description 29", year: 1995, cover_img: BookImage5 },
        { id: 30, name: "Book30", authors: [1, 3, 5], info: "Book Description 30", year: 2011, cover_img: BookImage6 }
    ]

    const authorItems = [
        { id: 1, name: "Author1", books: [1, 3], info: "Author Description 1", age: 1999, photo: AuthorImage1 },
        { id: 2, name: "Author2", books: [2, 4], info: "Author Description 2", age: 2000, photo: AuthorImage2 },
        { id: 3, name: "Author3", books: [1, 3], info: "Author Description 3", age: 2001, photo: AuthorImage3 },
        { id: 4, name: "Author4", books: [2, 4], info: "Author Description 4", age: 2002, photo: AuthorImage1 },
        { id: 5, name: "Author5", books: [1, 3], info: "Author Description 5", age: 2003, photo: AuthorImage2 },
        { id: 6, name: "Author6", books: [2, 4], info: "Author Description 6", age: 2004, photo: AuthorImage3 },
        { id: 7, name: "Author7", books: [1, 3], info: "Author Description 7", age: 2005, photo: AuthorImage1 },
        { id: 8, name: "Author8", books: [2, 4], info: "Author Description 8", age: 2006, photo: AuthorImage2 },
        { id: 9, name: "Author9", books: [1, 3], info: "Author Description 9", age: 2007, photo: AuthorImage3 },
        { id: 11, name: "Author11", books: [2, 4], info: "Author Description 11", age: 1999, photo: AuthorImage1 },
        { id: 12, name: "Author12", books: [1, 3], info: "Author Description 12", age: 2000, photo: AuthorImage2 },
        { id: 13, name: "Author13", books: [2, 4], info: "Author Description 13", age: 2001, photo: AuthorImage3 },
        { id: 14, name: "Author14", books: [1, 3], info: "Author Description 14", age: 2002, photo: AuthorImage1 },
        { id: 15, name: "Author15", books: [2, 4], info: "Author Description 15", age: 2003, photo: AuthorImage2 },
        { id: 16, name: "Author16", books: [1, 3], info: "Author Description 16", age: 2004, photo: AuthorImage3 },
        { id: 17, name: "Author17", books: [2, 4], info: "Author Description 17", age: 2005, photo: AuthorImage1 },
        { id: 18, name: "Author18", books: [1, 3], info: "Author Description 18", age: 2006, photo: AuthorImage2 },
        { id: 19, name: "Author19", books: [2, 4], info: "Author Description 19", age: 2007, photo: AuthorImage3 },
        { id: 21, name: "Author21", books: [1, 3], info: "Author Description 21", age: 1999, photo: AuthorImage1 },
        { id: 22, name: "Author22", books: [2, 4], info: "Author Description 22", age: 2000, photo: AuthorImage2 },
        { id: 23, name: "Author23", books: [1, 3], info: "Author Description 23", age: 2001, photo: AuthorImage3 },
        { id: 24, name: "Author24", books: [2, 4], info: "Author Description 24", age: 2002, photo: AuthorImage1 },
        { id: 25, name: "Author25", books: [1, 3], info: "Author Description 25", age: 2003, photo: AuthorImage2 },
        { id: 26, name: "Author26", books: [2, 4], info: "Author Description 26", age: 2004, photo: AuthorImage3 },
        { id: 27, name: "Author27", books: [1, 3], info: "Author Description 27", age: 2005, photo: AuthorImage1 },
        { id: 28, name: "Author28", books: [2, 4], info: "Author Description 28", age: 2006, photo: AuthorImage2 },
        { id: 29, name: "Author29", books: [1, 3], info: "Author Description 29", age: 2007, photo: AuthorImage3 }
    ]

    function getNewBook() {
        const bookNewItems = [
            { id: 1, name: "", authors: [], info: "", year: "", cover_img: "" },
        ]
        var newBook = bookNewItems[0];
        newBook.id = bookItems.length + 1;
        return newBook;
    }

    function getBook(idx) {
        if (("" + idx).length >= 1 && idx > 0)
            return bookItems[idx - 1];
        return bookItems[0];
    }

    function getNewAuthor() {
        const authorNewItems = [
            { id: 1, name: "", info: "", age: "", photo: "" },
        ]
        var newAuthor = authorNewItems[0];
        newAuthor.id = authorItems.length + 1;
        return newAuthor;
    }

    function getAuthor(idx) {
        if (("" + idx).length >= 1 && idx > 0)
            return authorItems[idx - 1];
        return authorItems[0];
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
            let first = bookItems.filter(book => bookId == book.id)[0];
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
        let message = "Are you sure? Delete all " + bookItems.length + " books items.";
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

            <span className={pageRef == "/viewBooksAll" ? "pageVisible" : "pageHidden"}><BooksListPage bookItems={bookItems} pageRef={pageRef} setPageRef={setPageRef} /></span>
            <span className={pageRef == "/viewAuthorsAll" ? "pageVisible" : "pageHidden"}><AuthorsListPage authorItems={authorItems} pageRef={pageRef} setPageRef={setPageRef} /></span>

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