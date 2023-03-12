const express = require('express');
const userRoutes = express.Router();
const CtrlUsers = require('../controller/CtrlUsers.js');

userRoutes.post('/users', CtrlUsers.create);
userRoutes.get('/users', CtrlUsers.getAll);
userRoutes.get('/users/:id', CtrlUsers.getOne);
userRoutes.put('/users', CtrlUsers.update);
userRoutes.delete('/users/:id', CtrlUsers.delete);

module.exports = userRoutes