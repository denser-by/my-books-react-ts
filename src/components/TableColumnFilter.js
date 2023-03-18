import React from 'react';
import './tablecompon.css';

export const TableColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;

    return (
        <span className='headerFilterItem'>
            <input
                onClick={(e) => { e.stopPropagation(); }}
                className='headerFilterCtrl'
                value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)} />
        </span>
    );
};