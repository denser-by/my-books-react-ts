const express = require('express');
const roleRoutes = express.Router();
const CtrlRoles = require('../controller/CtrlRoles.js');

roleRoutes.post('/roles', CtrlRoles.create);
roleRoutes.get('/roles', CtrlRoles.getAll);
roleRoutes.get('/roles/:id', CtrlRoles.getOne);
roleRoutes.put('/roles', CtrlRoles.update);
roleRoutes.delete('/roles/:id', CtrlRoles.delete);

module.exports = roleRoutes