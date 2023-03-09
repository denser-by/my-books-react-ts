var sq3bp = require('./sqlite3BooksProvider.js');

console.log('start working sqlite3');

let booksProvider = new sq3bp();

let booksNum = booksProvider.size();
console.log('books number is ' + booksNum + '-' + JSON.stringify(booksNum));

// console.log('finish working sqlite3');