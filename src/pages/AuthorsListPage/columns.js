import { Cell, CellProps } from 'react-table';

var aboveAuthorId = '';
var aboveAuthorTarget = null;
function setAboveAuthor(param, target) {
    aboveAuthorId = param;
    if (aboveAuthorTarget != null)
        aboveAuthorTarget.className = 'contextAuthorOp';
    aboveAuthorTarget = target;
}

function mouseOverAuthor(e) {
    setAboveAuthor(e.target.id, e.target);
    e.target.className = 'contextAuthorOp above';
}

function mouseOutAuthor(e) {
    setAboveAuthor('', e.target);
    e.target.className = 'contextAuthorOp';
}

export function getColumns(mouseClickAuthor) {
    const COLUMNS = [
        {
            Header: '№',
            accessor: 'seq_num',
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
            Header: 'Age',
            accessor: 'age',
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <nobr>{row.cell.value}</nobr>;
            },
        },
        {
            Header: 'Books',
            accessor: 'numOfBooks',
            sortType: 'basic',
        },
        {
            Header: 'View',
            accessor: 'view',
            Cell: (row: CellProps<any>) => {
                const obj = "" + row.cell.value;
                return <span id={obj}
                    className={aboveAuthorId === obj ? "contextAuthorOp above" : "contextAuthorOp"}
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
                    className={aboveAuthorId === obj ? "contextAuthorOp above" : "contextAuthorOp"}
                    onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={mouseClickAuthor}
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
                    className={aboveAuthorId === obj ? "contextAuthorOp above" : "contextAuthorOp"}
                    onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={mouseClickAuthor}
                >Delete</span>;
            },
        },
    ];
    return COLUMNS;
};