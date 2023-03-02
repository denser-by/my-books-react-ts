const express = require('express');
const app = express();
const books = [{name: 'BookName1', year: 2002, authors: 'Author1, Author2, Author3', info: 'BookDescription1'}];
const authors = [{name: 'AuthorName1', age: 1982, books: 'Book1, Book2', info: 'AuthorBiography1'}];

app.set('port', process.env.PORT || 3000);

app.get('/books', (req, res, next) => {
    res.send(books);
});

app.post('/books', (req, res, next) => {
    res.send('OK Book');
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
});

app.post('/authors', (req, res, next) => {
    res.send('OK Author');
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