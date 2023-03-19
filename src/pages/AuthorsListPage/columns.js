import { Cell, CellProps } from 'react-table';
import { TableColumnFilter, TableColumnNotFilterable } from '../../components/TableColumnFilter.js';

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
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <center><strong>{row.cell.value}.</strong></center>;
            },
        },
        {
            Header: 'Name',
            accessor: 'name',
            Filter: TableColumnFilter,
            sortType: 'basic',
        },
        {
            Header: 'Age',
            accessor: 'age',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <nobr>{row.cell.value}</nobr>;
            },
        },
        {
            Header: 'Num.',
            accessor: 'numOfBooks',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <center>{row.cell.value} books</center>;
            },
        },
        {
            Header: '</>',
            accessor: 'view',
            Filter: TableColumnNotFilterable,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                const obj = "" + row.cell.value;
                return <span id={obj}
                    className={aboveAuthorId === obj ? "contextAuthorOp above" : "contextAuthorOp"}
                    onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={mouseClickAuthor}
                >View</span>;
            },
        },
        {
            Header: '</>',
            accessor: 'edit',
            Filter: TableColumnNotFilterable,
            sortType: 'basic',
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
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <nobr>{row.cell.value}</nobr>;
            },
        },
        {
            Header: '</>',
            accessor: 'delete',
            Filter: TableColumnNotFilterable,
            sortType: 'basic',
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
}