const express = require('express');

const UserRouter = require('./user.route');
const AppointmentRouter = require('./appointment.route');

const Routes = express.Router();

Routes.use('/api', UserRouter);
Routes.use('/api', AppointmentRouter);

module.exports = Routes;
