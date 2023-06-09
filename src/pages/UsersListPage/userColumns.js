import { Cell, CellProps } from 'react-table';
import { TableColumnFilter, TableColumnNotFilterable } from '../../components/TableColumnFilter.js';

var aboveUserId = '';
var aboveUserTarget = null;
function setAboveUser(param, target) {
    aboveUserId = param;
    if (aboveUserTarget != null)
        aboveUserTarget.className = 'contextUserOp';
    aboveUserTarget = target;
}

function mouseOverUser(e) {
    setAboveUser(e.target.id, e.target);
    e.target.className = 'contextUserOp above';
}

function mouseOutUser(e) {
    setAboveUser('', e.target);
    e.target.className = 'contextUserOp';
}

export function getColumns(mouseClickUser) {
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
            Header: 'Login',
            accessor: 'login',
            Filter: TableColumnFilter,
            sortType: 'basic',
        },
        {
            Header: 'Name',
            accessor: 'first_name',
            Filter: TableColumnFilter,
            sortType: 'basic',
        },
        {
            Header: 'Surname',
            accessor: 'last_name',
            Filter: TableColumnFilter,
            sortType: 'basic',
        },
        {
            Header: 'e-mail',
            accessor: 'mailbox',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <center><nobr>{row.cell.value}</nobr></center>;
            },
        },
        {
            Header: 'Deleted',
            accessor: 'deleted',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                return <center>{row.cell.value == 1 ? 'true' : ''}</center>;
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
            accessor: 'view',
            Filter: TableColumnNotFilterable,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                const obj = "" + row.cell.value;
                return <center id={obj}
                    className={aboveUserId === obj ? "contextUserOp above" : "contextUserOp"}
                    onMouseOver={mouseOverUser} onMouseOut={mouseOutUser} onClick={mouseClickUser}
                >View</center>;
            },
        },
    ];
    return COLUMNS;
}