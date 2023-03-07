import React from 'react';
import BooksProvider from "../../model/BooksProvider";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};


export const optionsBookYear = {
  title: "Distribution: book-year",
};


// [
//   ["Task","Hours per Day"],
//   ["1999","3"],
//   ["1995","6"],
//   ["2001","7"],
//   ["2003","4"],["2004","5"],["2010","4"],["1992","4"],["2011","4"]]


function getBookYearData() {
  let bookItems = BooksProvider.all();
  let years = [];
  let amount = [];
  bookItems.map(book => {
    const year = book.year;
    let findYear = years.filter(yy => yy == year)[0];
    if (findYear) {
      const findYearIdx = years.indexOf(year);
      amount[findYearIdx] += 1;
    } else {
      years.push(year);
      amount.push(1);
    }
  });
  let data = [
    ["Task", "Hours per Day"],
  ];
  for (let i = 0; i < years.length; i++) {
    const entry = ["" + years[i], amount[i]];
    data.push(entry);
  }

  // console.log(JSON.stringify(data));
  return data;
}

function getBooksData(kind) {
  if (kind && kind === "book-year") {
    return getBookYearData();
  }
  return data;
}

function getBooksCaption(kind) {
  if (kind && kind === "book-year")
    return optionsBookYear;
  return options;
}

export { getBooksCaption, getBooksData };
// export default getBooksData;