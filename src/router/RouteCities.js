const express = require('express');
const cityRoutes = express.Router();
const CtrlCities = require('../controller/CtrlCities.js');

cityRoutes.post('/cities', CtrlCities.create);
cityRoutes.get('/cities', CtrlCities.getAll);
cityRoutes.get('/cities/:id', CtrlCities.getOne);
cityRoutes.put('/cities', CtrlCities.update);
cityRoutes.delete('/cities/:id', CtrlCities.delete);

module.exports = cityRoutes