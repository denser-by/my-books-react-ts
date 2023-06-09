import { Cell, CellProps } from 'react-table';
import { TableColumnFilter, TableColumnNotFilterable } from '../TableColumnFilter.js';

export function getAuthorLookupColumns(mouseClickAuthor) {

    var aboveAuthorId = '';
    var aboveAuthorTarget = null;
    function setAboveAuthor(param, target) {
        aboveAuthorId = param;
        if (aboveAuthorTarget != null)
            aboveAuthorTarget.className = 'contextBookOp';
        aboveAuthorTarget = target;
    }

    function mouseOverAuthor(e) {
        setAboveAuthor(e.target.id, e.target);
        e.target.className = 'contextBookOp above';
    }

    function mouseOutAuthor(e) {
        setAboveAuthor('', e.target);
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
            Filter: TableColumnNotFilterable,
            sortType: 'basic',
            Cell: (row: CellProps<any>) => {
                const rcv = "" + row.cell.value;
                const idx = rcv.indexOf('-');
                const objId = "" + rcv.substring(0, idx);
                const objName = "" + rcv.substring(idx + 1);
                let cutIdx = 7;
                if (objName.length < cutIdx)
                    cutIdx = objName.length;
                const shortName = ' - ' + objName.substring(0, cutIdx) + '...';
                return <span id={objId}
                    className={aboveAuthorId === objId ? "contextBookOp above" : "contextBookOp"}
                    onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={() => { mouseClickAuthor(objId, objName); }}
                >Select{shortName}</span>;
            },
        },
    ];
    return COLUMNS;
}