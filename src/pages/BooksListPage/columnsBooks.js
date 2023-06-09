import { Cell, CellProps } from 'react-table';
import { TableColumnFilter, TableColumnNotFilterable } from '../../components/TableColumnFilter.js';

export function getColumns(mouseClickBook) {

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
            Header: 'Pages',
            accessor: 'pages_num',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <center>{row.cell.value}</center>;
            },
        },
        {
            Header: 'Year',
            accessor: 'year',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <center>{row.cell.value}</center>;
            },
        },
        {
            Header: 'Authors',
            accessor: 'numOfAuthors',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <center>{row.cell.value}</center>;
            },
        },
        {
            Header: '</>',
            accessor: 'view',
            Filter: TableColumnNotFilterable,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                const obj = "" + row.cell.value;
                return <center id={obj}
                    className={aboveBookId === obj ? "contextBookOp above" : "contextBookOp"}
                    onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                >View</center>;
            },
        },
        {
            Header: '</>',
            accessor: 'edit',
            Filter: TableColumnNotFilterable,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                const obj = "" + row.cell.value;
                return <center id={obj}
                    className={aboveBookId === obj ? "contextBookOp above" : "contextBookOp"}
                    onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                >Edit</center>;
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
                    className={aboveBookId === obj ? "contextBookOp above" : "contextBookOp"}
                    onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                >Delete</span>;
            },
        },
    ];
    return COLUMNS;
}