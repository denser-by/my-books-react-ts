import {useState, useEffect} from 'react';

const tableState = (data, page, pageRows) => {
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);

    useEffect(() => {
        const range = calculateRange(data, page, pageRows);
        setTableRange([...range]);

        const slice = sliceData(data, page, pageRows);
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice]);

    return {slice, range: tableRange};
};

export default tableState;