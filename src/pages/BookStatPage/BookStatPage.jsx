import { useState, useEffect } from 'react';
import './bookstatpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import React from "react";
import { Chart } from "react-google-charts";
import { getBooksCaption, getBooksData } from './chartData';

const BookStatPage = ({ pr, kind }) => {
  if (pr.indexOf("bookStat") < 1) return;

  const [data, setData] = useState([]);
  kind = 'book-year';
  const options = getBooksCaption(kind);
  const [bookStatPageKind, setBookStatPageKind] = useState(kind);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then((response) => response.json())
      .then(entireBody => {
        var bookItems = [];
        entireBody.map(bookItem => {
          bookItems.push({
            year: bookItem.year,
          });
        })
        setData(getBooksData(kind, bookItems))
      });
  }, [bookStatPageKind]);

  return (
    <span className="statShape">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
        className='pc'
        style={{ cursor: 'pointer', color: 'red', }}
      />
    </span>
  );
};

export default BookStatPage;