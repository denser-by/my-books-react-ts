import { Cell, CellProps } from 'react-table';

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

export function getColumns(mouseClickBook) {
    const COLUMNS = [
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
    ];
    return COLUMNS;
};