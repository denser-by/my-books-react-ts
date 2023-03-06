import React, { useState } from 'react';
import './bookslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import axios from 'axios';
import BooksProvider from '../../model/BooksProvider';
import TableCompon from '../../components/TableCompon.js';

const BooksListPage = ({ setPageRef }) => {
    const [aboveBook2, setAboveBook2] = useState("")
    const [curSelectBook, setCurSelectBook] = useState("")

    let aboveBook = '';
    function setAboveBook(param) {
        aboveBook = param;
        setAboveBook2(param)
    }

    function mouseOverBook(e) {
        setAboveBook(e.target.id)
    }

    function mouseOutBook() {
        setAboveBook("")
    }

    function mouseClickBook(e) {
        setCurSelectBook(e.target)
        setPageRef(e.target.id)
    }

    var allRepos = [];
    var allData = '';
    var apiUrl = 'http://localhost:3001/books';
    function checkRestFetch() {
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.get(apiUrl).then((repos) => {
            allRepos = repos.data;
        });
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => allData = data);
    }

    let bookItems = BooksProvider.all();

    bookItems.map(book => {
        book.view = "/viewBook?id=" + book.id;
        book.edit = "/editBook?id=" + book.id;
        book.delete = "/deleteBook?id=" + book.id;
    });

    const columnItems = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Published',
                accessor: 'year',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveBook === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                    >View</span>;
                },
            },
            {
                Header: 'Edit',
                accessor: 'edit',
                Cell: (row: CellProps<any>) => {
                    const obj = row.cell.value;
                    return <span id={obj}
                        className={aboveBook === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                    >Edit</span>;
                },
            },
            {
                Header: 'Delete',
                accessor: 'delete',
                Cell: (row: CellProps<any>) => {
                    const obj = row.cell.value;
                    return <span id={obj}
                        className={aboveBook === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                    >Delete</span>;
                },
            },
        ],
        []
    )

    return (
        <div className='booksList'>
            <TableCompon columnItems={columnItems} dataItems={bookItems} defPage={15} />
        </div>
    );
};

export default BooksListPage;