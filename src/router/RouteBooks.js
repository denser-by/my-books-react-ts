const express = require('express');
const bookRoutes = express.Router();
const CtrlBooks = require('../controller/CtrlBooks.js');

bookRoutes.post('/books', CtrlBooks.create);
bookRoutes.get('/books', CtrlBooks.getAll);
bookRoutes.get('/books/:id', CtrlBooks.getOne);
bookRoutes.put('/books', CtrlBooks.update);
bookRoutes.delete('/books/:id', CtrlBooks.delete);

module.exports = bookRoutes