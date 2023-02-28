import React, { useState } from 'react';
import './mainpage.css'
import ContextMenu from './../ContextMenu/ContextMenu';
import BookPage from '../../pages/BookPage/BookPage';
import ConfirmationPage from '../../pages/ConfirmationPage/ConfirmationPage';
import AuthorPage from '../../pages/AuthorPage/AuthorPage';
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
        { icon: "anchor", href: "/createBook", name: "Create" },
        { icon: "anchor", href: "/deleteBook", name: "Delete" },
        { icon: "anchor", href: "/viewBook", name: "View" },
        { icon: "anchor", href: "/editBook", name: "Edit" },
        { icon: "anchor", href: "/eraseAllBooks", name: "Erase All" },
        { icon: "anchor", href: "/generate20Books", name: "Generate 20" }
    ]

    const contextOpsAuthors = [
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

    return (
        <div className="mainPage">
            <h4>{displayCurrent(selectedItem)}</h4>
            <ContextMenu selectedItem={selectedItem} operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)}
                pageRef={pageRef} setPageRef={setPageRef} />

            <span className={pageRef == "/createBook" ? "pageVisible" : "pageHidden"}><BookPage /></span>
            <span className={pageRef == "/viewBook" ? "pageVisible" : "pageHidden"}><BookPage /></span>
            <span className={pageRef == "/editBook" ? "pageVisible" : "pageHidden"}><BookPage /></span>

            <span className={pageRef == "/deleteBook" ? "pageVisible" : "pageHidden"}><ConfirmationPage /></span>
            <span className={pageRef == "/eraseAllBooks" ? "pageVisible" : "pageHidden"}><ConfirmationPage /></span>

            <span className={pageRef == "/viewAuthor" ? "pageVisible" : "pageHidden"}><AuthorPage /></span>
            <span className={pageRef == "/editAuthor" ? "pageVisible" : "pageHidden"}><AuthorPage /></span>

            <span className={pageRef == "/contacts" ? "pageVisible" : "pageHidden"}><ContactsPage /></span>
            <span className={pageRef == "/order" ? "pageVisible" : "pageHidden"}><OrderPage /></span>
            <span className={pageRef == "/info" ? "pageVisible" : "pageHidden"}><InfoPage /></span>

        </div>
    );
};

export default MainPage;