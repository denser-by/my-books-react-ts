import Router from 'express';
import CtrlBooks from './controller/CtrlBooks.js';

const bookRoutes = new Router();

bookRoutes.post('/books', CtrlBooks.create);
bookRoutes.get('/books', CtrlBooks.getAll);
bookRoutes.get('/books/:id', CtrlBooks.getOne);
bookRoutes.put('/books', CtrlBooks.update);
bookRoutes.delete('/books/:id', CtrlBooks.delete);

export default bookRoutes;