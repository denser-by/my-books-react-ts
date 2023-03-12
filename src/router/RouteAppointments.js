const express = require('express');
const appointmentRoutes = express.Router();
const CtrlAppointments = require('../controller/CtrlAppointments.js');

appointmentRoutes.post('/appointments', CtrlAppointments.create);
appointmentRoutes.get('/appointments', CtrlAppointments.getAll);
appointmentRoutes.get('/appointments/:id', CtrlAppointments.getOne);
appointmentRoutes.put('/appointments', CtrlAppointments.update);
appointmentRoutes.delete('/appointments/:id', CtrlAppointments.delete);

module.exports = appointmentRoutes