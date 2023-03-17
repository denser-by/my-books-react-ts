import React from 'react';

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

export const optionsAuthorAge = {
  title: "Distribution: author-age",
};

// [
//   ["Task","Hours per Day"],
//   ["1999","3"],
//   ["1995","6"],
//   ["2001","7"],
//   ["2003","4"],["2004","5"],["2010","4"],["1992","4"],["2011","4"]]


function getBookYearData(bookItems) {
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

function getAuthorAgeData(authorRecords) {
  let authorItems = authorRecords;
  let ages = [];
  let amount = [];
  authorItems.map(author => {
    const age = author.age;
    let findAge = ages.filter(aa => aa == age)[0];
    if (findAge) {
      const findAgeIdx = ages.indexOf(age);
      amount[findAgeIdx] += 1;
    } else {
      ages.push(age);
      amount.push(1);
    }
  });
  let data = [
    ["Task", "Hours per Day"],
  ];
  for (let i = 0; i < ages.length; i++) {
    const entry = ["" + ages[i], amount[i]];
    data.push(entry);
  }
  return data;
}

function getBooksData(kind, bookItems) {
  if (kind && kind === "book-year") {
    return getBookYearData(bookItems);
  }
  return data;
}

function getBooksCaption(kind) {
  if (kind && kind === "book-year")
    return optionsBookYear;
  return options;
}

function getAuthorsData(kind, authorRecords) {
  if (kind && kind === "author-age") {
    return getAuthorAgeData(authorRecords);
  }
  return data;
}

function getAuthorsCaption(kind) {
  if (kind && kind === "author-age")
    return optionsAuthorAge;
  return options;
}

export { getBooksCaption, getBooksData, getAuthorsCaption, getAuthorsData };
// export default getBooksData;