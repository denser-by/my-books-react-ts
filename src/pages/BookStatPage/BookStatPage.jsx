import { useState, useEffect } from 'react';
import './bookstatpage.css';
import './../common.css';
import React from "react";
import { Chart } from "react-google-charts";
import { getBooksCaption, getBooksData, getBooksBarChartOptions } from './chartData.js';
import { Slider } from '@mui/material';

const BookStatPage = ({ pr, kind }) => {
  if (pr.indexOf("bookStat") < 1) return;

  const [data, setData] = useState([]);
  kind = 'book-year';
  const [bookStatPageKind, setBookStatPageKind] = useState(kind);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then((response) => response.json())
      .then(entireBody => {
        var bookItems = [];
        entireBody.map(bookItem => {
          bookItems.push({
            year: bookItem.year,
            name: bookItem.name,
          });
        })
        setData(getBooksData(bookStatPageKind, bookItems))
      });
  }, [bookStatPageKind]);

  const sliderMoves = (a, b) => {
    setBookStatPageKind(b < 1 ? 'book-year' : 'alpha-book');
  };

  return (
    <span className="statPage">
      <span className='statFrame0'>
        <span className='statMode'><nobr><strong>book-year</strong></nobr></span>
        <Slider defaultValue={0} step={1} marks min={0} max={1} onChangeCommitted={(a, b) => { sliderMoves(a, b) }} />
        <span className='statMode'><nobr><strong>alpha-book</strong></nobr></span>
      </span>
      <table width="100%">
        <tr>
          <td className='statFrame'><center><BooksPieChart pr={pr} kind={bookStatPageKind} data={data} /></center></td>
          <td className='statFrame2'><center><BooksBarChart pr={pr} kind={bookStatPageKind} data={data} /></center></td>
        </tr>
      </table>
    </span>
  );
};

const BooksPieChart = ({ pr, kind, data }) => {

  const options = getBooksCaption(kind);

  return (
    <span className="statShape">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"555px"}
        height={"800px"}
        className='pc'
        style={{ cursor: 'pointer', color: 'red', }}
      />
    </span>
  );
};

const BooksBarChart = ({ pr, kind, data }) => {

  const options = getBooksBarChartOptions(kind);

  return (
    <span className="statShape">
      <Chart
        chartType="BarChart"
        data={data}
        options={options}
        width={"555px"}
        height={"800px"}
        className='pc'
        style={{ cursor: 'pointer', color: 'blue', }}
      />
    </span>
  );
};

export default BookStatPage;