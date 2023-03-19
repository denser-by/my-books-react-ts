import React, { useState, useEffect } from 'react';
import './AuthorsLookup.css';
import './../SelectDate/DateCompon.css';
import TableCompon from '../TableCompon.js';
import { getAuthorLookupColumns } from './AuthorsLookupColumns.js';

export function AuthorsLookup({ authorsSelected, onAuthorsSelected, caption, authorPick }) {

    function clickChooseAuthor(id, name) {
        console.log('author selected ' + id + ' ' + name);
        onAuthorsSelected(id, name);
    }

    const [authorPageState, setAuthorPageState] = useState({
        pageSize: 10,
        pageNumber: 0
    });
    const [listAuthorItems, setListAuthorItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/authors')
            .then((response) => response.json())
            .then(entireBody => {
                var authorItems = [];
                entireBody.map(authorItem => {
                    authorItems.push({
                        name: authorItem.name,
                        select: "" + authorItem.id + "-" + authorItem.name,
                    });
                })
                setListAuthorItems(authorItems);
            });
    }, [authorPageState]);

    const columnItems = React.useMemo(() => getAuthorLookupColumns(clickChooseAuthor), []);

    return (
        <span className={(authorPick ? "above" : "hidden") + " date-compon-dialog"}>
            <span className="date-compon-caption">
                {caption}
            </span>
            <span className='authorLookupTable'>
                <TableCompon columnItems={columnItems} dataItems={listAuthorItems} curPageSize={authorPageState.pageSize} curPageIndex={authorPageState.pageNumber}
                    cssRowH='booksListHeader' cssCellH='booksListHeaderItem' cssRow='booksListItem' cssCell='booksInfoItem' cssTable='importTable' />
            </span>
        </span>
    )
}