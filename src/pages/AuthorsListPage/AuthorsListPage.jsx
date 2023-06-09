import React, { useState, useEffect } from 'react';
import './authorslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import TableCompon from '../../components/TableCompon.js';
import { fineDate, fineDateShort } from './../common.js';
import { getColumns } from './columns.js';

const AuthorsListPage = ({ setPageRef, pr }) => {
    if (pr.indexOf("AuthorsAll") < 1) return;

    const [authorPageState, setAuthorPageState] = useState({
        pageSize: 10,
        pageNumber: 0
    });
    const [listAuthorItems, setListAuthorItems] = useState([]);

    function mouseClickAuthor(e) {
        setPageRef(e.target.id);
    }

    useEffect(() => {
        fetch('http://localhost:3001/authors')
            .then((response) => response.json())
            .then(entireBody => {
                var authorItems = [];
                var seq_num = 1;
                entireBody.map(authorItem => {
                    authorItems.push({
                        seq_num: seq_num,
                        name: authorItem.name,
                        age: authorItem.age != null ? fineDateShort(new Date(authorItem.age)) : '',
                        modified: fineDate(new Date(authorItem.updatedAt)),
                        numOfBooks: authorItem.books.length + (authorItem.books.length == 1 ? ' book' : ' books'),
                        view: "/viewAuthor?id=" + authorItem.id,
                        edit: "/editAuthor?id=" + authorItem.id,
                        delete: "/deleteAuthor?id=" + authorItem.id
                    });
                    seq_num++;
                })
                setListAuthorItems(authorItems);
            });
    }, [authorPageState]);

    const columnItems = React.useMemo(() => getColumns(mouseClickAuthor), []);

    return (
        <div className='authorsList' id="idAuthorListPage" name="idAuthorListPage">
            <TableCompon columnItems={columnItems} dataItems={listAuthorItems} curPageSize={authorPageState.pageSize} curPageIndex={authorPageState.pageNumber}
                cssRowH={'authorsListHeader'} cssCellH={'authorsListHeaderItem'} cssRow={'authorsListItem'} cssCell={'authorsInfoItem'} cssFooter={'authorsListFooter'} />
        </div>
    );
};

export default AuthorsListPage;