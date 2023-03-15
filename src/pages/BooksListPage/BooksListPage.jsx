import React, { useState } from 'react';
import './bookslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import axios from 'axios';
import TableCompon from '../../components/TableCompon.js';

const BooksListPage = ({ setPageRef }) => {
    const [curSelectBook, setCurSelectBook] = useState("");
    const [curSelectBooksPageSize, setCurSelectBooksPageSize] = useState(12);
    const [listBookItems, setListBookItems] = useState([]);

    var aboveBook = '';
    function setAboveBook(param) {
        aboveBook = param;
    }

    function mouseOverBook(e) {
        setAboveBook(e.target.id);
        e.target.className = 'contextOp above';
    }

    function mouseOutBook(e) {
        setAboveBook('');
        e.target.className = 'contextOp';
    }

    function mouseClickBook(e) {
        setCurSelectBook(e.target);
        setPageRef(e.target.id);
    }

    fetch('http://localhost:3001/books')
        .then((response) => response.json())
        .then(entireBody => {
            var bookItems = [];
            entireBody.map(bookItem => {
                bookItems.push({
                    name: bookItem.name,
                    year: bookItem.year,
                    view: "/viewBook?id=" + bookItem.id,
                    edit: "/editBook?id=" + bookItem.id,
                    delete: "/deleteBook?id=" + bookItem.id
                });
            })
            setListBookItems(bookItems);
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
                    const obj = "" + row.cell.value;
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
                    const obj = "" + row.cell.value;
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
        <div className='booksList' id="idBooksListPage" name="idBooksListPage">
            <TableCompon columnItems={columnItems} dataItems={listBookItems} defPage={curSelectBooksPageSize}
                cssRowH={'booksListHeader'} cssCellH={'booksInfoHeader'} cssRow={'booksListItem'} cssCell={'booksInfoItem'} />
        </div>
    );
};

export default BooksListPage;