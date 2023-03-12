const express = require('express');
const imageRoutes = express.Router();
const CtrlImages = require('../controller/CtrlImages.js');

imageRoutes.post('/images', CtrlImages.create);
imageRoutes.get('/images', CtrlImages.getAll);
imageRoutes.get('/images/:id', CtrlImages.getOne);
imageRoutes.put('/images', CtrlImages.update);
imageRoutes.delete('/images/:id', CtrlImages.delete);

module.exports = imageRoutes