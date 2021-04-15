/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

const AppointmentModel = require('../models/appointment.model');

const checkPriority = (newPatientAge) => {
  if (Date.now() - newPatientAge >= 2049840000000) {
    return true;
  }

  return false;
};

const storeAsPriority = async (request, response) => {
  const { body } = request;
  const appointment = await AppointmentModel.findById(body._id);
  let { CPF, Age } = appointment;
  const result = appointment.Age.map((age) => checkPriority(age));
  if (result[0] === false) {
    const newAgeArr = Age.pop();
    const newCPFArr = CPF.pop();
    CPF = [body.CPF[0], newCPFArr];
    Age = [body.Age, newAgeArr];
    appointment.CPF = CPF;
    appointment.Age = Age;
    try {
      await appointment.save();
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  } else if (result[1] === false) {
    Age.pop();
    CPF.pop();
    CPF = [...CPF, body.CPF[0]];
    Age = [...Age, body.Age];
    appointment.CPF = CPF;
    appointment.Age = Age;
    try {
      await appointment.save();
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  } else {
    response.status(400).send({ message: 'Só há pacientes prioritarios no horario.' });
  }
};

const storeInExisting = async (request, response) => {
  const { body } = request;
  const appointment = await AppointmentModel.findById(body._id);
  let { CPF, Age } = appointment;
  if (!CPF.includes(body.CPF)) {
    CPF = [...CPF, body.CPF[0]];
    Age = [...Age, body.Age];
    appointment.CPF = CPF;
    appointment.Age = Age;
    try {
      await appointment.save();
      response.status(200).send({ data: appointment, message: 'Você foi adicionado' });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  } else {
    response.status(400).send({ message: 'CPF já consta neste dia e horário' });
  }
};

class Appointment {
  async index(request, response) {
    const Appointments = await AppointmentModel.find();
    response.send({ data: Appointments });
  }

  async store(request, response) {
    const { body } = request;
    try {
      const appointment = await AppointmentModel.findById(body._id);

      if (appointment) {
        const { CPF } = appointment;
        if (CPF.length < 2) {
          storeInExisting(request, response);
        } else if (checkPriority(body.Age)) {
          storeAsPriority(request, response);
        } else {
          response.status(400).send({ message: 'Não há mais vagas neste dia e horário' });
        }
      } else {
        const newAppointment = await AppointmentModel.create(body);
        response.status(200).send({ data: newAppointment, message: 'marcação foi criada !' });
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
        response.status(404).send({ message: 'Horário não possui marcações' });
      }

      response.send({ data: appointment });
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
