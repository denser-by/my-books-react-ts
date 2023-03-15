import React, { useState } from 'react';
import './authorslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import TableCompon from '../../components/TableCompon.js';

const AuthorsListPage = ({ setPageRef }) => {
    const [curSelectAuthor, setCurSelectAuthor] = useState("");
    const [curSelectAuthorsPageSize, setCurSelectAuthorsPageSize] = useState(12);
    const [listAuthorItems, setListAuthorItems] = useState([]);

    let aboveAuthor = '';
    function setAboveAuthor(param) {
        aboveAuthor = param;
    }

    function mouseOverAuthor(e) {
        setAboveAuthor(e.target.id);
        e.target.className = 'contextOp above';
    }

    function mouseOutAuthor(e) {
        setAboveAuthor('');
        e.target.className = 'contextOp';
    }

    function mouseClickAuthor(e) {
        setCurSelectAuthor(e.target);
        setPageRef(e.target.id);
    }

    fetch('http://localhost:3001/authors')
        .then((response) => response.json())
        .then(entireBody => {
            var authorItems = [];
            entireBody.map(authorItem => {
                authorItems.push({
                    name: authorItem.name,
                    age: authorItem.age,
                    numOfBooks: authorItem.numOfBooks,
                    view: "/viewAuthor?id=" + authorItem.id,
                    edit: "/editAuthor?id=" + authorItem.id
                });
            })
            setListAuthorItems(authorItems);
        });

    const columnItems = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Since',
                accessor: 'age',
            },
            {
                Header: 'Amount',
                accessor: 'numOfBooks',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveAuthor === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={mouseClickAuthor}
                    >View</span>;
                },
            },
            {
                Header: 'Edit',
                accessor: 'edit',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveAuthor === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={mouseClickAuthor}
                    >Edit</span>;
                },
            },
        ],
        []
    )

    return (
        <div className='authorsList' id="idAuthorListPage" name="idAuthorListPage">
            <TableCompon columnItems={columnItems} dataItems={listAuthorItems} defPage={curSelectAuthorsPageSize}
                cssRowH={'authorsListHeader'} cssCellH={'authorsInfoHeader'} cssRow={'authorsListItem'} cssCell={'authorsInfoItem'} />
        </div>
    );
};

export default AuthorsListPage;