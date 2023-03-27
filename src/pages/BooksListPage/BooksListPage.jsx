import React, { useState, useEffect } from 'react';
import './bookslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import TableCompon from '../../components/TableCompon.js';
import { fineDate } from './../common.js';
import { getColumns } from './columnsBooks.js';

const BooksListPage = ({ setPageRef, pr }) => {
    if (pr.indexOf("BooksAll") < 1) return;

    const [bookPageState, setBookPageState] = useState({
        pageSize: 10,
        pageNumber: 0
    });
    const [listBookItems, setListBookItems] = useState([]);

    function mouseClickBook(e) {
        setPageRef(e.target.id);
    }

    useEffect(() => {
        fetch('http://localhost:3001/books')
            .then((response) => response.json())
            .then(entireBody => {
                var bookItems = [];
                var seq_num = 1;
                entireBody.map(bookItem => {
                    bookItems.push({
                        seq_num: seq_num,
                        numOfAuthors: bookItem.authors.length + (bookItem.authors.length == 1 ? ' author' : ' authors'),
                        name: bookItem.name,
                        year: bookItem.year,
                        pages_num: (bookItem.pages_num != null ? bookItem.pages_num + ' p.' : ''),
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

    const columnItems = React.useMemo(() => getColumns(mouseClickBook), []);

    return (
        <div className='booksList' id="idBooksListPage" name="idBooksListPage">
            <TableCompon columnItems={columnItems} dataItems={listBookItems} curPageSize={bookPageState.pageSize} curPageIndex={bookPageState.pageNumber}
                cssRowH={'booksListHeader'} cssCellH={'booksListHeaderItem'} cssRow={'booksListItem'} cssCell={'booksInfoItem'} cssFooter={'booksListFooter'} />
        </div>
    );
};

export default BooksListPage;