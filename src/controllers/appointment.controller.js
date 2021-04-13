/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const AppointmentModel = require('../models/appointment.model');

class Appointment {
  async index(request, response) {
    const Appointments = await AppointmentModel.find();
    response.send({ Appointments });
  }

  async store(request, response) {
    const { body } = request;
    try {
      const appointment = await AppointmentModel.findById(body._id);

      if (appointment) {
        const CPFArr = appointment.CPF;
        if (CPFArr.length < 2) {
          let CPF = CPFArr;
          if (!CPF.includes(body.CPF)) {
            CPF = [...CPF, body.CPF[0]];
            appointment.CPF = CPF;
            try {
              await appointment.save();
            } catch (error) {
              response({ message: error.message });
            }
          } else {
            response.send({ message: 'CPF já consta na marcação neste dia e horário' });
          }
        } else {
          response.send({ message: 'Não há mais vagas neste dia e horário' });
        }
      } else {
        const newAppointment = await AppointmentModel.create(body);
        response.send({ newAppointment });
      }
    } catch (error) {
      response.status(404).send({ message: error.message });
    }
  }

  async getById(request, response) {
    const { id } = request.params;

    try {
      const appointment = await AppointmentModel.findById(id);

      if (!appointment) {
        response.send({ message: 'Appointment doesnt exist' });
      }

      response.send({ appointment });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    try {
      const appointment = await AppointmentModel.findById(id);

      if (!appointment) {
        response.send({ message: 'Appointment doesnt exist' });
      }

      await appointment.remove();

      response.send({ message: 'Appointment removed' });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }
}

module.exports = new Appointment();
