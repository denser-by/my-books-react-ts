var sq3bp = require('./sqlite3BooksProvider.js');

console.log('start working sqlite3');

let booksProvider = new sq3bp();

let booksNum = booksProvider.size();
console.log('books number is ' + booksNum + '-' + JSON.stringify(booksNum));


let bookItems = booksProvider.all();
console.log('books items are ' + bookItems + '-' + JSON.stringify(bookItems));

// console.log('finish working sqlite3');