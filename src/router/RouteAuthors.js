import Router from 'express';
import CtrlAuthors from './controller/CtrlAuthors.js';

const authorRoutes = new Router();

authorRoutes.post('/authors', CtrlAuthors.create);
authorRoutes.get('/authors', CtrlAuthors.getAll);
authorRoutes.get('/authors/:id', CtrlAuthors.getOne);
authorRoutes.put('/authors', CtrlAuthors.update);
authorRoutes.delete('/authors/:id', CtrlAuthors.delete);


export default authorRoutes;