import { useState, useEffect } from 'react';
import './authorstatpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import React from "react";
import { Chart } from "react-google-charts";
import { getAuthorsCaption, getAuthorsData } from './../BookStatPage/chartData.js';

const AuthorStatPage = ({ pr, kind }) => {
  if (pr.indexOf("authorStat") < 1) return;

  const [data, setData] = useState([]);
  kind = 'author-age';
  const options = getAuthorsCaption(kind);
  const [authorStatPageKind, setAuthorStatPageKind] = useState(kind);

  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then((response) => response.json())
      .then(entireBody => {
        var authorRecords = [];
        entireBody.map(author => {
          authorRecords.push({
            age: author.age,
          });
        })
        setData(getAuthorsData(kind, authorRecords))
      });
  }, [authorStatPageKind]);

  return (
    <span className="authorsStatShape">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
        className='pcAuthors'
        style={{ cursor: 'pointer', color: 'brown', }}
      />
    </span>
  );
};

export default AuthorStatPage;