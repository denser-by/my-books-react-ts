import { Cell, CellProps } from 'react-table';
import { TableColumnFilter } from '../TableColumnFilter.js';

export function getBookLookupColumns(mouseClickBook) {

    var aboveAuthorId = '';
    var aboveAuthorTarget = null;
    function setAboveBook(param, target) {
        aboveAuthorId = param;
        if (aboveAuthorTarget != null)
            aboveAuthorTarget.className = 'contextBookOp';
        aboveAuthorTarget = target;
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
            Header: 'Name',
            accessor: 'name',
            Filter: TableColumnFilter,
            sortType: 'basic',
        },
        {
            Header: 'Select',
            accessor: 'select',
            Filter: TableColumnFilter,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                const rcv = "" + row.cell.value;
                const idx = rcv.indexOf('-');
                const idBook = "" + rcv.substring(0, idx);
                const nameBook = "" + rcv.substring(idx + 1);
                let cutIdx = 7;
                if (nameBook.length < cutIdx)
                    cutIdx = nameBook.length;
                const shortName = ' - ' + nameBook.substring(0, cutIdx) + '...';
                return <span id={idBook}
                    className={aboveAuthorId === idBook ? "contextBookOp above" : "contextBookOp"}
                    onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={() => { mouseClickBook(idBook, nameBook); }}
                >Select{shortName}</span>;
            },
        },
    ];
    return COLUMNS;
}