const pgp = require('pg-promise')();
const db = pgp('postgres://my_books_admin:password@localhost:5432/my_books2');


db.many('SELECT * FROM books')
    .then((data) => {
        data.map(entry => {
            console.log('--:', entry);
        });
        console.log('DATA:', data.value)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    });


db.many('SELECT * FROM authors')
    .then((data) => {
        data.map(entry => {
            console.log('--:', entry);
        });
        console.log('DATA:', data.value)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    });


db.many('SELECT * FROM author_book')
    .then((data) => {
        data.map(entry => {
            console.log('--:', entry);
        });
        console.log('DATA:', data.value)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    });


db.many('SELECT * FROM images')
    .then((data) => {
        data.map(entry => {
            console.log('--:', entry);
        });
        console.log('DATA:', data.value)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    });


// db.one('SELECT $1 AS value', 123)
//     .then((data) => {
//         console.log('DATA:', data.value)
//     })
//     .catch((error) => {
//         console.log('ERROR:', error)
//     })