/* eslint-disable class-methods-use-this */
const AppointmentModel = require('../models/appointment.model');

class Appointment {
  async index(request, response) {
    const Appointments = await AppointmentModel.find();
    response.send({ Appointments });
  }

  async store(request, response) {
    const { body } = request;

    const appointment = await AppointmentModel.create(body);

    response.send({ appointment });
  }
}

module.exports = new Appointment();
