import { useState, useEffect } from 'react';
import './authorstatpage.css';
import './../common.css';
import React from "react";
import { Chart } from "react-google-charts";
import { getAuthorsCaption, getAuthorsData, getAuthorsBarChartOptions } from './../BookStatPage/chartData.js';
import { Slider } from '@mui/material';

const AuthorStatPage = ({ pr, kind }) => {
  if (pr.indexOf("authorStat") < 1) return;

  const [data, setData] = useState([]);
  kind = 'author-age';
  const [authorStatPageKind, setAuthorStatPageKind] = useState(kind);

  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then((response) => response.json())
      .then(entireBody => {
        var authorItems = [];
        entireBody.map(authorItem => {
          authorItems.push({
            age: "" + new Date(authorItem.age).getFullYear(),
            name: authorItem.name,
            numberOfBooks: (1 + (authorItems.length % 5)),
          });
        })
        setData(getAuthorsData(authorStatPageKind, authorItems))
      });
  }, [authorStatPageKind]);

  const sliderMoves = (a, b) => {
    setAuthorStatPageKind(b < 1 ? 'author-age' : 'books-by-author');
  };

  return (
    <span className="statPageAuthors">
      <span className='statAuthorsFrame0'>
        <span className='statModeAuthors'><nobr><strong>Ages</strong></nobr></span>
        <Slider defaultValue={0} step={1} marks min={0} max={1} onChangeCommitted={(a, b) => { sliderMoves(a, b) }} />
        <span className='statModeAuthors'><nobr><strong>Books</strong></nobr></span>
      </span>
      <table width="100%">
        <tr>
          <td className='statAuthorsFrame'><center><AuthorsPieChart pr={pr} kind={authorStatPageKind} data={data} /></center></td>
          <td className='statAuthorsFrame2'><center><AuthorsBarChart pr={pr} kind={authorStatPageKind} data={data} /></center></td>
        </tr>
      </table>
    </span>
  );
};

const AuthorsPieChart = ({ pr, kind, data }) => {

  const options = getAuthorsCaption(kind);

  return (
    <span className="authorsStatShape">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"555px"}
        height={"800px"}
        className='pcAuthors'
        style={{ cursor: 'pointer', color: 'red', }}
      />
    </span>
  );
};

const AuthorsBarChart = ({ pr, kind, data }) => {

  const options = getAuthorsBarChartOptions(kind);

  return (
    <span className="authorsStatShape">
      <Chart
        chartType="BarChart"
        data={data}
        options={options}
        width={"555px"}
        height={"800px"}
        className='pcAuthors'
        style={{ cursor: 'pointer', color: 'blue', }}
      />
    </span>
  );
};

export default AuthorStatPage;