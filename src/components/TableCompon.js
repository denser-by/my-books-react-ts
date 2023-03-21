import React from 'react';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';
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

function TableRecordCount({ pageSizeCurrent, pageCount, justCount }) {
    return (
        <span className="pageSize pageIndex"><strong>
            {justCount != null && justCount >= 0 ? justCount : (pageSizeCurrent * pageCount)}&nbsp;items</strong>
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
                        Page of &nbsp;{pageSizeOpt}
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
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} className={cssCellH || ''}
                                style={{
                                    padding: '4px',
                                    margin: '4px',
                                    color: 'white',
                                    fontWeight: '800'
                                }}
                            >{column.canFilter ? column.render('Filter') : null}
                                <div className={column.isSorted ? column.isSortedDesc ? "desc" : "asc" : ""}>{column.render('Header')}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} className={cssRow + (i % 2 == 0 ? "" : " secondary")}>
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

function TableComponFooter({ pageSize, setPageSize, canPreviousPage, canNextPage, pageCount, pageIndex, pageOptions, previousPage, nextPage, gotoPage, cssFooter, numOfTableItems }) {
    return (
        cssFooter ?
            <span className={(cssFooter || '') + " tableFooter"}>
                <TablePages pageSizeCurrent={pageSize} setPageSizeCurrent={setPageSize} />
                <TablePageSeqence canPreviousPage={canPreviousPage} canNextPage={canNextPage} pageCount={pageCount} pageIndex={pageIndex}
                    pageOptions={pageOptions} previousPage={previousPage} nextPage={nextPage} gotoPage={gotoPage} />
                <TableRecordCount pageSizeCurrent={pageSize} pageCount={pageCount} justCount={numOfTableItems} />
            </span>
            :
            <span></span>
    );
}

function TableCompon({ columnItems, dataItems, curPageSize, curPageIndex, cssRowH, cssCellH, cssRow, cssCell, cssFooter, cssTable }) {
    const numOfTableItems = dataItems.length;
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
            initialState: { pageIndex: curPageIndex, pageSize: curPageSize },
        },
        useFilters,
        useSortBy,
        usePagination
    )

    return (
        <span className={cssTable ? cssTable : "entireTable"}>
            <span className="tableHeaderBody">
                <TableItem getTableProps={getTableProps} headerGroups={headerGroups} getTableBodyProps={getTableBodyProps}
                    page={page} prepareRow={prepareRow} cssRowH={cssRowH} cssCellH={cssCellH} cssRow={cssRow} cssCell={cssCell} />
            </span>
            <TableComponFooter pageSize={pageSize} setPageSize={setPageSize} canPreviousPage={canPreviousPage} canNextPage={canNextPage} pageCount={pageCount} pageIndex={pageIndex}
                pageOptions={pageOptions} previousPage={previousPage} nextPage={nextPage} gotoPage={gotoPage} cssFooter={cssFooter} numOfTableItems={numOfTableItems} />
        </span>
    );
}

export default TableCompon;