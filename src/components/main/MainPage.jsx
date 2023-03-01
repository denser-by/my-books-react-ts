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
    ]

    const contextOpsAbout = [
        { icon: "anchor", href: "/contacts", name: "Contacts" },
        { icon: "anchor", href: "/order", name: "Order" },
        { icon: "anchor", href: "/info", name: "Info" }
    ]

    const bookItems = [
        { id: 1, name: "Book1", authors: [1, 5], info: "Book Description 1", year: "1999", cover_img: "anchor" },
        { id: 2, name: "Book2", authors: [3, 5], info: "Book Description 2", year: "1995", cover_img: "anchor" },
        { id: 3, name: "Book3", authors: [1, 3], info: "Book Description 3", year: "2001", cover_img: "anchor" },
        { id: 4, name: "Book4", authors: [1], info: "Book Description 4", year: "2003", cover_img: "anchor" },
        { id: 5, name: "Book5", authors: [3, 5], info: "Book Description 5", year: "2004", cover_img: "anchor" },
        { id: 6, name: "Book6", authors: [1, 3, 5], info: "Book Description 6", year: "2001", cover_img: "anchor" },
        { id: 7, name: "Book7", authors: [1, 5], info: "Book Description 7", year: "2010", cover_img: "anchor" },
        { id: 8, name: "Book8", authors: [3, 5], info: "Book Description 8", year: "1992", cover_img: "anchor" },
        { id: 9, name: "Book9", authors: [1, 3], info: "Book Description 9", year: "1995", cover_img: "anchor" },
        { id: 10, name: "Book10", authors: [1, 3, 5], info: "Book Description 10", year: "2011", cover_img: "anchor" },
        { id: 11, name: "Book11", authors: [1, 5], info: "Book Description 11", year: "1999", cover_img: "anchor" },
        { id: 12, name: "Book12", authors: [3, 5], info: "Book Description 12", year: "1995", cover_img: "anchor" },
        { id: 13, name: "Book13", authors: [1, 3], info: "Book Description 13", year: "2001", cover_img: "anchor" },
        { id: 14, name: "Book14", authors: [1], info: "Book Description 14", year: "2003", cover_img: "anchor" },
        { id: 15, name: "Book15", authors: [3, 5], info: "Book Description 15", year: "2004", cover_img: "anchor" },
        { id: 16, name: "Book16", authors: [1, 3, 5], info: "Book Description 16", year: "2001", cover_img: "anchor" },
        { id: 17, name: "Book17", authors: [1, 5], info: "Book Description 17", year: "2010", cover_img: "anchor" },
        { id: 18, name: "Book18", authors: [3, 5], info: "Book Description 18", year: "1992", cover_img: "anchor" },
        { id: 19, name: "Book19", authors: [1, 3], info: "Book Description 19", year: "1995", cover_img: "anchor" },
        { id: 20, name: "Book20", authors: [1, 3, 5], info: "Book Description 20", year: "2011", cover_img: "anchor" },
        { id: 21, name: "Book21", authors: [1, 5], info: "Book Description 21", year: "1999", cover_img: "anchor" },
        { id: 22, name: "Book22", authors: [3, 5], info: "Book Description 22", year: "1995", cover_img: "anchor" },
        { id: 23, name: "Book23", authors: [1, 3], info: "Book Description 23", year: "2001", cover_img: "anchor" },
        { id: 24, name: "Book24", authors: [1], info: "Book Description 24", year: "2003", cover_img: "anchor" },
        { id: 25, name: "Book25", authors: [3, 5], info: "Book Description 25", year: "2004", cover_img: "anchor" },
        { id: 26, name: "Book26", authors: [1, 3, 5], info: "Book Description 26", year: "2001", cover_img: "anchor" },
        { id: 27, name: "Book27", authors: [1, 5], info: "Book Description 27", year: "2010", cover_img: "anchor" },
        { id: 28, name: "Book28", authors: [3, 5], info: "Book Description 28", year: "1992", cover_img: "anchor" },
        { id: 29, name: "Book29", authors: [1, 3], info: "Book Description 29", year: "1995", cover_img: "anchor" },
        { id: 30, name: "Book30", authors: [1, 3, 5], info: "Book Description 30", year: "2011", cover_img: "anchor" }
    ]

    const authorItems = [
        { id: 1, name: "Author1", info: "Author Description 1", age: "1999", photo: "anchor" },
        { id: 2, name: "Author2", info: "Author Description 2", age: "2000", photo: "anchor" },
        { id: 3, name: "Author3", info: "Author Description 3", age: "2001", photo: "anchor" },
        { id: 4, name: "Author4", info: "Author Description 4", age: "2002", photo: "anchor" },
        { id: 5, name: "Author5", info: "Author Description 5", age: "2003", photo: "anchor" },
        { id: 6, name: "Author6", info: "Author Description 6", age: "2004", photo: "anchor" },
        { id: 7, name: "Author7", info: "Author Description 7", age: "2005", photo: "anchor" },
        { id: 8, name: "Author8", info: "Author Description 8", age: "2006", photo: "anchor" },
        { id: 9, name: "Author9", info: "Author Description 9", age: "2007", photo: "anchor" },
        { id: 11, name: "Author11", info: "Author Description 11", age: "1999", photo: "anchor" },
        { id: 12, name: "Author12", info: "Author Description 12", age: "2000", photo: "anchor" },
        { id: 13, name: "Author13", info: "Author Description 13", age: "2001", photo: "anchor" },
        { id: 14, name: "Author14", info: "Author Description 14", age: "2002", photo: "anchor" },
        { id: 15, name: "Author15", info: "Author Description 15", age: "2003", photo: "anchor" },
        { id: 16, name: "Author16", info: "Author Description 16", age: "2004", photo: "anchor" },
        { id: 17, name: "Author17", info: "Author Description 17", age: "2005", photo: "anchor" },
        { id: 18, name: "Author18", info: "Author Description 18", age: "2006", photo: "anchor" },
        { id: 19, name: "Author19", info: "Author Description 19", age: "2007", photo: "anchor" },
        { id: 21, name: "Author21", info: "Author Description 21", age: "1999", photo: "anchor" },
        { id: 22, name: "Author22", info: "Author Description 22", age: "2000", photo: "anchor" },
        { id: 23, name: "Author23", info: "Author Description 23", age: "2001", photo: "anchor" },
        { id: 24, name: "Author24", info: "Author Description 24", age: "2002", photo: "anchor" },
        { id: 25, name: "Author25", info: "Author Description 25", age: "2003", photo: "anchor" },
        { id: 26, name: "Author26", info: "Author Description 26", age: "2004", photo: "anchor" },
        { id: 27, name: "Author27", info: "Author Description 27", age: "2005", photo: "anchor" },
        { id: 28, name: "Author28", info: "Author Description 28", age: "2006", photo: "anchor" },
        { id: 29, name: "Author29", info: "Author Description 29", age: "2007", photo: "anchor" }
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
            var idx = text.indexOf("?id=");
            return text.substring(idx + "?id=".length);
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

    return (
        <div className="mainPage">
            <h4>{displayCurrent(selectedItem)}</h4>
            <ContextMenu selectedItem={selectedItem} operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)}
                pageRef={pageRef} setPageRef={setPageRef} />

            <span className={requestCheck(pageRef, "/createBook") ? "pageVisible" : "pageHidden"}><BookPage book={getNewBook()} /></span>
            <span className={requestCheck(pageRef, "/viewBook") ? "pageVisible" : "pageHidden"}><BookPage book={getBook(getId(pageRef))} /></span>
            <span className={requestCheck(pageRef, "/editBook") ? "pageVisible" : "pageHidden"}><BookPage book={getBook(getId(pageRef))} /></span>

            <span className={requestCheck(pageRef, "/createAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage author={getNewAuthor()} /></span>
            <span className={requestCheck(pageRef, "/viewAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage author={getAuthor(getId(pageRef))} /></span>
            <span className={requestCheck(pageRef, "/editAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage author={getAuthor(getId(pageRef))} /></span>

            <span className={pageRef == "/viewBooksAll" ? "pageVisible" : "pageHidden"}><BooksListPage bookItems={bookItems} pageRef={pageRef} setPageRef={setPageRef} /></span>
            <span className={pageRef == "/viewAuthorsAll" ? "pageVisible" : "pageHidden"}><AuthorsListPage authorItems={authorItems} pageRef={pageRef} setPageRef={setPageRef} /></span>

            <span className={pageRef == "/deleteBook" ? "pageVisible" : "pageHidden"}><ConfirmationPage book={getBook(getId(pageRef))} /></span>
            <span className={pageRef == "/eraseAllBooks" ? "pageVisible" : "pageHidden"}><ConfirmationPage books={bookItems} /></span>

            <span className={pageRef == "/contacts" ? "pageVisible" : "pageHidden"}><ContactsPage /></span>
            <span className={pageRef == "/order" ? "pageVisible" : "pageHidden"}><OrderPage /></span>
            <span className={pageRef == "/info" ? "pageVisible" : "pageHidden"}><InfoPage /></span>

            <span className={pageRef == "/generate20Authors" ? "pageVisible" : "pageHidden"}><ConfirmationPage /></span>
            <span className={pageRef == "/generate20Books" ? "pageVisible" : "pageHidden"}><ConfirmationPage /></span>
        </div>
    );
};

export default MainPage;