import React, { useState } from 'react';
import './authorslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import AuthorsProvider from '../../model/AuthorsProvider';
import TableCompon from '../../components/TableCompon.js';

const AuthorsListPage = ({ setPageRef }) => {
    const [curSelectAuthor, setCurSelectAuthor] = useState("");

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

    let authorItems = AuthorsProvider.all();

    authorItems.map(author => {
        author.view = "/viewAuthor?id=" + author.id;
        author.edit = "/editAuthor?id=" + author.id;
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
            <TableCompon columnItems={columnItems} dataItems={authorItems} defPage={15}
                cssRowH={'authorsListHeader'} cssCellH={'authorsInfoHeader'} cssRow={'authorsListItem'} cssCell={'authorsInfoItem'} />
        </div>
    );
};

export default AuthorsListPage;