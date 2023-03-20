import React, { useState, useEffect } from 'react';
import './BookLookup.css';
import './../SelectDate/DateCompon.css';
import TableCompon from '../TableCompon.js';
import { getBookLookupColumns } from './columnsBookLookup.js';

export function BookLookup({ bookSelected, onBookSelected, caption, bookPick, setBookPick }) {

    function clickChooseBook(id, name) {
        console.log('book selected ' + id + ' ' + name);
        onBookSelected(id, name);
    }

    const [bookPageState, setBookPageState] = useState({
        pageSize: 10,
        pageNumber: 0
    });
    const [listBookItems, setListBookItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/books')
            .then((response) => response.json())
            .then(entireBody => {
                var bookItems = [];
                entireBody.map(bookItem => {
                    bookItems.push({
                        name: bookItem.name,
                        select: "" + bookItem.id + "-" + bookItem.name,
                    });
                })
                setListBookItems(bookItems);
            });
    }, [bookPageState]);

    const columnItems = React.useMemo(() => getBookLookupColumns(clickChooseBook), []);

    return (
        <span className={(bookPick ? "above" : "hidden") + " date-compon-dialog"}>
            <span className="book-lookup-compon-caption">
                <span className="cap-text-books">{caption}</span><span className="cap-exit-books" onClick={() => { setBookPick(false); }}>X</span>
            </span>
            <span className='bookLookupTable'>
                <TableCompon columnItems={columnItems} dataItems={listBookItems} curPageSize={bookPageState.pageSize} curPageIndex={bookPageState.pageNumber}
                    cssRowH='authorsListHeader' cssCellH='authorsListHeaderItem' cssRow='authorsListItem' cssCell='authorsInfoItem' cssTable='importLookupBookTable' />
            </span>
        </span>
    )
}