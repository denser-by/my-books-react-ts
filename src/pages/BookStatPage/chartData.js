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
  chartArea: { width: '73%' },
};

export const optionsAlphabet = {
  title: "Alpha sector",
  chartArea: { width: '73%' },
};

export const optionsAuthorAge = {
  title: "Distribution: author-age",
};

export const optionsBarChartBookYear = {
  title: "Distribution: book-year",
  chartArea: { width: '73%' },
  hAxis: {
    title: "Total number for each period",
    minValue: 0,
  },
  vAxis: {
    title: "Books in a year",
  }
};

export const optionsBarChartAlphabet = {
  title: "Catalogue dencity",
  chartArea: { width: '73%' },
  hAxis: {
    title: "Total number in each group",
    minValue: 0,
  },
  vAxis: {
    title: "A-z А-я Books' groups",
  }
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
    ["Year", "Number of published books"],
  ];
  for (let i = 0; i < years.length; i++) {
    const entry = ["" + years[i], amount[i]];
    data.push(entry);
  }

  // console.log(JSON.stringify(data));
  return data;
}

function getAlphaBookData(bookItems) {
  let az = [];
  let amount = [];
  bookItems.map(book => {
    const alpha = (""+book.name.charAt(0)).toUpperCase();
    let findAlpha = az.filter(yy => yy == alpha)[0];
    if (findAlpha) {
      const findAlphaIdx = az.indexOf(alpha);
      amount[findAlphaIdx] += 1;
    } else {
      az.push(alpha);
      amount.push(1);
    }
  });
  let data = [
    ["Alpha", "Number of books in this group"],
  ];
  for (let i = 0; i < az.length; i++) {
    const entry = ["" + az[i], amount[i]];
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
  if (kind && kind === "alpha-book")
    return getAlphaBookData(bookItems);
  return data;
}

function getBooksCaption(kind) {
  if (kind && kind === "book-year")
    return optionsBookYear;
  if (kind && kind === "alpha-book")
    return optionsAlphabet;
  return options;
}

export function getBooksBarChartOptions(kind) {
  if (kind && kind === "book-year")
    return optionsBarChartBookYear;
  if (kind && kind === "alpha-book")
    return optionsBarChartAlphabet;
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