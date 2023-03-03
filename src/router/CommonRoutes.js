import Router from 'express';
import CtrlAuthors from './controller/CtrlAuthors.js';
import CtrlBooks from './controller/CtrlBooks.js';

const commonRoutes = new Router();

commonRoutes.post('/cbooks', CtrlBooks.create);
commonRoutes.get('/cbooks', CtrlBooks.getAll);
commonRoutes.get('/cbooks/:id', CtrlBooks.getOne);
commonRoutes.put('/cbooks', CtrlBooks.update);
commonRoutes.delete('/cbooks/:id', CtrlBooks.delete);

commonRoutes.post('/cauthors', CtrlAuthors.create);
commonRoutes.get('/cauthors', CtrlAuthors.getAll);
commonRoutes.get('/cauthors/:id', CtrlAuthors.getOne);
commonRoutes.put('/cauthors', CtrlAuthors.update);
commonRoutes.delete('/cauthors/:id', CtrlAuthors.delete);

export default commonRoutes;