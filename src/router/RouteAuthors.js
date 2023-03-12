const express = require('express');
const authorRoutes = express.Router();
const CtrlAuthors = require('../controller/CtrlAuthors.js');

authorRoutes.post('/authors', CtrlAuthors.create);
authorRoutes.get('/authors', CtrlAuthors.getAll);
authorRoutes.get('/authors/:id', CtrlAuthors.getOne);
authorRoutes.put('/authors', CtrlAuthors.update);
authorRoutes.delete('/authors/:id', CtrlAuthors.delete);

module.exports = authorRoutes