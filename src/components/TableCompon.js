import { useTable, usePagination } from 'react-table';
import './tablecompon.css';

function TablePageSeqence({ canPreviousPage, canNextPage, pageCount, pageIndex, pageOptions, previousPage, nextPage, gotoPage }) {
    return (
        <span className="pageSeq">
            <span className="pageIndex" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <strong className="pageIndexCenter">
                    &lt;&nbsp;&lt;
                </strong>
            </span>
            <span className="pageIndex" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <strong className="pageIndexCenter">
                    &lt;
                </strong>
            </span>
            <span className="pageIndex">
                <strong className="pageIndexCenter">
                    {pageOptions.length > 0 ? pageIndex + 1 : 0}&nbsp;/&nbsp;{pageOptions.length}
                </strong>
            </span>
            <span className="pageIndex" onClick={() => nextPage()} disabled={!canNextPage}>
                <strong className="pageIndexCenter">
                    &gt;
                </strong>
            </span>
            <span className="pageIndex" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <strong className="pageIndexCenter">
                    &gt;&nbsp;&gt;
                </strong>
            </span>
        </span>
    );
}

function TablePages({ pageSizeCurrent, setPageSizeCurrent }) {
    return (
        <span className="pageSize">
            <select value={pageSizeCurrent} onChange={e => setPageSizeCurrent(Number(e.target.value))}
                style={{ display: 'inline', height: '32px', margin: '3px' }}>
                {[2, 5, 10, 12, 15, 25, 50, 100].map(pageSizeOpt => (
                    <option key={pageSizeOpt} value={pageSizeOpt}>
                        {pageSizeOpt}&nbsp;items
                    </option>
                ))}
            </select>
        </span>
    );
}

function TableItem({ getTableProps, headerGroups, getTableBodyProps, page, prepareRow, cssRowH, cssCellH, cssRow, cssCell }) {
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className={cssRowH}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className={cssCellH}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} className={cssRow}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className={cssCell}
                                    style={{
                                        padding: '1px',
                                        margin: '1px',
                                    }}
                                >{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

function TableCompon({ columnItems, dataItems, defPage, cssRowH, cssCellH, cssRow, cssCell }) {
    let columns = columnItems;
    let data = dataItems;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: defPage },
        },
        usePagination
    )

    return (
        <span className="entireTable">
            <span className="tableHeaderBody">
                <TableItem getTableProps={getTableProps} headerGroups={headerGroups} getTableBodyProps={getTableBodyProps}
                    page={page} prepareRow={prepareRow} cssRowH={cssRowH} cssCellH={cssCellH} cssRow={cssRow} cssCell={cssCell} />
            </span>
            <span className="tableFooter">
                <TablePageSeqence canPreviousPage={canPreviousPage} canNextPage={canNextPage} pageCount={pageCount} pageIndex={pageIndex}
                    pageOptions={pageOptions} previousPage={previousPage} nextPage={nextPage} gotoPage={gotoPage} />
                <TablePages pageSizeCurrent={pageSize} setPageSizeCurrent={setPageSize} />
            </span>
        </span>
    )
}

export default TableCompon;