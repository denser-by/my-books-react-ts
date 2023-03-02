const express = require('express');
const app = express();
const books = [
    {id:1, name: 'BookName1', year: 2002, authors: 'Author1, Author2, Author3', info: 'BookDescription1'},
    {id:2, name: 'BookName2', year: 2003, authors: 'Author2, Author4', info: 'BookDescription2'}
];
const authors = [
    {id:1, name: 'AuthorName1', age: 1982, books: 'Book1, Book2', info: 'AuthorBiography1'},
    {id:2, name: 'AuthorName2', age: 1984, books: 'Book3, Book4', info: 'AuthorBiography2'}
];

app.set('port', process.env.PORT || 3001);

app.get('/books', (req, res, next) => {
    res.send(books);
    console.log('Fetching Books:', books);
});

app.post('/books', (req, res, next) => {
    res.send('OK Book');
    console.log('Posting Book:', req);
});

app.get('/books/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Fetching Book:', id);
    res.send(books[id]);
});

app.delete('/books/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Deleting Book:', id);
    delete books[id];
    res.send({message: 'Deleted Book'});
});

app.get('/authors', (req, res, next) => {
    res.send(authors);
    console.log('Fetching Books:', authors);
});

app.post('/authors', (req, res, next) => {
    res.send('OK Author');
    console.log('Posting Author:', req);
});

app.get('/authors/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Fetching Author:', id);
    res.send(authors[id]);
});

app.delete('/authors/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Deleting Author:', id);
    delete authors[id];
    res.send({message: 'Deleted Author'});
});

app.listen(app.get('port'), ()=>{
    console.log('App started on port', app.get('port'));
});

module.exports = app;