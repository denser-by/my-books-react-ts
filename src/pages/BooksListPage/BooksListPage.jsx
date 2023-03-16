import React, { useState } from 'react';
import './bookslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import axios from 'axios';
// import { Form, Input, Button } from 'reactstrap';
import TableCompon from '../../components/TableCompon.js';

const BooksListPage = ({ setPageRef, pr }) => {
    if (pr.indexOf("BooksAll") < 1) return;

    const [curSelectBook, setCurSelectBook] = useState("");
    const [curSelectBooksPageSize, setCurSelectBooksPageSize] = useState(12);
    const [listBookItems, setListBookItems] = useState([]);

    var aboveBookId = '';
    var aboveBookTarget = null;
    function setAboveBook(param, target) {
        aboveBookId = param;
        if (aboveBookTarget != null)
            aboveBookTarget.className = 'contextBookOp';
        aboveBookTarget = target;
    }

    function mouseOverBook(e) {
        setAboveBook(e.target.id, e.target);
        e.target.className = 'contextBookOp above';
    }

    function mouseOutBook(e) {
        setAboveBook('', e.target);
        e.target.className = 'contextBookOp';
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
                    // return <Button id={obj} type="button" onClick={mouseClickBook}>View</Button>;
                    return <span id={obj}
                        className={aboveBookId === obj ? "contextBookOp above" : "contextBookOp"}
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
                        className={aboveBookId === obj ? "contextBookOp above" : "contextBookOp"}
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
                        className={aboveBookId === obj ? "contextBookOp above" : "contextBookOp"}
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