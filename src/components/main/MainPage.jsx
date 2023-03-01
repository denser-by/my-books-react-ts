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
        { icon: "anchor", href: "/viewBooksAll", name: "View All" },
        { icon: "anchor", href: "/createBook", name: "Create" },
        { icon: "anchor", href: "/deleteBook", name: "Delete" },
        { icon: "anchor", href: "/viewBook", name: "View" },
        { icon: "anchor", href: "/editBook", name: "Edit" },
        { icon: "anchor", href: "/eraseAllBooks", name: "Erase All" },
        { icon: "anchor", href: "/generate20Books", name: "Generate 20" }
    ]

    const contextOpsAuthors = [
        { icon: "anchor", href: "/viewAuthorsAll", name: "View All" },
        { icon: "anchor", href: "/viewAuthor", name: "View" },
        { icon: "anchor", href: "/editAuthor", name: "Edit" }
    ]

    const contextOpsSearch = [
    ]

    const contextOpsAbout = [
        { icon: "anchor", href: "/contacts", name: "Contacts" },
        { icon: "anchor", href: "/order", name: "Order" },
        { icon: "anchor", href: "/info", name: "Info" }
    ]

    const bookItems = [
        { name: "Book1", authors: [1, 5], info: "Description 1", year: "1999", cover_img: "anchor" },
        { name: "Book2", authors: [3, 5], info: "Description 2", year: "1995", cover_img: "anchor" },
        { name: "Book3", authors: [1, 3], info: "Description 3", year: "2001", cover_img: "anchor" },
        { name: "Book4", authors: [1], info: "Description 4", year: "2003", cover_img: "anchor" },
        { name: "Book5", authors: [3, 5], info: "Description 5", year: "2004", cover_img: "anchor" },
        { name: "Book6", authors: [1, 3, 5], info: "Description 6", year: "2001", cover_img: "anchor" },
        { name: "Book7", authors: [1, 5], info: "Description 7", year: "2010", cover_img: "anchor" },
        { name: "Book8", authors: [3, 5], info: "Description 8", year: "1992", cover_img: "anchor" },
        { name: "Book9", authors: [1, 3], info: "Description 9", year: "1995", cover_img: "anchor" },
        { name: "Book10", authors: [1, 3, 5], info: "Description 10", year: "2011", cover_img: "anchor" },
        { name: "Book11", authors: [1, 5], info: "Description 11", year: "1999", cover_img: "anchor" },
        { name: "Book12", authors: [3, 5], info: "Description 12", year: "1995", cover_img: "anchor" },
        { name: "Book13", authors: [1, 3], info: "Description 13", year: "2001", cover_img: "anchor" },
        { name: "Book14", authors: [1], info: "Description 14", year: "2003", cover_img: "anchor" },
        { name: "Book15", authors: [3, 5], info: "Description 15", year: "2004", cover_img: "anchor" },
        { name: "Book16", authors: [1, 3, 5], info: "Description 16", year: "2001", cover_img: "anchor" },
        { name: "Book17", authors: [1, 5], info: "Description 17", year: "2010", cover_img: "anchor" },
        { name: "Book18", authors: [3, 5], info: "Description 18", year: "1992", cover_img: "anchor" },
        { name: "Book19", authors: [1, 3], info: "Description 19", year: "1995", cover_img: "anchor" },
        { name: "Book20", authors: [1, 3, 5], info: "Description 20", year: "2011", cover_img: "anchor" },
        { name: "Book21", authors: [1, 5], info: "Description 21", year: "1999", cover_img: "anchor" },
        { name: "Book22", authors: [3, 5], info: "Description 22", year: "1995", cover_img: "anchor" },
        { name: "Book23", authors: [1, 3], info: "Description 23", year: "2001", cover_img: "anchor" },
        { name: "Book24", authors: [1], info: "Description 24", year: "2003", cover_img: "anchor" },
        { name: "Book25", authors: [3, 5], info: "Description 25", year: "2004", cover_img: "anchor" },
        { name: "Book26", authors: [1, 3, 5], info: "Description 26", year: "2001", cover_img: "anchor" },
        { name: "Book27", authors: [1, 5], info: "Description 27", year: "2010", cover_img: "anchor" },
        { name: "Book28", authors: [3, 5], info: "Description 28", year: "1992", cover_img: "anchor" },
        { name: "Book29", authors: [1, 3], info: "Description 29", year: "1995", cover_img: "anchor" },
        { name: "Book30", authors: [1, 3, 5], info: "Description 30", year: "2011", cover_img: "anchor" }
    ]

    const authorItems = [
        { name: "Author1", info: "Description 1", age: "1999", photo: "anchor" },
        { name: "Author2", info: "Description 2", age: "2000", photo: "anchor" },
        { name: "Author3", info: "Description 3", age: "2001", photo: "anchor" },
        { name: "Author4", info: "Description 4", age: "2002", photo: "anchor" },
        { name: "Author5", info: "Description 5", age: "2003", photo: "anchor" },
        { name: "Author6", info: "Description 6", age: "2004", photo: "anchor" },
        { name: "Author7", info: "Description 7", age: "2005", photo: "anchor" },
        { name: "Author8", info: "Description 8", age: "2006", photo: "anchor" },
        { name: "Author9", info: "Description 9", age: "2007", photo: "anchor" },
        { name: "Author11", info: "Description 11", age: "1999", photo: "anchor" },
        { name: "Author12", info: "Description 12", age: "2000", photo: "anchor" },
        { name: "Author13", info: "Description 13", age: "2001", photo: "anchor" },
        { name: "Author14", info: "Description 14", age: "2002", photo: "anchor" },
        { name: "Author15", info: "Description 15", age: "2003", photo: "anchor" },
        { name: "Author16", info: "Description 16", age: "2004", photo: "anchor" },
        { name: "Author17", info: "Description 17", age: "2005", photo: "anchor" },
        { name: "Author18", info: "Description 18", age: "2006", photo: "anchor" },
        { name: "Author19", info: "Description 19", age: "2007", photo: "anchor" },
        { name: "Author21", info: "Description 21", age: "1999", photo: "anchor" },
        { name: "Author22", info: "Description 22", age: "2000", photo: "anchor" },
        { name: "Author23", info: "Description 23", age: "2001", photo: "anchor" },
        { name: "Author24", info: "Description 24", age: "2002", photo: "anchor" },
        { name: "Author25", info: "Description 25", age: "2003", photo: "anchor" },
        { name: "Author26", info: "Description 26", age: "2004", photo: "anchor" },
        { name: "Author27", info: "Description 27", age: "2005", photo: "anchor" },
        { name: "Author28", info: "Description 28", age: "2006", photo: "anchor" },
        { name: "Author29", info: "Description 29", age: "2007", photo: "anchor" }

    ]


    function getBook(idx) {
        return bookItems[idx];
    }

    function getAuthor(idx) {
        return authorItems[idx];
    }


    return (
        <div className="mainPage">
            <h4>{displayCurrent(selectedItem)}</h4>
            <ContextMenu selectedItem={selectedItem} operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)}
                pageRef={pageRef} setPageRef={setPageRef} />

            <span className={pageRef == "/createBook" ? "pageVisible" : "pageHidden"}><BookPage book={getBook(0)} /></span>
            <span className={pageRef == "/viewBook" ? "pageVisible" : "pageHidden"}><BookPage book={getBook(1)} /></span>
            <span className={pageRef == "/editBook" ? "pageVisible" : "pageHidden"}><BookPage book={getBook(2)} /></span>

            <span className={pageRef == "/viewBooksAll" ? "pageVisible" : "pageHidden"}><BooksListPage bookItems={bookItems} /></span>

            <span className={pageRef == "/deleteBook" ? "pageVisible" : "pageHidden"}><ConfirmationPage book={getBook(2)} /></span>
            <span className={pageRef == "/eraseAllBooks" ? "pageVisible" : "pageHidden"}><ConfirmationPage books={bookItems} /></span>

            <span className={pageRef == "/viewAuthorsAll" ? "pageVisible" : "pageHidden"}><AuthorsListPage authorItems={authorItems} /></span>

            <span className={pageRef == "/viewAuthor" ? "pageVisible" : "pageHidden"}><AuthorPage author={getAuthor(1)} /></span>
            <span className={pageRef == "/editAuthor" ? "pageVisible" : "pageHidden"}><AuthorPage author={getAuthor(3)} /></span>

            <span className={pageRef == "/contacts" ? "pageVisible" : "pageHidden"}><ContactsPage /></span>
            <span className={pageRef == "/order" ? "pageVisible" : "pageHidden"}><OrderPage /></span>
            <span className={pageRef == "/info" ? "pageVisible" : "pageHidden"}><InfoPage /></span>

        </div>
    );
};

export default MainPage;