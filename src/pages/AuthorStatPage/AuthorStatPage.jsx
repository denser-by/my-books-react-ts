import { useState } from 'react';
import './authorstatpage.css';
import './../common.css';
import { Form, Input, Button } from 'reactstrap';
import React from "react";
import { Chart } from "react-google-charts";
import { getAuthorsCaption, getAuthorsData } from './../BookStatPage/chartData.js';

const AuthorStatPage = ({ kind }) => {

    kind = 'author-age';
    const options = getAuthorsCaption(kind);
    const data = getAuthorsData(kind);

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