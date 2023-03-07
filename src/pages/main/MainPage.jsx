// import { useState } from 'react';
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
import { PieChart } from 'react-minimal-pie-chart';
import React, { useState } from "react";
import { Chart } from "react-google-charts";
import BookStatPage from '../BookStatPage/BookStatPage';
import AuthorStatPage from '../AuthorStatPage/AuthorStatPage';

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
        { icon: "anchor", href: "/generate20Books", name: "Generate 20" },
        { icon: "anchor", href: "/bookStat", name: "Analytics" }
    ]

    const contextOpsAuthors = [
        { icon: "anchor", href: "/viewAuthorsAll", name: "All Authors" },
        { icon: "anchor", href: "/createAuthor?", name: "Create Author" },
        { icon: "anchor", href: "/generate20Authors", name: "Generate 20" },
        { icon: "anchor", href: "/authorStat", name: "Analytics" }
    ]

    const contextOpsSearch = [
        { icon: "anchor", href: "/search", name: "Search" },
    ]

    const contextOpsAbout = [
        { icon: "anchor", href: "/contacts", name: "Contacts" },
        { icon: "anchor", href: "/order", name: "Order" },
        { icon: "anchor", href: "/info", name: "Info" }
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
            let message = "Are you sure? Delete \"" + first.name + "\" book.";
            return message;
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

    function getGenerate20BooksMsg() {
        let message = "Are you sure? Generate 20 additional books.";
        return message;
    }

    function generate20BooksOk() {
        BooksProvider.generate20Books();
        setPageRef(contextOpsBooks[0].href);
    }

    function generate20BooksCancel() {
        setPageRef(contextOpsBooks[0].href);
    }

    function getGenerate20AuthorsMsg() {
        let message = "Are you sure? Generate 20 additional authors.";
        return message;
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

{/* <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    /> */}

{/* <PieChart radius={12}
  data={[
    { title: 'One', value: 110, color: '#aabbcc' },
    { title: 'Two', value: 15, color: '#031749' },
    { title: 'Three', value: 20, color: '#55ae16' },
  ]}
/>; */}


            <h4>{displayCurrent(selectedItem)}</h4>
            <div className='commonLayout'>
                <ContextMenu operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)}
                    setPageRef={setPageRef} />

                <span className={requestCheck(pageRef, "/createBook") ? "pageVisible" : "pageHidden"}><BookPage create={true} edit={true} closeProc={bookEditorClose} /></span>
                <span className={requestCheck(pageRef, "/viewBook") ? "pageVisible" : "pageHidden"}><BookPage bookId={getId(pageRef)} edit={false} closeProc={bookEditorClose} /></span>
                <span className={requestCheck(pageRef, "/editBook") ? "pageVisible" : "pageHidden"}><BookPage bookId={getId(pageRef)} edit={true} closeProc={bookEditorClose} /></span>

                <span className={requestCheck(pageRef, "/createAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage create={true} edit={true} closeProc={authorEditorClose} /></span>
                <span className={requestCheck(pageRef, "/viewAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage authorId={getId(pageRef)} edit={false} closeProc={authorEditorClose} /></span>
                <span className={requestCheck(pageRef, "/editAuthor") ? "pageVisible" : "pageHidden"}><AuthorPage authorId={getId(pageRef)} edit={true} closeProc={authorEditorClose} /></span>

                <span className={pageRef == "/viewBooksAll" ? "pageVisible" : "pageHidden"}><BooksListPage setPageRef={setPageRef} /></span>
                <span className={pageRef == "/viewAuthorsAll" ? "pageVisible" : "pageHidden"}><AuthorsListPage setPageRef={setPageRef} /></span>

                <span className={requestCheck(pageRef, "/deleteBook") ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getDeleteBookMsg(getId(pageRef))} answerYesProc={deleteBookOk} answerNoProc={deleteBookCancel} param={getId(pageRef)} btnLabels={['Ok', 'Cancel']} /></span>
                <span className={pageRef == "/eraseAllBooks" ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getDeleteAllBooksMsg()} answerYesProc={deleteAllBooksOk} answerNoProc={deleteAllBooksCancel} btnLabels={['Yes', 'No']} /></span>

                <span className={pageRef == "/generate20Books" ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getGenerate20BooksMsg()} answerYesProc={generate20BooksOk} answerNoProc={generate20BooksCancel} btnLabels={['Yes', 'No']} /></span>

                <span className={pageRef == "/generate20Authors" ? "pageVisible" : "pageHidden"}><ConfirmationPage question={getGenerate20AuthorsMsg()} answerYesProc={generate20AuthorsOk} answerNoProc={generate20AuthorsCancel} btnLabels={['Yes', 'No']} /></span>

                <span className={pageRef == "/search" ? "pageVisible" : "pageHidden"}><SearchPage /></span>

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