const express = require('express');
const AppointmentController = require('../controllers/appointment.controller');

const Router = express.Router();

Router.get('/appointment', AppointmentController.index);
Router.get('/appointment/:id', AppointmentController.getById);

Router.post('/appointment', AppointmentController.store);

Router.delete('/appointment/:id', AppointmentController.delete);

module.exports = Router;
