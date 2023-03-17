import React, { useState, useEffect } from 'react';
import './bookslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import TableCompon from '../../components/TableCompon.js';
import { fineDate } from './../common.js';

const BooksListPage = ({ setPageRef, pr }) => {
    if (pr.indexOf("BooksAll") < 1) return;

    const [curSelectBook, setCurSelectBook] = useState("");
    const [bookPageState, setBookPageState] = useState({
        pageSize: 10,
        pageNumber: 0
    });
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

    useEffect(() => {
        fetch('http://localhost:3001/books')
            .then((response) => response.json())
            .then(entireBody => {
                // console.log('ENTIRE ' + JSON.stringify(entireBody));
                var bookItems = [];
                var seq_num = 1;
                entireBody.map(bookItem => {
                    bookItems.push({
                        seq_num: seq_num,
                        name: bookItem.name,
                        year: bookItem.year,
                        modified: fineDate(new Date(bookItem.updatedAt)),
                        view: "/viewBook?id=" + bookItem.id,
                        edit: "/editBook?id=" + bookItem.id,
                        delete: "/deleteBook?id=" + bookItem.id
                    });
                    seq_num++;
                })
                setListBookItems(bookItems);
            });
    }, [bookPageState]);

    const columnItems = React.useMemo(
        () => [
            {
                Header: '№',
                accessor: 'seq_num',
                sortType: 'basic',
                Cell: (row: CellProps<any>) => {
                    return <center><strong>{row.cell.value}.</strong></center>;
                },
            },
            {
                Header: 'Name',
                accessor: 'name',
                sortType: 'basic',
            },
            {
                Header: 'Year',
                accessor: 'year',
                sortType: 'basic',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
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
                Header: 'Updated',
                accessor: 'modified',
                sortType: 'datetime',
                Cell: (row: CellProps<any>) => {
                    return <nobr>{row.cell.value}</nobr>;
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
            <TableCompon columnItems={columnItems} dataItems={listBookItems} curPageSize={bookPageState.pageSize} curPageIndex={bookPageState.pageNumber}
                cssRowH={'booksListHeader'} cssCellH={'booksInfoHeader'} cssRow={'booksListItem'} cssCell={'booksInfoItem'} />
        </div>
    );
};

export default BooksListPage;