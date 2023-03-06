import React from "react";
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
                    {pageIndex + 1}&nbsp;/&nbsp;{pageOptions.length}
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
                {[2, 5, 10, 15, 25, 50, 100].map(pageSizeOpt => (
                    <option key={pageSizeOpt} value={pageSizeOpt}>
                        {pageSizeOpt}&nbsp;items
                    </option>
                ))}
            </select>
        </span>
    );
}

function TableItem({ getTableProps, headerGroups, getTableBodyProps, page, prepareRow }) {
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th className='booksInfoHeader' {...column.getHeaderProps()}>
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
                        <tr {...row.getRowProps()} className='booksListItem'>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className='booksInfoItem'
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

function TableCompon({ columnItems, dataItems, defPage }) {
    // Use the state and functions returned from useTable to build your UI
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
                    page={page} prepareRow={prepareRow} />
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